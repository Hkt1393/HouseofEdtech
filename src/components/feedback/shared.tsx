/**
 * Shared helpers for feedback and skeleton components.
 */

import React, { memo, useEffect, useMemo } from 'react';
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { COMPONENT_DEFAULTS } from '../../constants';
import { useTheme } from '../../theme';
import { moderateScale } from '../../utils';

export interface SkeletonBlockProps {
  height: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue;
}

const SkeletonBlockComponent = ({
  height,
  radius = moderateScale(16),
  style,
  width = '100%',
}: SkeletonBlockProps) => {
  const { animation, colors } = useTheme();
  const opacity = useSharedValue<number>(
    COMPONENT_DEFAULTS.feedback.skeletonPulseOpacity,
  );

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: animation.duration.slower,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(COMPONENT_DEFAULTS.feedback.skeletonPulseOpacity, {
          duration: animation.duration.slower,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      false,
    );
  }, [animation.duration.slower, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const resolvedStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: colors.surfaceHigh,
      borderRadius: radius,
      height,
      width,
    }),
    [colors.surfaceHigh, height, radius, width],
  );

  return <Animated.View style={[resolvedStyle, animatedStyle, style]} />;
};

SkeletonBlockComponent.displayName = 'SkeletonBlock';

export const SkeletonBlock = memo(SkeletonBlockComponent);
