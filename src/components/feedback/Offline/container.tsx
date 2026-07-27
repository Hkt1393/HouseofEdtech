import React, { memo, useCallback } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '../../../theme';

import { OfflineView } from './view';

interface OfflineFeedbackProps {
  readonly isRefreshing: boolean;
  readonly onRetry: () => void;
  readonly visible: boolean;
}

const OfflineFeedbackComponent = ({
  isRefreshing,
  onRetry,
  visible,
}: OfflineFeedbackProps) => {
  const { animation } = useTheme();
  const retryScale = useSharedValue(1);

  const retryAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: retryScale.value }],
  }));

  const handlePressIn = useCallback(() => {
    retryScale.value = withSpring(0.97, animation.spring.gentle);
  }, [animation.spring.gentle, retryScale]);

  const handlePressOut = useCallback(() => {
    retryScale.value = withSpring(1, animation.spring.gentle);
  }, [animation.spring.gentle, retryScale]);

  if (!visible) {
    return null;
  }

  return (
    <OfflineView
      isRefreshing={isRefreshing}
      onRetry={onRetry}
      onRetryPressIn={handlePressIn}
      onRetryPressOut={handlePressOut}
      retryAnimatedStyle={retryAnimatedStyle}
    />
  );
};

OfflineFeedbackComponent.displayName = 'OfflineFeedback';

export const OfflineFeedback = memo(OfflineFeedbackComponent);
