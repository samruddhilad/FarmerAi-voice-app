/**
 * Profile Service
 * Endpoints: GET /profile, PUT /profile
 */

import apiClient from '../api/client';
import { ApiResponse, User, UpdateProfileRequest } from '../types/api.types';

export const profileService = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get('/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse<User>> => {
    const response = await apiClient.put('/profile', data);
    return response.data;
  },
};
