/**
 * Chat Hooks
 */

import { useMutation } from '@tanstack/react-query';
import { chatService } from '../services/chatService';
import { ChatRequest } from '../types/api.types';

export const useChatQuery = () => {
  return useMutation({
    mutationFn: (data: ChatRequest) => chatService.sendMessage(data),
  });
};
