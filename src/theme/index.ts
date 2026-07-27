/**
 * Barrel exports for the centralized theme engine.
 */

import { colorSchemes } from './colors';
import { darkTheme, lightTheme, themes } from './theme';
import { animation } from './animation';
import { elevation } from './elevation';
import { opacity } from './opacity';
import { radius } from './radius';
import { spacing } from './spacing';
import { typography } from './typography';
import { zIndex } from './zIndex';

export * from './animation';
export * from './colors';
export * from './dark';
export * from './elevation';
export * from './light';
export * from './opacity';
export * from './radius';
export * from './shadows';
export * from './spacing';
export * from './theme';
export * from './ThemeProvider';
export * from './typography';
export * from './useTheme';
export * from './zIndex';

export const designSystem = {
  colorSchemes,
  spacing,
  radius,
  typography,
  elevation,
  animation,
  opacity,
  zIndex,
  themes,
  lightTheme,
  darkTheme,
} as const;
