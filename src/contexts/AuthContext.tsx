/**
 * AuthContext — Authentication state management
 * Handles: login, logout, token persistence, session restore
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { configureApiClient } from '../api/client';
import { User } from '../types/api.types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasOnboarded: boolean;
}

interface AuthContextType extends AuthState {
  login: (user: User, accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const KEYS = {
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  USER: 'auth_user',
  ONBOARDED: 'auth_onboarded',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: { id: 'guest_user', name: 'Farmer', email: 'farmer@example.com', mobile: '9876543210', preferred_language: 'en' },
    accessToken: 'guest_access_token',
    refreshToken: 'guest_refresh_token',
    isAuthenticated: true,
    isLoading: false,
    hasOnboarded: true,
  });

  // Restore session on app launch
  useEffect(() => {
    restoreSession();
  }, []);

  // Configure API client with token accessors
  useEffect(() => {
    configureApiClient({
      getAccessToken: async () => {
        return await SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
      },
      getRefreshToken: async () => {
        return await SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
      },
      onTokenRefreshed: async (accessToken: string, refreshToken: string) => {
        await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, accessToken);
        await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, refreshToken);
        setState((prev) => ({ ...prev, accessToken, refreshToken }));
      },
      onSessionExpired: () => {
        logout();
      },
    });
  }, []);

  const restoreSession = async () => {
    try {
      const [accessToken, refreshToken, userJson, onboarded] = await Promise.all([
        SecureStore.getItemAsync(KEYS.ACCESS_TOKEN),
        SecureStore.getItemAsync(KEYS.REFRESH_TOKEN),
        SecureStore.getItemAsync(KEYS.USER),
        SecureStore.getItemAsync(KEYS.ONBOARDED),
      ]);

      if (accessToken && userJson) {
        const user = JSON.parse(userJson) as User;
        setState({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          hasOnboarded: onboarded === 'true',
        });
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          hasOnboarded: onboarded === 'true',
        }));
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const login = useCallback(
    async (user: User, accessToken: string, refreshToken: string) => {
      await Promise.all([
        SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, accessToken),
        SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, refreshToken),
        SecureStore.setItemAsync(KEYS.USER, JSON.stringify(user)),
      ]);

      setState({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
        hasOnboarded: true,
      });
    },
    []
  );

  const logout = useCallback(async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),
      SecureStore.deleteItemAsync(KEYS.USER),
    ]);

    setState((prev) => ({
      ...prev,
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    }));
  }, []);

  const completeOnboarding = useCallback(async () => {
    await SecureStore.setItemAsync(KEYS.ONBOARDED, 'true');
    setState((prev) => ({ ...prev, hasOnboarded: true }));
  }, []);

  const updateUser = useCallback((partial: Partial<User>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updatedUser = { ...prev.user, ...partial };
      SecureStore.setItemAsync(KEYS.USER, JSON.stringify(updatedUser));
      return { ...prev, user: updatedUser };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        completeOnboarding,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
