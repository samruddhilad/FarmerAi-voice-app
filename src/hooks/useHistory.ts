/**
 * History Hooks
 */

import { useQuery } from '@tanstack/react-query';
import { historyService } from '../services/historyService';
import { queryKeys } from '../constants/queryKeys';

export const useConversations = () => {
  return useQuery({
    queryKey: queryKeys.history.lists(),
    queryFn: () => historyService.getConversations(),
  });
};

export const useConversation = (id: string) => {
  return useQuery({
    queryKey: queryKeys.history.detail(id),
    queryFn: () => historyService.getConversation(id),
    enabled: !!id,
  });
};
