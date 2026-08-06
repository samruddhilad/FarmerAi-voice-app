/**
 * Eligibility Service
 * Endpoint: POST /eligibility/check
 */

import apiClient from '../api/client';
import {
  ApiResponse,
  EligibilityRequest,
  EligibilityResponse,
} from '../types/api.types';

export const eligibilityService = {
  checkEligibility: async (
    data: EligibilityRequest
  ): Promise<ApiResponse<EligibilityResponse>> => {
    const response = await apiClient.post('/eligibility/check', data);
    return response.data;
  },
};
