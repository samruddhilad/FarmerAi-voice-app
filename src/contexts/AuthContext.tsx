/**
 * AuthContext — Authentication state management
 * Handles: login, logout, token persistence, session restore
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureApiClient } from '../api/client';
import { User } from '../types/api.types';

const isWeb = Platform.OS === 'web';

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (isWeb) return await AsyncStorage.getItem(key);
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (isWeb) {
        await AsyncStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch {}
  },
  deleteItem: async (key: string): Promise<void> => {
    try {
      if (isWeb) {
        await AsyncStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch {}
  },
};

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
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
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
        return await storage.getItem(KEYS.ACCESS_TOKEN);
      },
      getRefreshToken: async () => {
        return await storage.getItem(KEYS.REFRESH_TOKEN);
      },
      onTokenRefreshed: async (accessToken: string, refreshToken: string) => {
        await storage.setItem(KEYS.ACCESS_TOKEN, accessToken);
        await storage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
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
        storage.getItem(KEYS.ACCESS_TOKEN),
        storage.getItem(KEYS.REFRESH_TOKEN),
        storage.getItem(KEYS.USER),
        storage.getItem(KEYS.ONBOARDED),
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
        storage.setItem(KEYS.ACCESS_TOKEN, accessToken),
        storage.setItem(KEYS.REFRESH_TOKEN, refreshToken),
        storage.setItem(KEYS.USER, JSON.stringify(user)),
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
      storage.deleteItem(KEYS.ACCESS_TOKEN),
      storage.deleteItem(KEYS.REFRESH_TOKEN),
      storage.deleteItem(KEYS.USER),
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
    await storage.setItem(KEYS.ONBOARDED, 'true');
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
