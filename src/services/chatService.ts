/**
 * Chat Service
 * Endpoint: POST /chat/query
 */

import apiClient from '../api/client';
import {
  ApiResponse,
  ChatRequest,
  ChatResponse,
} from '../types/api.types';

export const chatService = {
  sendMessage: async (data: ChatRequest): Promise<ApiResponse<ChatResponse>> => {
    const response = await apiClient.post('/chat/query', data);
    return response.data;
  },
};
