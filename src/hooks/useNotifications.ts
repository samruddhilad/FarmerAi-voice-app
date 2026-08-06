/**
 * Notification Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../services/notificationService';
import { queryKeys } from '../constants/queryKeys';

export const useNotifications = () => {
  return useQuery({
    queryKey: queryKeys.notifications.list(),
    queryFn: () => notificationService.getNotifications(),
  });
};

export const useMarkNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
};
