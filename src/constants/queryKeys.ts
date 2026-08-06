/**
 * Centralized Query Key Factory
 * Ensures consistent cache keys across the app
 */

export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // Profile
  profile: {
    all: ['profile'] as const,
    detail: () => [...queryKeys.profile.all, 'detail'] as const,
  },

  // Languages
  languages: {
    all: ['languages'] as const,
    list: () => [...queryKeys.languages.all, 'list'] as const,
  },

  // Schemes
  schemes: {
    all: ['schemes'] as const,
    lists: () => [...queryKeys.schemes.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.schemes.lists(), filters] as const,
    details: () => [...queryKeys.schemes.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.schemes.details(), id] as const,
    categories: () => [...queryKeys.schemes.all, 'categories'] as const,
    search: (query: string) =>
      [...queryKeys.schemes.all, 'search', query] as const,
  },

  // Eligibility
  eligibility: {
    all: ['eligibility'] as const,
    check: () => [...queryKeys.eligibility.all, 'check'] as const,
  },

  // Bookmarks
  bookmarks: {
    all: ['bookmarks'] as const,
    list: () => [...queryKeys.bookmarks.all, 'list'] as const,
  },

  // History
  history: {
    all: ['history'] as const,
    lists: () => [...queryKeys.history.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.history.all, 'detail', id] as const,
  },

  // Notifications
  notifications: {
    all: ['notifications'] as const,
    list: () => [...queryKeys.notifications.all, 'list'] as const,
  },

  // Quick Actions
  quickActions: {
    all: ['quickActions'] as const,
    list: () => [...queryKeys.quickActions.all, 'list'] as const,
  },

  // Voice
  voice: {
    all: ['voice'] as const,
  },

  // Chat
  chat: {
    all: ['chat'] as const,
  },

  // Health
  health: {
    all: ['health'] as const,
    check: () => [...queryKeys.health.all, 'check'] as const,
  },
} as const;
