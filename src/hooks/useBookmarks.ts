/**
 * Bookmark Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarkService } from '../services/bookmarkService';
import { queryKeys } from '../constants/queryKeys';

export const useBookmarks = () => {
  return useQuery({
    queryKey: queryKeys.bookmarks.list(),
    queryFn: () => bookmarkService.getBookmarks(),
  });
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schemeId: string) =>
      bookmarkService.addBookmark({ scheme_id: schemeId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks.all });
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schemeId: string) => bookmarkService.removeBookmark(schemeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks.all });
    },
  });
};
