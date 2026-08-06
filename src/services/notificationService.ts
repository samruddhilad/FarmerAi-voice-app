/**
 * Notification Service
 * Endpoints: GET /notifications, PUT /notifications/read
 */

import apiClient from '../api/client';
import { ApiResponse, Notification } from '../types/api.types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Application window open for Drip Irrigation Scheme',
    body: 'State Agriculture Department is accepting applications for micro-irrigation subsidies.',
    type: 'update',
    category: 'Irrigation',
    is_read: false,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'n2',
    title: 'Last date extended for Soil Health Card testing',
    body: 'Farmers can get free soil testing done at nearest Krishi Vigyan Kendra till next month.',
    type: 'update',
    category: 'Soil Health',
    is_read: false,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const notificationService = {
  getNotifications: async (): Promise<ApiResponse<Notification[]>> => {
    try {
      const response = await apiClient.get('/notifications');
      return response.data;
    } catch {
      return {
        success: true,
        data: MOCK_NOTIFICATIONS,
      };
    }
  },

  markAsRead: async (): Promise<void> => {
    try {
      await apiClient.put('/notifications/read');
    } catch {
      // Mock ignore
    }
  },
};
