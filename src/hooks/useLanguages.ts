/**
 * Language Hooks
 */

import { useQuery } from '@tanstack/react-query';
import { languageService } from '../services/languageService';
import { queryKeys } from '../constants/queryKeys';

export const useLanguages = () => {
  return useQuery({
    queryKey: queryKeys.languages.list(),
    queryFn: () => languageService.getLanguages(),
    staleTime: 60 * 60 * 1000, // Languages rarely change — cache 1hr
  });
};
