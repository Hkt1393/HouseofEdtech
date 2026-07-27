import React, { memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { APP_STRINGS } from '../../../constants';
import { AppText, AppView } from '../../base';
import { Row, Stack } from '../../layout';
import { AppIcon } from '../../ui/shared';

import type { ToastItem } from '../../../types';

import { createDynamicStyles, styles } from './styles';

interface ToastViewProps {
  readonly animatedStyle: StyleProp<ViewStyle>;
  readonly bottomInset: number;
  readonly dismissIconColor: string;
  readonly iconBackgroundColorToken:
    | 'errorContainer'
    | 'infoContainer'
    | 'successContainer'
    | 'warningContainer';
  readonly iconColor: string;
  readonly iconName: 'alert' | 'check' | 'info';
  readonly isVisible: boolean;
  readonly onDismiss: () => void;
  readonly theme: Parameters<typeof createDynamicStyles>[0]['theme'];
  readonly toastItem: ToastItem;
}

const ToastViewComponent = ({
  animatedStyle,
  bottomInset,
  dismissIconColor,
  iconBackgroundColorToken,
  iconColor,
  iconName,
  isVisible,
  onDismiss,
  theme,
  toastItem,
}: ToastViewProps) => {
  const dynamicStyles = createDynamicStyles({
    bottomInset,
    theme,
  });

  return (
    <Animated.View pointerEvents="box-none">
      <Animated.View
        pointerEvents={isVisible ? 'auto' : 'none'}
        style={[dynamicStyles.viewport, animatedStyle]}
      >
        <AppView
          accessibilityLabel={APP_STRINGS.components.toast.notificationAccessibilityLabel}
          accessibilityRole="alert"
          style={dynamicStyles.card}
          testID="global-toast"
        >
          <Row style={dynamicStyles.content}>
            <Row gap="md" style={dynamicStyles.messageWrap}>
              <AppView
                alignItems="center"
                backgroundColorToken={iconBackgroundColorToken}
                center
                justifyContent="center"
                style={dynamicStyles.iconBadge}
              >
                <AppIcon color={iconColor} name={iconName} size={18} />
              </AppView>
              <Stack gap="xs" style={dynamicStyles.messageWrap}>
                <AppText variant="label">{toastItem.title}</AppText>
                <AppText colorToken="textSecondary" variant="caption">
                  {toastItem.message}
                </AppText>
              </Stack>
            </Row>
            <AppView
              accessibilityHint={APP_STRINGS.components.toast.dismissAccessibilityHint}
              accessibilityLabel={APP_STRINGS.components.toast.dismissAccessibilityLabel}
              accessibilityRole="button"
              alignItems="center"
              center
              justifyContent="center"
              onPress={onDismiss}
              radius="full"
              style={dynamicStyles.dismissButton}
              testID="toast-dismiss-button"
            >
              <AppIcon color={dismissIconColor} name="close" size={16} />
            </AppView>
          </Row>
        </AppView>
      </Animated.View>
    </Animated.View>
  );
};

ToastViewComponent.displayName = 'ToastView';

export const ToastView = memo(ToastViewComponent);
