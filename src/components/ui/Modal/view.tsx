import React, { memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { APP_STRINGS } from '../../../constants';
import { AppModal, AppText, AppView } from '../../base';
import { AbsoluteFill, Card, SafeAreaContainer, Stack } from '../../layout';
import { GhostButton, PrimaryButton } from '../AppButton';

import { styles } from './styles';
import type { BottomSheetProps, ConfirmationDialogProps } from './types';

const BottomSheetViewComponent = ({
  children,
  description,
  footer,
  onClose,
  sheetStyle,
  title,
  visible,
}: BottomSheetProps & { sheetStyle: StyleProp<ViewStyle> }) => {
  return (
    <AppModal onRequestClose={onClose} visible={visible}>
      <AppView flex style={styles.sheetContainer}>
        <AppView
          accessibilityLabel={APP_STRINGS.components.modal.dismissAccessibilityLabel}
          accessibilityHint={APP_STRINGS.components.modal.dismissAccessibilityHint}
          accessibilityRole="button"
          backgroundColorToken="overlay"
          onPress={onClose}
          style={styles.backdrop}
        />
        <SafeAreaContainer edges={['bottom']} mode="padding">
          <Card bordered={false} gap="lg" padding="lg" style={sheetStyle}>
            {(title || description) ? (
              <Stack gap="xs">
                {title ? <AppText variant="title">{title}</AppText> : null}
                {description ? (
                  <AppText colorToken="textSecondary">{description}</AppText>
                ) : null}
              </Stack>
            ) : null}
            {children}
            {footer}
          </Card>
        </SafeAreaContainer>
      </AppView>
    </AppModal>
  );
};

BottomSheetViewComponent.displayName = 'BottomSheetView';

const ConfirmationDialogViewComponent = ({
  cancelLabel = APP_STRINGS.common.cancel,
  confirmLabel = APP_STRINGS.components.modal.confirmLabel,
  description,
  dialogStyle,
  onCancel,
  onConfirm,
  title,
  visible,
}: ConfirmationDialogProps & { dialogStyle: StyleProp<ViewStyle> }) => {
  return (
    <AppModal onRequestClose={onCancel} visible={visible}>
      <AppView flex style={styles.center}>
        <AbsoluteFill
          accessibilityHint={APP_STRINGS.components.modal.dismissAccessibilityHint}
          accessibilityLabel={APP_STRINGS.components.modal.dismissAccessibilityLabel}
          accessibilityRole="button"
          backgroundColorToken="overlay"
          onPress={onCancel}
        />
        <Card bordered={false} gap="lg" padding="lg" style={dialogStyle}>
          <Stack gap="xs">
            <AppText variant="title">{title}</AppText>
            <AppText colorToken="textSecondary">{description}</AppText>
          </Stack>
          <AppView row gap="sm" justifyContent="flex-end">
            <GhostButton label={cancelLabel} onPress={onCancel} />
            <PrimaryButton label={confirmLabel} onPress={onConfirm} />
          </AppView>
        </Card>
      </AppView>
    </AppModal>
  );
};

ConfirmationDialogViewComponent.displayName = 'ConfirmationDialogView';

export const BottomSheetView = memo(BottomSheetViewComponent);
export const ConfirmationDialogView = memo(ConfirmationDialogViewComponent);
