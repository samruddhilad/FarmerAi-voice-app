/**
 * Profile Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import { queryKeys } from '../constants/queryKeys';
import { UpdateProfileRequest } from '../types/api.types';

export const useProfile = () => {
  return useQuery({
    queryKey: queryKeys.profile.detail(),
    queryFn: () => profileService.getProfile(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => profileService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });
    },
  });
};
