/**
 * Centralized spacing scale extracted from the design documents.
 */

import type { ThemeSpacing } from '../types';

const BASE_UNIT = 4;

export const spacing = {
  none: 0,
  unit: BASE_UNIT,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  gutterCompact: 12,
  gutter: 24,
  sectionGap: 40,
  containerMarginMobile: 16,
  containerMargin: 20,
  containerMarginDesktop: 48,
  safeAreaBuffer: 16,
} as const satisfies ThemeSpacing;
