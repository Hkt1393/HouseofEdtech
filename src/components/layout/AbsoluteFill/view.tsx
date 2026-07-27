import React, { memo } from 'react';

import { AppView } from '../../base';

import type { AbsoluteFillViewProps } from './types';

const AbsoluteFillViewComponent = ({
  children,
  resolvedStyle,
  ...restProps
}: AbsoluteFillViewProps) => {
  return (
    <AppView style={resolvedStyle} {...restProps}>
      {children}
    </AppView>
  );
};

AbsoluteFillViewComponent.displayName = 'AbsoluteFillView';

export const AbsoluteFillView = memo(AbsoluteFillViewComponent);
