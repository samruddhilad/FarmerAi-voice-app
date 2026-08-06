/**
 * Farmer Voice AI Assistant — Color Palette
 *
 * Primary: Green accent
 * Background: Permanent white
 * Design: Modern, minimal, professional
 */

export const Colors = {
  // Primary Forest Green Palette (matching design)
  primary: {
    50: '#EAF5ED',
    100: '#DCF0E2',
    200: '#B8E1C4',
    300: '#8CD09E',
    400: '#52B872',
    500: '#268E48', // Main green
    600: '#1E753B', // Rich forest green (matching badges/headers)
    700: '#165B2E',
    800: '#104422',
    900: '#0A2D16',
  },

  // Mint & Light Green Background Tokens
  mint: {
    50: '#F5F9F6',
    100: '#EDF7F0',
    200: '#E2F2E7',
    300: '#CEE8D7',
  },

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F8FAF9',
    100: '#F1F5F2',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Semantic Colors
  success: '#1E753B',
  error: '#DC2626',
  warning: '#D97706',
  info: '#2563EB',

  // Semantic Backgrounds
  successBg: '#EDF7F0',
  errorBg: '#FEF2F2',
  warningBg: '#FFFBEB',
  infoBg: '#EFF6FF',

  // Background
  background: '#F8FAF8',
  surface: '#FFFFFF',
  card: '#FFFFFF',

  // Text
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    link: '#1E753B',
  },

  // Border
  border: '#E5E7EB',
  divider: '#F3F4F6',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  shimmer: '#E2E8F0',
} as const;

export type ColorKeys = keyof typeof Colors;
