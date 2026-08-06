/**
 * Auth Service
 * Endpoints: POST /auth/google, POST /auth/send-otp, POST /auth/verify-otp, POST /auth/logout
 */

import apiClient from '../api/client';
import {
  ApiResponse,
  AuthResponse,
  GoogleAuthRequest,
  SendOTPRequest,
  VerifyOTPRequest,
} from '../types/api.types';

export const authService = {
  googleAuth: async (data: GoogleAuthRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/google', data);
    return response.data;
  },

  sendOTP: async (data: SendOTPRequest): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.post('/auth/send-otp', data);
    return response.data;
  },

  verifyOTP: async (data: VerifyOTPRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/verify-otp', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
