/**
 * Bookmark Service
 * Endpoints: GET /bookmarks, POST /bookmarks, DELETE /bookmarks/:scheme_id
 */

import apiClient from '../api/client';
import {
  ApiResponse,
  Bookmark,
  AddBookmarkRequest,
} from '../types/api.types';

export const bookmarkService = {
  getBookmarks: async (): Promise<ApiResponse<Bookmark[]>> => {
    const response = await apiClient.get('/bookmarks');
    return response.data;
  },

  addBookmark: async (data: AddBookmarkRequest): Promise<ApiResponse<Bookmark>> => {
    const response = await apiClient.post('/bookmarks', data);
    return response.data;
  },

  removeBookmark: async (schemeId: string): Promise<void> => {
    await apiClient.delete(`/bookmarks/${schemeId}`);
  },
};
