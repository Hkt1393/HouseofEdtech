/**
 * Border-radius tokens derived from the design system.
 *
 * The additional 2xl and 3xl tokens extend the documented radius progression
 * using the same 8px rhythm required by the design system.
 */

import type { ThemeRadius } from '../types';

export const radius = {
  none: 0,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  '2xl': 56,
  '3xl': 64,
  full: 9999,
} as const satisfies ThemeRadius;
