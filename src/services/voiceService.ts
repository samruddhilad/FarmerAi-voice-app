/**
 * Voice Service
 * Endpoint: POST /voice/query (multipart form-data)
 */

import apiClient from '../api/client';
import { ApiResponse, VoiceQueryResponse } from '../types/api.types';

export const voiceService = {
  sendVoiceQuery: async (
    audioUri: string,
    language: string
  ): Promise<ApiResponse<VoiceQueryResponse>> => {
    const formData = new FormData();

    // Create file object for React Native
    const audioFile = {
      uri: audioUri,
      type: 'audio/wav',
      name: 'recording.wav',
    } as unknown as Blob;

    formData.append('audio_file', audioFile);
    formData.append('language', language);

    const response = await apiClient.post('/voice/query', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
