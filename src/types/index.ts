/**
 * Shared theme-engine and utility types used across the application.
 */

import type { TextStyle } from 'react-native';
import type { ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';
export type ThemePreference = ThemeMode | 'system';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceLowest: string;
  surfaceLow: string;
  surfaceSecondary: string;
  surfaceHigh: string;
  surfaceHighest: string;
  surfaceVariant: string;
  card: string;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  primaryFixed: string;
  primaryFixedDim: string;
  onPrimaryFixed: string;
  onPrimaryFixedVariant: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  secondaryFixed: string;
  secondaryFixedDim: string;
  onSecondaryFixed: string;
  onSecondaryFixedVariant: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  tertiaryFixed: string;
  tertiaryFixedDim: string;
  onTertiaryFixed: string;
  onTertiaryFixedVariant: string;
  accent: string;
  success: string;
  successContainer: string;
  onSuccess: string;
  warning: string;
  warningContainer: string;
  onWarning: string;
  error: string;
  errorContainer: string;
  onError: string;
  info: string;
  infoContainer: string;
  onInfo: string;
  inverseSurface: string;
  inversePrimary: string;
  border: string;
  divider: string;
  overlay: string;
  shadow: string;
  glassOverlay: string;
  heroOverlay: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  iconPrimary: string;
  iconSecondary: string;
  navigationBackground: string;
  surfaceTint: string;
  white: string;
  black: string;
  transparent: string;
}

export type ThemeColorSchemes = Record<ThemeMode, ThemeColors>;

export interface ThemeSpacing {
  none: number;
  unit: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  gutterCompact: number;
  gutter: number;
  sectionGap: number;
  containerMarginMobile: number;
  containerMargin: number;
  containerMarginDesktop: number;
  safeAreaBuffer: number;
}

export interface ThemeRadius {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  full: number;
}

export interface ThemeFontFamilies {
  body: string;
  heading: string;
  mono: string;
}

export interface ThemeFontWeights {
  regular: NonNullable<TextStyle['fontWeight']>;
  medium: NonNullable<TextStyle['fontWeight']>;
  semiBold: NonNullable<TextStyle['fontWeight']>;
  bold: NonNullable<TextStyle['fontWeight']>;
  extraBold: NonNullable<TextStyle['fontWeight']>;
}

export interface ThemeFontSizes {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
  '6xl': number;
}

export interface ThemeLineHeights {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
  '6xl': number;
}

export interface ThemeLetterSpacing {
  display: number;
  displayMobile: number;
  heroDisplay: number;
  heroDisplayMobile: number;
  headline: number;
  normal: number;
  label: number;
  caption: number;
  overline: number;
}

export interface ThemeTypographyVariant {
  fontFamily: string;
  fontSize: number;
  fontWeight: NonNullable<TextStyle['fontWeight']>;
  lineHeight: number;
  letterSpacing: number;
}

export interface ThemeTypographyVariants {
  display: ThemeTypographyVariant;
  displayMobile: ThemeTypographyVariant;
  heroDisplay: ThemeTypographyVariant;
  heroDisplayMobile: ThemeTypographyVariant;
  headline: ThemeTypographyVariant;
  headlineCompact: ThemeTypographyVariant;
  title: ThemeTypographyVariant;
  subtitle: ThemeTypographyVariant;
  body: ThemeTypographyVariant;
  bodyLarge: ThemeTypographyVariant;
  bodySmall: ThemeTypographyVariant;
  label: ThemeTypographyVariant;
  caption: ThemeTypographyVariant;
  overline: ThemeTypographyVariant;
  metadata: ThemeTypographyVariant;
}

export interface ThemeTypography {
  fontFamilies: ThemeFontFamilies;
  fontWeights: ThemeFontWeights;
  fontSizes: ThemeFontSizes;
  lineHeights: ThemeLineHeights;
  letterSpacing: ThemeLetterSpacing;
  variants: ThemeTypographyVariants;
}

export interface ThemeShadowOffset {
  width: number;
  height: number;
}

export interface ThemeShadowPreset {
  shadowColor: string;
  shadowOffset: ThemeShadowOffset;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ThemeShadows {
  xs: ThemeShadowPreset;
  sm: ThemeShadowPreset;
  md: ThemeShadowPreset;
  lg: ThemeShadowPreset;
  xl: ThemeShadowPreset;
}

export interface ThemeElevation {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export type ThemeEasingFunction = (value: number) => number;

export interface ThemeAnimationDurations {
  instant: number;
  fast: number;
  normal: number;
  slow: number;
  slower: number;
}

export interface ThemeAnimationEasing {
  linear: ThemeEasingFunction;
  standard: ThemeEasingFunction;
  decelerate: ThemeEasingFunction;
  accelerate: ThemeEasingFunction;
  emphasized: ThemeEasingFunction;
}

export interface ThemeSpringPreset {
  damping: number;
  mass: number;
  stiffness: number;
  overshootClamping: boolean;
  restDisplacementThreshold: number;
  restSpeedThreshold: number;
}

export interface ThemeAnimationSprings {
  gentle: ThemeSpringPreset;
  standard: ThemeSpringPreset;
  snappy: ThemeSpringPreset;
}

export interface ThemeTimingPreset {
  duration: number;
  easing: ThemeEasingFunction;
}

export interface ThemeAnimationTimings {
  fast: ThemeTimingPreset;
  standard: ThemeTimingPreset;
  slow: ThemeTimingPreset;
}

export interface ThemeAnimation {
  duration: ThemeAnimationDurations;
  easing: ThemeAnimationEasing;
  spring: ThemeAnimationSprings;
  timing: ThemeAnimationTimings;
}

export interface ThemeOpacity {
  transparent: number;
  hairline: number;
  subtle: number;
  soft: number;
  medium: number;
  muted: number;
  secondaryText: number;
  glass: number;
  opaque: number;
}

export interface ThemeZIndex {
  base: number;
  stickyHeader: number;
  dropdown: number;
  fab: number;
  bottomSheet: number;
  modal: number;
  toast: number;
  tooltip: number;
  overlay: number;
}

export interface Theme {
  name: string;
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  typography: ThemeTypography;
  animation: ThemeAnimation;
  opacity: ThemeOpacity;
  zIndex: ThemeZIndex;
  shadows: ThemeShadows;
  elevation: ThemeElevation;
}

export interface ThemeContextValue {
  theme: Theme;
  themeMode: ThemePreference;
  resolvedThemeMode: ThemeMode;
  isDark: boolean;
  reduceMotionEnabled: boolean;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  typography: ThemeTypography;
  animation: ThemeAnimation;
  opacity: ThemeOpacity;
  zIndex: ThemeZIndex;
  shadows: ThemeShadows;
  elevation: ThemeElevation;
  setThemeMode: (mode: ThemePreference) => void;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  initialThemeMode?: ThemePreference;
}

export interface NativeWindVariableMap {
  [key: `--${string}`]: string | number;
}

export interface SafeAreaInsetsLike {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type DeviceOrientation = 'portrait' | 'landscape';
export type NativePlatform = 'android' | 'ios' | 'web';
