/**
 * Shared token types and style-resolution helpers for base components.
 */

import type { TextStyle, ViewStyle } from 'react-native';

import type {
  ThemeColors,
  ThemeElevation,
  ThemeFontWeights,
  ThemeOpacity,
  ThemeRadius,
  ThemeShadows,
  ThemeSpacing,
  ThemeTypography,
} from '../../types';
import { moderateScale, verticalScale } from '../../utils';

export type ThemeColorToken = keyof ThemeColors;
export type ThemeSpacingToken = keyof ThemeSpacing;
export type ThemeRadiusToken = keyof ThemeRadius;
export type ThemeShadowToken = keyof ThemeShadows;
export type ThemeOpacityToken = keyof ThemeOpacity;
export type ThemeElevationToken = keyof ThemeElevation;
export type ThemeFontWeightToken = keyof ThemeFontWeights;

export type ThemeSpacingValue = ThemeSpacingToken | number;
export type ThemeRadiusValue = ThemeRadiusToken | number;
export type ThemeOpacityValue = ThemeOpacityToken | number;
export type ThemeElevationValue = ThemeElevationToken | number;

export type AppTextVariant =
  | 'heading'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'label'
  | 'overline';

export interface InsetProps {
  gap?: ThemeSpacingValue;
  margin?: ThemeSpacingValue;
  marginBottom?: ThemeSpacingValue;
  marginHorizontal?: ThemeSpacingValue;
  marginLeft?: ThemeSpacingValue;
  marginRight?: ThemeSpacingValue;
  marginTop?: ThemeSpacingValue;
  marginVertical?: ThemeSpacingValue;
  padding?: ThemeSpacingValue;
  paddingBottom?: ThemeSpacingValue;
  paddingHorizontal?: ThemeSpacingValue;
  paddingLeft?: ThemeSpacingValue;
  paddingRight?: ThemeSpacingValue;
  paddingTop?: ThemeSpacingValue;
  paddingVertical?: ThemeSpacingValue;
}

const typographyVariantMap = {
  body: 'body',
  caption: 'caption',
  heading: 'headline',
  label: 'label',
  overline: 'overline',
  subtitle: 'subtitle',
  title: 'title',
} as const;

/**
 * Resolves a theme color token into a concrete color string.
 */
export const resolveColorToken = (
  colorToken: ThemeColorToken | undefined,
  colors: ThemeColors,
): string | undefined => {
  return colorToken ? colors[colorToken] : undefined;
};

/**
 * Resolves spacing values into responsive pixel values.
 */
export const resolveSpacingValue = (
  value: ThemeSpacingValue | undefined,
  spacing: ThemeSpacing,
): number | undefined => {
  if (value === undefined) {
    return undefined;
  }

  const resolvedValue =
    typeof value === 'number' ? value : spacing[value];

  return moderateScale(resolvedValue);
};

/**
 * Resolves radius values into responsive pixel values.
 */
export const resolveRadiusValue = (
  value: ThemeRadiusValue | undefined,
  radius: ThemeRadius,
): number | undefined => {
  if (value === undefined) {
    return undefined;
  }

  const resolvedValue =
    typeof value === 'number' ? value : radius[value];

  return moderateScale(resolvedValue);
};

/**
 * Resolves opacity values from tokens or raw values.
 */
export const resolveOpacityValue = (
  value: ThemeOpacityValue | undefined,
  opacity: ThemeOpacity,
): number | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? value : opacity[value];
};

/**
 * Resolves Android elevation values from tokens or raw values.
 */
export const resolveElevationValue = (
  value: ThemeElevationValue | undefined,
  elevation: ThemeElevation,
): number | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? Math.round(value) : elevation[value];
};

/**
 * Creates inset-related view styles from spacing props.
 */
export const resolveInsetStyles = (
  props: InsetProps,
  spacing: ThemeSpacing,
): ViewStyle => ({
  gap: resolveSpacingValue(props.gap, spacing),
  margin: resolveSpacingValue(props.margin, spacing),
  marginBottom: resolveSpacingValue(props.marginBottom, spacing),
  marginHorizontal: resolveSpacingValue(props.marginHorizontal, spacing),
  marginLeft: resolveSpacingValue(props.marginLeft, spacing),
  marginRight: resolveSpacingValue(props.marginRight, spacing),
  marginTop: resolveSpacingValue(props.marginTop, spacing),
  marginVertical: resolveSpacingValue(props.marginVertical, spacing),
  padding: resolveSpacingValue(props.padding, spacing),
  paddingBottom: resolveSpacingValue(props.paddingBottom, spacing),
  paddingHorizontal: resolveSpacingValue(props.paddingHorizontal, spacing),
  paddingLeft: resolveSpacingValue(props.paddingLeft, spacing),
  paddingRight: resolveSpacingValue(props.paddingRight, spacing),
  paddingTop: resolveSpacingValue(props.paddingTop, spacing),
  paddingVertical: resolveSpacingValue(props.paddingVertical, spacing),
});

/**
 * Resolves a text variant into a responsive text style.
 */
export const resolveTypographyStyle = (
  variant: AppTextVariant,
  typography: ThemeTypography,
): TextStyle => {
  const variantStyle = typography.variants[typographyVariantMap[variant]];

  return {
    fontFamily: variantStyle.fontFamily,
    fontSize: moderateScale(variantStyle.fontSize),
    fontWeight: variantStyle.fontWeight,
    letterSpacing: moderateScale(variantStyle.letterSpacing),
    lineHeight: verticalScale(variantStyle.lineHeight),
    textTransform: variant === 'overline' ? 'uppercase' : undefined,
  };
};

/**
 * Resolves an optional theme font-weight token into a concrete font-weight value.
 */
export const resolveFontWeight = (
  weight: ThemeFontWeightToken | undefined,
  typography: ThemeTypography,
): TextStyle['fontWeight'] | undefined => {
  return weight ? typography.fontWeights[weight] : undefined;
};
