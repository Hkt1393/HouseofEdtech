import React, { forwardRef, memo, useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';
import { moderateScale } from '../../../utils';

import {
  resolveColorToken,
  resolveElevationValue,
  resolveInsetStyles,
  resolveOpacityValue,
  resolveRadiusValue,
} from '../shared';

import { createDynamicStyles, styles } from './styles';
import type { AppViewProps } from './types';
import { AppViewView } from './view';

const AppViewContainerComponent = forwardRef<
  React.ElementRef<typeof View>,
  AppViewProps
>(
  (
    {
      alignItems,
      androidRippleColorToken,
      backgroundColorToken,
      borderColorToken,
      borderWidth,
      center = false,
      column,
      disabled = false,
      elevation,
      flex,
      gap,
      hitSlop,
      justifyContent,
      margin,
      marginBottom,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginTop,
      marginVertical,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      opacityValue,
      padding,
      paddingBottom,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingVertical,
      pressRetentionOffset,
      pressedOpacityValue = 'glass',
      radius,
      row = false,
      shadow,
      style,
      wrap,
      ...restProps
    },
    ref,
  ) => {
    const { colors, elevation: elevationScale, opacity, radius: radiusScale, shadows, spacing } =
      useTheme();

    const resolvedFlex = typeof flex === 'boolean' ? (flex ? 1 : undefined) : flex;
    const isInteractive = Boolean(onPress || onLongPress || onPressIn || onPressOut);

    const insetStyle = useMemo<ViewStyle>(
      () =>
        resolveInsetStyles(
          {
            gap,
            margin,
            marginBottom,
            marginHorizontal,
            marginLeft,
            marginRight,
            marginTop,
            marginVertical,
            padding,
            paddingBottom,
            paddingHorizontal,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingVertical,
          },
          spacing,
        ),
      [
        gap,
        margin,
        marginBottom,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginTop,
        marginVertical,
        padding,
        paddingBottom,
        paddingHorizontal,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingVertical,
        spacing,
      ],
    );

    const surfaceStyle = useMemo<ViewStyle>(
      () => ({
        ...insetStyle,
        ...(shadow ? shadows[shadow] : undefined),
        alignItems,
        backgroundColor: resolveColorToken(backgroundColorToken, colors),
        borderColor: resolveColorToken(borderColorToken, colors),
        borderRadius: resolveRadiusValue(radius, radiusScale),
        borderWidth:
          borderWidth === undefined ? undefined : moderateScale(borderWidth),
        elevation: resolveElevationValue(elevation, elevationScale),
        flex: resolvedFlex,
        flexDirection: row ? 'row' : column ? 'column' : 'column',
        flexWrap: wrap,
        justifyContent,
        opacity: disabled
          ? opacity.muted
          : resolveOpacityValue(opacityValue, opacity),
      }),
      [
        alignItems,
        backgroundColorToken,
        borderColorToken,
        borderWidth,
        colors,
        column,
        elevation,
        elevationScale,
        insetStyle,
        justifyContent,
        opacity,
        opacityValue,
        radius,
        radiusScale,
        resolvedFlex,
        row,
        shadow,
        shadows,
        wrap,
      ],
    );

    const pressedStyle = useMemo<ViewStyle | undefined>(
      () =>
        isInteractive && !disabled
          ? {
              opacity: resolveOpacityValue(pressedOpacityValue, opacity),
            }
          : undefined,
      [disabled, isInteractive, opacity, pressedOpacityValue],
    );

    const androidRippleColor = useMemo(
      () => resolveColorToken(androidRippleColorToken, colors),
      [androidRippleColorToken, colors],
    );

    const dynamicStyles = useMemo(() => createDynamicStyles(surfaceStyle), [surfaceStyle]);

    const resolvedStyle = useMemo(
      () => [
        row ? styles.row : styles.column,
        center ? styles.center : null,
        dynamicStyles.container,
        style,
      ],
      [center, dynamicStyles.container, row, style],
    );

    return (
      <AppViewView
        androidRippleColor={androidRippleColor}
        disabled={disabled}
        hitSlop={hitSlop}
        isInteractive={isInteractive}
        onLongPress={onLongPress}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        pressRetentionOffset={pressRetentionOffset}
        pressedOpacityValue={pressedOpacityValue}
        pressedStyle={pressedStyle}
        ref={ref}
        resolvedStyle={resolvedStyle}
        {...restProps}
      />
    );
  },
);

AppViewContainerComponent.displayName = 'AppView';

export const AppView = memo(AppViewContainerComponent);
