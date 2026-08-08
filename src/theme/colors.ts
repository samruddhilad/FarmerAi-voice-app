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
    400: '#66BB6A', // Secondary light green
    500: '#2E7D32', // Main primary green
    600: '#1B5E20', // Rich dark forest green
    700: '#144D1B',
    800: '#0E3B14',
    900: '#07240C',
  },

  // Accent & Cream/Mint Tokens
  mint: {
    50: '#FFFDF9',
    100: '#FFF3E0', // Light warm accent cream
    200: '#E8F5E9', // Soft light green overlay
    300: '#C8E6C9',
  },

  // Accent Color
  accent: '#FF8A00', // Accent Orange

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#FAF8F5',
    100: '#F5F2EC',
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
  success: '#2E7D32',
  error: '#DC2626',
  warning: '#FF8A00',
  info: '#0284C7',

  // Semantic Backgrounds
  successBg: '#E8F5E9',
  errorBg: '#FEF2F2',
  warningBg: '#FFF3E0',
  infoBg: '#E0F2FE',

  // Pastel Cards Colors for Quick Services
  cardBg: {
    green: '#F0F9F1',
    pink: '#FDF2F2',
    blue: '#F0F7FF',
    purple: '#F5F3FF',
    orange: '#FFF7ED',
    teal: '#ECFDF5',
    yellow: '#FFFDF0',
  },
  cardAccent: {
    green: '#2E7D32',
    pink: '#E53935',
    blue: '#1E88E5',
    purple: '#8E24AA',
    orange: '#F57C00',
    teal: '#00897B',
    yellow: '#D97706',
  },

  // Background
  background: '#FAFAFA', // Clean soft background
  surface: '#FFFFFF',
  card: '#FFFFFF',

  // Text
  text: {
    primary: '#111827', // Crisp high contrast text
    secondary: '#4B5563', // Subtitle text
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    link: '#2E7D32',
  },

  // Border
  border: '#E5E7EB',
  divider: '#F3F4F6',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.4)',
  shimmer: '#E2E8F0',
} as const;

export type ColorKeys = keyof typeof Colors;

