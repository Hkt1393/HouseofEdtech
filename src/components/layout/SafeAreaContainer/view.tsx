import React, { memo } from 'react';

import { AppView } from '../../base';

import type { SafeAreaContainerViewProps } from './types';

const SafeAreaContainerViewComponent = ({
  children,
  resolvedStyle,
  ...restProps
}: SafeAreaContainerViewProps) => {
  return (
    <AppView style={resolvedStyle} {...restProps}>
      {children}
    </AppView>
  );
};

SafeAreaContainerViewComponent.displayName = 'SafeAreaContainerView';

export const SafeAreaContainerView = memo(SafeAreaContainerViewComponent);
