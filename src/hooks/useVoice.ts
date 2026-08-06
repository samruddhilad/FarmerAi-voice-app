/**
 * Voice Hooks
 */

import { useMutation } from '@tanstack/react-query';
import { voiceService } from '../services/voiceService';

export const useVoiceQuery = () => {
  return useMutation({
    mutationFn: ({ audioUri, language }: { audioUri: string; language: string }) =>
      voiceService.sendVoiceQuery(audioUri, language),
  });
};
