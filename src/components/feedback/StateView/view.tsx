import React, { memo } from 'react';

import { APP_STRINGS } from '../../../constants';
import { AppActivityIndicator, AppText, AppView } from '../../base';
import { Center, Stack } from '../../layout';
import { PrimaryButton } from '../../ui/AppButton';
import { AppIcon } from '../../ui/shared';
import { useTheme } from '../../../theme';

import type { EmptyViewProps, ErrorViewProps, LoadingViewProps } from './types';
import { styles } from './styles';

const LoadingViewComponent = ({
  description = APP_STRINGS.components.stateView.loadingDescription,
  title = APP_STRINGS.components.stateView.loadingTitle,
}: LoadingViewProps) => {
  return (
    <Center flex gap="md" padding="lg">
      <AppActivityIndicator />
      <Stack gap="xs">
        <AppText align="center" variant="subtitle">
          {title}
        </AppText>
        <AppText align="center" colorToken="textSecondary">
          {description}
        </AppText>
      </Stack>
    </Center>
  );
};

LoadingViewComponent.displayName = 'LoadingView';

const EmptyViewComponent = ({
  actionLabel,
  description = APP_STRINGS.components.stateView.emptyDescription,
  illustration,
  onAction,
  title = APP_STRINGS.components.stateView.emptyTitle,
}: EmptyViewProps) => {
  return (
    <Center flex gap="lg" padding="lg">
      {illustration}
      <Stack gap="xs">
        <AppText align="center" variant="subtitle">
          {title}
        </AppText>
        <AppText align="center" colorToken="textSecondary">
          {description}
        </AppText>
      </Stack>
      {actionLabel && onAction ? (
        <PrimaryButton label={actionLabel} onPress={onAction} />
      ) : null}
    </Center>
  );
};

EmptyViewComponent.displayName = 'EmptyView';

const ErrorViewComponent = ({
  description = APP_STRINGS.errors.genericDescription,
  illustration,
  onRetry,
  retryLabel = APP_STRINGS.common.retry,
  title = APP_STRINGS.errors.genericTitle,
}: ErrorViewProps) => {
  const { colors } = useTheme();

  return (
    <Center flex gap="lg" padding="lg">
      {illustration ?? (
        <AppView
          alignItems="center"
          backgroundColorToken="errorContainer"
          center
          radius="full"
          style={styles.stateIconContainer}
        >
          <AppIcon color={colors.error} name="alert" size={styles.stateIcon.width as number} />
        </AppView>
      )}
      <Stack gap="xs">
        <AppText align="center" colorToken="error" variant="subtitle">
          {title}
        </AppText>
        <AppText align="center" colorToken="textSecondary">
          {description}
        </AppText>
      </Stack>
      {onRetry ? <PrimaryButton label={retryLabel} onPress={onRetry} /> : null}
    </Center>
  );
};

ErrorViewComponent.displayName = 'ErrorView';

export const LoadingView = memo(LoadingViewComponent);
export const EmptyView = memo(EmptyViewComponent);
export const ErrorView = memo(ErrorViewComponent);
