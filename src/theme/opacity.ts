/**
 * Reusable opacity tokens extracted from the design specifications.
 */

import type { ThemeOpacity } from '../types';

export const opacity = {
  transparent: 0,
  hairline: 0.05,
  subtle: 0.1,
  soft: 0.15,
  medium: 0.2,
  muted: 0.6,
  secondaryText: 0.7,
  glass: 0.8,
  opaque: 1,
} as const satisfies ThemeOpacity;
