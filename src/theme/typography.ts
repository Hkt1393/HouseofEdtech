/**
 * Centralized typography tokens and reusable text-style variants.
 */

import { Platform } from 'react-native';

import type {
  ThemeFontFamilies,
  ThemeFontSizes,
  ThemeFontWeights,
  ThemeLetterSpacing,
  ThemeLineHeights,
  ThemeTypography,
  ThemeTypographyVariant,
} from '../types';

const emToLetterSpacing = (fontSize: number, emValue: number): number => {
  return Number((fontSize * emValue).toFixed(2));
};

const fontFamilyFallback = Platform.select({
  ios: 'Inter',
  android: 'Inter',
  default: 'Inter',
}) ?? 'Inter';

const monospaceFontFamily = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
}) ?? 'monospace';

export const fontFamilies = {
  body: fontFamilyFallback,
  heading: fontFamilyFallback,
  mono: monospaceFontFamily,
} as const satisfies ThemeFontFamilies;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
} as const satisfies ThemeFontWeights;

export const fontSizes = {
  xxs: 12,
  xs: 13,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
} as const satisfies ThemeFontSizes;

export const lineHeights = {
  xxs: 16,
  xs: 18,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  '2xl': 38,
  '3xl': 40,
  '4xl': 48,
  '5xl': 56,
  '6xl': 64,
} as const satisfies ThemeLineHeights;

export const letterSpacing = {
  display: emToLetterSpacing(48, -0.02),
  displayMobile: emToLetterSpacing(32, -0.01),
  heroDisplay: emToLetterSpacing(40, -0.02),
  heroDisplayMobile: emToLetterSpacing(32, -0.02),
  headline: emToLetterSpacing(30, -0.01),
  normal: 0,
  label: emToLetterSpacing(14, 0.01),
  caption: emToLetterSpacing(12, 0.02),
  overline: emToLetterSpacing(12, 0.05),
} as const satisfies ThemeLetterSpacing;

const createVariant = (
  fontSize: number,
  fontWeight: ThemeTypographyVariant['fontWeight'],
  lineHeight: number,
  letterSpacingValue: number,
): ThemeTypographyVariant => ({
  fontFamily: fontFamilies.body,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing: letterSpacingValue,
});

export const typography = {
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacing,
  variants: {
    display: createVariant(48, fontWeights.bold, 56, letterSpacing.display),
    displayMobile: createVariant(
      32,
      fontWeights.bold,
      40,
      letterSpacing.displayMobile,
    ),
    heroDisplay: createVariant(
      40,
      fontWeights.extraBold,
      48,
      letterSpacing.heroDisplay,
    ),
    heroDisplayMobile: createVariant(
      32,
      fontWeights.extraBold,
      38,
      letterSpacing.heroDisplayMobile,
    ),
    headline: createVariant(30, fontWeights.semiBold, 38, letterSpacing.headline),
    headlineCompact: createVariant(24, fontWeights.semiBold, 32, 0),
    title: createVariant(24, fontWeights.semiBold, 32, 0),
    subtitle: createVariant(20, fontWeights.semiBold, 28, 0),
    body: createVariant(16, fontWeights.regular, 24, 0),
    bodyLarge: createVariant(18, fontWeights.regular, 28, 0),
    bodySmall: createVariant(14, fontWeights.regular, 20, 0),
    label: createVariant(14, fontWeights.semiBold, 20, letterSpacing.label),
    caption: createVariant(12, fontWeights.medium, 16, letterSpacing.caption),
    overline: createVariant(12, fontWeights.bold, 16, letterSpacing.overline),
    metadata: createVariant(13, fontWeights.medium, 18, 0),
  },
} as const satisfies ThemeTypography;
