import React, { memo } from 'react';

import { AppView } from '../../base';

import type { ContainerViewProps } from './types';

const ContainerViewComponent = ({
  children,
  resolvedStyle,
  ...restProps
}: ContainerViewProps) => {
  return (
    <AppView style={resolvedStyle} {...restProps}>
      {children}
    </AppView>
  );
};

ContainerViewComponent.displayName = 'ContainerView';

export const ContainerView = memo(ContainerViewComponent);
