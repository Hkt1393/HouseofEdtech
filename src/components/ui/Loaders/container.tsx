import React, { memo, useMemo } from 'react';

import { useTheme } from '../../../theme';
import { moderateScale } from '../../../utils';

import { AppIcon } from '../shared';

import { InfiniteLoaderView, PullToRefreshView } from './view';
import type { InfiniteLoaderProps, PullToRefreshProps } from './types';

const PullToRefreshComponent = (props: PullToRefreshProps) => {
  const { colors } = useTheme();

  const refreshIcon = useMemo(
    () => (
      <AppIcon
        color={colors.textPrimary}
        name="refresh"
        size={moderateScale(16)}
      />
    ),
    [colors.textPrimary],
  );

  return <PullToRefreshView refreshIcon={refreshIcon} {...props} />;
};

PullToRefreshComponent.displayName = 'PullToRefresh';

const InfiniteLoaderComponent = (props: InfiniteLoaderProps) => {
  return <InfiniteLoaderView {...props} />;
};

InfiniteLoaderComponent.displayName = 'InfiniteLoader';

export const PullToRefresh = memo(PullToRefreshComponent);
export const InfiniteLoader = memo(InfiniteLoaderComponent);
