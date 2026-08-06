/**
 * Typography Scale
 * Clean, readable hierarchy for mobile-first design
 */

import { TextStyle } from 'react-native';

export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
  '6xl': 36,
} as const;

export const FontWeights: Record<string, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const LineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

export const Typography: Record<string, TextStyle> = {
  // Headings
  h1: {
    fontSize: FontSizes['5xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['5xl'] * LineHeights.tight,
  },
  h2: {
    fontSize: FontSizes['4xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['4xl'] * LineHeights.tight,
  },
  h3: {
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes['3xl'] * LineHeights.tight,
  },
  h4: {
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes['2xl'] * LineHeights.normal,
  },
  h5: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.xl * LineHeights.normal,
  },

  // Body
  bodyLg: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.lg * LineHeights.relaxed,
  },
  body: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.md * LineHeights.relaxed,
  },
  bodySm: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.sm * LineHeights.relaxed,
  },

  // Labels
  label: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.md * LineHeights.normal,
  },
  labelSm: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.sm * LineHeights.normal,
  },

  // Caption
  caption: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.xs * LineHeights.relaxed,
  },

  // Button
  button: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.lg * LineHeights.normal,
  },
  buttonSm: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.md * LineHeights.normal,
  },
} as const;
