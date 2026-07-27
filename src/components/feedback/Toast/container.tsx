import React, { memo, useEffect, useMemo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../../theme';
import type { ToastItem } from '../../../types';

import { ToastView } from './view';

interface ToastFeedbackProps {
  readonly bottomInset: number;
  readonly isVisible: boolean;
  readonly onDismiss: () => void;
  readonly toastItem: ToastItem | null;
}

const ToastFeedbackComponent = ({
  bottomInset,
  isVisible,
  onDismiss,
  toastItem,
}: ToastFeedbackProps) => {
  const theme = useTheme();
  const { animation, colors, spacing } = theme;
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(spacing.lg);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (!toastItem) {
      return;
    }

    opacity.value = 0;
    translateY.value = spacing.lg;

    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: animation.duration.normal,
      });
      translateY.value = withTiming(0, {
        duration: animation.duration.normal,
      });
    }
  }, [
    animation.duration.normal,
    isVisible,
    opacity,
    spacing.lg,
    toastItem,
    translateY,
  ]);

  useEffect(() => {
    if (!toastItem || isVisible) {
      return;
    }

    opacity.value = withTiming(0, {
      duration: animation.duration.fast,
    });
    translateY.value = withTiming(spacing.lg, {
      duration: animation.duration.fast,
    });
  }, [
    animation.duration.fast,
    isVisible,
    opacity,
    spacing.lg,
    toastItem,
    translateY,
  ]);

  const presentation = useMemo(() => {
    switch (toastItem?.type) {
      case 'success':
        return {
          iconBackgroundColorToken: 'successContainer' as const,
          iconColor: colors.onSuccess,
          iconName: 'check' as const,
        };
      case 'warning':
        return {
          iconBackgroundColorToken: 'warningContainer' as const,
          iconColor: colors.onWarning,
          iconName: 'alert' as const,
        };
      case 'info':
        return {
          iconBackgroundColorToken: 'infoContainer' as const,
          iconColor: colors.onInfo,
          iconName: 'info' as const,
        };
      case 'error':
      default:
        return {
          iconBackgroundColorToken: 'errorContainer' as const,
          iconColor: colors.onError,
          iconName: 'alert' as const,
        };
    }
  }, [
    colors.onError,
    colors.onInfo,
    colors.onSuccess,
    colors.onWarning,
    toastItem?.type,
  ]);

  if (!toastItem) {
    return null;
  }

  return (
    <ToastView
      animatedStyle={animatedStyle}
      bottomInset={bottomInset}
      dismissIconColor={colors.textTertiary}
      isVisible={isVisible}
      onDismiss={onDismiss}
      theme={theme}
      toastItem={toastItem}
      {...presentation}
    />
  );
};

ToastFeedbackComponent.displayName = 'ToastFeedback';

export const ToastFeedback = memo(ToastFeedbackComponent);
