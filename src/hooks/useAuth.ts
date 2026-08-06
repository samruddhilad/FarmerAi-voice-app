/**
 * Auth Hooks
 * Wraps authService with React Query mutations
 */

import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import {
  GoogleAuthRequest,
  SendOTPRequest,
  VerifyOTPRequest,
} from '../types/api.types';

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: (data: GoogleAuthRequest) => authService.googleAuth(data),
  });
};

export const useSendOTP = () => {
  return useMutation({
    mutationFn: (data: SendOTPRequest) => authService.sendOTP(data),
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: (data: VerifyOTPRequest) => authService.verifyOTP(data),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
  });
};
