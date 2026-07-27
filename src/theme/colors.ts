/**
 * Central color exports for the theme engine.
 */

import type { ThemeColorSchemes } from '../types';

import { darkColors } from './dark';
import { lightColors } from './light';

export { darkColors, lightColors };

export const colorSchemes = {
  light: lightColors,
  dark: darkColors,
} as const satisfies ThemeColorSchemes;
