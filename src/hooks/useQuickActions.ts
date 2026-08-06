/**
 * Quick Actions Hooks
 */

import { useQuery } from '@tanstack/react-query';
import { quickActionService } from '../services/quickActionService';
import { queryKeys } from '../constants/queryKeys';

export const useQuickActions = () => {
  return useQuery({
    queryKey: queryKeys.quickActions.list(),
    queryFn: () => quickActionService.getQuickActions(),
  });
};
