import React, { memo } from 'react';

import { APP_STRINGS } from '../../../constants';
import { AppActivityIndicator, AppText, AppView } from '../../base';
import { GhostButton } from '../AppButton';

import { Row, Stack } from '../../layout';

import { styles } from './styles';
import type { InfiniteLoaderProps, PullToRefreshProps } from './types';

const PullToRefreshViewComponent = ({
  isRefreshing = false,
  label = APP_STRINGS.components.loader.pullToRefreshLabel,
  onRefresh,
  refreshIcon,
}: PullToRefreshProps & { refreshIcon: React.ReactNode }) => {
  if (isRefreshing) {
    return (
      <Row alignItems="center" gap="sm" justifyContent="center">
        <AppActivityIndicator />
        <AppText colorToken="textSecondary" variant="caption">
          {label}
        </AppText>
      </Row>
    );
  }

  return <GhostButton icon={refreshIcon} label={label} onPress={onRefresh} />;
};

PullToRefreshViewComponent.displayName = 'PullToRefreshView';

const InfiniteLoaderViewComponent = ({
  errorMessage,
  hasMore = true,
  isLoading = false,
  label = APP_STRINGS.components.loader.infiniteLoadingLabel,
  onRetry,
}: InfiniteLoaderProps) => {
  if (!hasMore) {
    return (
      <AppText colorToken="textTertiary" style={styles.centerLabel} variant="caption">
        {APP_STRINGS.components.loader.noMoreContentLabel}
      </AppText>
    );
  }

  if (errorMessage && onRetry) {
    return (
      <Stack gap="sm">
        <AppText colorToken="error" style={styles.centerLabel} variant="caption">
          {errorMessage}
        </AppText>
        <GhostButton label={APP_STRINGS.common.retry} onPress={onRetry} />
      </Stack>
    );
  }

  return (
    <Row alignItems="center" gap="sm" justifyContent="center">
      {isLoading ? <AppActivityIndicator /> : null}
      <AppText colorToken="textSecondary" variant="caption">
        {label}
      </AppText>
    </Row>
  );
};

InfiniteLoaderViewComponent.displayName = 'InfiniteLoaderView';

export const PullToRefreshView = memo(PullToRefreshViewComponent);
export const InfiniteLoaderView = memo(InfiniteLoaderViewComponent);
