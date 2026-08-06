/**
 * Language Service
 * Endpoint: GET /languages
 */

import apiClient from '../api/client';
import { Language } from '../types/api.types';

export const languageService = {
  getLanguages: async (): Promise<Language[]> => {
    const response = await apiClient.get('/languages');
    return response.data;
  },
};
