/**
 * Theme composition utilities and the exported light/dark theme objects.
 */

import type {
  NativeWindVariableMap,
  Theme,
  ThemeMode,
  ThemePreference,
} from '../types';

import { animation } from './animation';
import { darkColors } from './dark';
import { darkShadows, lightShadows } from './shadows';
import { elevation } from './elevation';
import { lightColors } from './light';
import { opacity } from './opacity';
import { radius } from './radius';
import { spacing } from './spacing';
import { typography } from './typography';
import { zIndex } from './zIndex';

const toCssDimension = (value: number): string => `${value}px`;

const createTheme = (
  name: string,
  mode: ThemeMode,
  colors: Theme['colors'],
  shadows: Theme['shadows'],
): Theme => ({
  name,
  mode,
  isDark: mode === 'dark',
  colors,
  spacing,
  radius,
  typography,
  animation,
  opacity,
  zIndex,
  shadows,
  elevation,
});

export const lightTheme = createTheme(
  'Aura Stream Light',
  'light',
  lightColors,
  lightShadows,
);

export const darkTheme = createTheme('Aura Stream', 'dark', darkColors, darkShadows);

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const satisfies Record<ThemeMode, Theme>;

export const resolveThemeMode = (
  preferredMode: ThemePreference,
  systemMode: ThemeMode,
): ThemeMode => {
  return preferredMode === 'system' ? systemMode : preferredMode;
};

export const getTheme = (mode: ThemeMode): Theme => themes[mode];

export const getNativeWindVariables = (theme: Theme): NativeWindVariableMap => {
  const variables: NativeWindVariableMap = {};

  for (const [token, value] of Object.entries(theme.colors)) {
    variables[`--color-${token}`] = value;
  }

  for (const [token, value] of Object.entries(theme.spacing)) {
    variables[`--spacing-${token}`] = toCssDimension(value);
  }

  for (const [token, value] of Object.entries(theme.radius)) {
    variables[`--radius-${token}`] = toCssDimension(value);
  }

  for (const [token, value] of Object.entries(theme.typography.fontFamilies)) {
    variables[`--font-family-${token}`] = value;
  }

  for (const [token, value] of Object.entries(theme.typography.variants)) {
    variables[`--font-size-${token}`] = toCssDimension(value.fontSize);
    variables[`--line-height-${token}`] = toCssDimension(value.lineHeight);
    variables[`--letter-spacing-${token}`] = toCssDimension(value.letterSpacing);
  }

  return variables;
};
