/**
 * Axios HTTP Client
 *
 * - Placeholder BASE_URL (update when backend is ready)
 * - JWT token injection via request interceptor
 * - 401 handling with token refresh via response interceptor
 */

import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { ApiError } from '../types/api.types';

// ── Placeholder Base URL ──────────────────────────────────────────────
// Update this when the backend is deployed
export const BASE_URL = 'https://api.farmervoice.example.com/api/v1';

// ── Token Storage Interface ───────────────────────────────────────────
// This will be connected to expo-secure-store via AuthContext
let getAccessToken: (() => Promise<string | null>) | null = null;
let getRefreshToken: (() => Promise<string | null>) | null = null;
let onTokenRefreshed: ((accessToken: string, refreshToken: string) => Promise<void>) | null = null;
let onSessionExpired: (() => void) | null = null;

export function configureApiClient(config: {
  getAccessToken: () => Promise<string | null>;
  getRefreshToken: () => Promise<string | null>;
  onTokenRefreshed: (accessToken: string, refreshToken: string) => Promise<void>;
  onSessionExpired: () => void;
}) {
  getAccessToken = config.getAccessToken;
  getRefreshToken = config.getRefreshToken;
  onTokenRefreshed = config.onTokenRefreshed;
  onSessionExpired = config.onSessionExpired;
}

// ── Create Axios Instance ─────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request Interceptor: Attach JWT ───────────────────────────────────

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (getAccessToken) {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: Handle 401 & Refresh ────────────────────────

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        if (getRefreshToken && onTokenRefreshed) {
          const refreshToken = await getRefreshToken();
          if (refreshToken) {
            const response = await axios.post(`${BASE_URL}/auth/refresh`, {
              refresh_token: refreshToken,
            });

            const { access_token, refresh_token } = response.data.data;
            await onTokenRefreshed(access_token, refresh_token);

            processQueue(null, access_token);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
            }
            return apiClient(originalRequest);
          }
        }
        // No refresh token available
        throw new Error('No refresh token');
      } catch (refreshError) {
        processQueue(refreshError, null);
        onSessionExpired?.();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
