/**
 * Android elevation tokens aligned to the platform depth scale.
 */

import type { ThemeElevation } from '../types';

export const elevation = {
  none: 0,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
} as const satisfies ThemeElevation;
