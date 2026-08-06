/**
 * Scheme Hooks
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { schemeService } from '../services/schemeService';
import { queryKeys } from '../constants/queryKeys';
import { SchemeFilters } from '../types/api.types';

export const useSchemes = (filters?: SchemeFilters) => {
  return useInfiniteQuery({
    queryKey: queryKeys.schemes.list(filters as Record<string, unknown> | undefined),
    queryFn: ({ pageParam = 1 }) =>
      schemeService.getSchemes({ ...filters, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useScheme = (id: string) => {
  return useQuery({
    queryKey: queryKeys.schemes.detail(id),
    queryFn: () => schemeService.getSchemeById(id),
    enabled: !!id,
  });
};

export const useSchemeCategories = () => {
  return useQuery({
    queryKey: queryKeys.schemes.categories(),
    queryFn: () => schemeService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 min cache
  });
};

export const useSchemeSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.schemes.search(query),
    queryFn: () => schemeService.searchSchemes(query),
    enabled: query.length >= 2,
  });
};
