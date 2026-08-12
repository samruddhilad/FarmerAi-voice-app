/**
 * Spacing & Layout Constants
 * 4px base unit spacing scale
 */

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 56,
  '7xl': 64,
} as const;

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export const Layout = {
  screenPaddingH: 20,
  screenPaddingV: 16,
  cardPadding: 18,
  sectionGap: 26,
  itemGap: 12,
  iconSize: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
  },
  touchTarget: 44,
  bottomTabHeight: 60,
  headerHeight: 56,
} as const;
