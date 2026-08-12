/**
 * Farmer Voice AI Assistant — Color Palette
 *
 * Primary: Green accent
 * Background: Permanent white
 * Design: Modern, minimal, professional
 */

export const Colors = {
  // Agricultural Green Palette
  primaryGreen: '#187A3D',
  darkGreen: '#126B35',
  lightGreen: '#EAF6EE',
  veryLightGreen: '#F3FAF5',

  primary: {
    50: '#F3FAF5',
    100: '#EAF6EE',
    200: '#C8E6D1',
    300: '#8CD09E',
    400: '#34A853',
    500: '#187A3D', // Primary green
    600: '#126B35', // Dark green
    700: '#0E5229',
    800: '#0A3B1D',
    900: '#052211',
  },

  // Mint & Light Overlays
  mint: {
    50: '#F7F9F7',
    100: '#F3FAF5',
    200: '#EAF6EE',
    300: '#DDE5E0',
  },

  // Accent Color
  accent: '#FF8A00',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F7F9F7',
    100: '#F3F5F4',
    200: '#DDE5E0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#5F6B7A',
    600: '#475569',
    700: '#334155',
    800: '#172033',
    900: '#0F172A',
  },

  // Semantic Colors
  success: '#187A3D',
  error: '#DC2626',
  warning: '#FF8A00',
  info: '#0284C7',

  // Semantic Backgrounds
  successBg: '#EAF6EE',
  errorBg: '#FEF2F2',
  warningBg: '#FFF3E0',
  infoBg: '#E0F2FE',

  // Pastel Cards Colors
  cardBg: {
    green: '#F3FAF5',
    pink: '#FDF2F2',
    blue: '#F0F7FF',
    purple: '#F5F3FF',
    orange: '#FFF7ED',
    teal: '#ECFDF5',
    yellow: '#FFFDF0',
  },
  cardAccent: {
    green: '#187A3D',
    pink: '#E53935',
    blue: '#1E88E5',
    purple: '#8E24AA',
    orange: '#F57C00',
    teal: '#00897B',
    yellow: '#D97706',
  },

  // Background & Surface
  background: '#F7F9F7', // Off-white / light neutral background
  surface: '#FFFFFF',
  card: '#FFFFFF',

  // Text
  text: {
    primary: '#172033', // Dark navy text
    secondary: '#5F6B7A', // Secondary text gray
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
    link: '#187A3D',
  },

  // Border & Divider
  border: '#DDE5E0', // Soft subtle border
  divider: '#E5EBE7',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.4)',
  shimmer: '#EAF6EE',
} as const;

export type ColorKeys = keyof typeof Colors;

