/**
 * Quick Action Service
 * Endpoint: GET /quick-actions
 */

import apiClient from '../api/client';
import { ApiResponse, QuickAction } from '../types/api.types';

export const quickActionService = {
  getQuickActions: async (): Promise<ApiResponse<QuickAction[]>> => {
    const response = await apiClient.get('/quick-actions');
    return response.data;
  },
};
