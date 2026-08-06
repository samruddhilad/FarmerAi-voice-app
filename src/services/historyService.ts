/**
 * History Service
 * Endpoints: GET /history, GET /history/:conversation_id
 */

import apiClient from '../api/client';
import { ApiResponse, Conversation } from '../types/api.types';

export const historyService = {
  getConversations: async (): Promise<ApiResponse<Conversation[]>> => {
    const response = await apiClient.get('/history');
    return response.data;
  },

  getConversation: async (id: string): Promise<ApiResponse<Conversation>> => {
    const response = await apiClient.get(`/history/${id}`);
    return response.data;
  },
};
