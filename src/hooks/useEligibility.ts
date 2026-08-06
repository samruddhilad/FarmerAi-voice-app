/**
 * Eligibility Hooks
 */

import { useMutation } from '@tanstack/react-query';
import { eligibilityService } from '../services/eligibilityService';
import { EligibilityRequest } from '../types/api.types';

export const useCheckEligibility = () => {
  return useMutation({
    mutationFn: (data: EligibilityRequest) =>
      eligibilityService.checkEligibility(data),
  });
};
