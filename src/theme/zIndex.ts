/**
 * Layering scale for content stacking and overlay orchestration.
 */

import type { ThemeZIndex } from '../types';

export const zIndex = {
  base: 0,
  stickyHeader: 10,
  dropdown: 20,
  fab: 30,
  bottomSheet: 40,
  modal: 50,
  toast: 60,
  tooltip: 70,
  overlay: 80,
} as const satisfies ThemeZIndex;
