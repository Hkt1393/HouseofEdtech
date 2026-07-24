/**
 * Cross-platform shadow presets.
 *
 * Light mode uses the documented ambient-shadow approach. Dark mode avoids
 * heavy drop-shadows and instead keeps presets effectively neutral.
 */

import type { ThemeShadowPreset, ThemeShadows } from '../types';

import { darkColors } from './dark';
import { elevation } from './elevation';
import { lightColors } from './light';

const createShadow = (
  shadowColor: string,
  height: number,
  radius: number,
  opacity: number,
  shadowElevation: number,
): ThemeShadowPreset => ({
  shadowColor,
  shadowOffset: { width: 0, height },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation: shadowElevation,
});

export const lightShadows = {
  xs: createShadow(lightColors.shadow, 2, 8, 0.04, elevation.xs),
  sm: createShadow(lightColors.shadow, 4, 20, 0.04, elevation.sm),
  md: createShadow(lightColors.shadow, 8, 24, 0.05, elevation.md),
  lg: createShadow(lightColors.shadow, 10, 40, 0.03, elevation.lg),
  xl: createShadow(lightColors.shadow, 16, 48, 0.04, elevation.xl),
} as const satisfies ThemeShadows;

export const darkShadows = {
  xs: createShadow(darkColors.shadow, 0, 0, 0, elevation.none),
  sm: createShadow(darkColors.shadow, 0, 0, 0, elevation.none),
  md: createShadow(darkColors.shadow, 0, 0, 0, elevation.none),
  lg: createShadow(darkColors.shadow, 0, 0, 0, elevation.none),
  xl: createShadow(darkColors.shadow, 0, 0, 0, elevation.none),
} as const satisfies ThemeShadows;
