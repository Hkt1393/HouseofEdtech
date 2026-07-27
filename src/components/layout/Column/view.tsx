import React, { memo } from 'react';

import { AppView } from '../../base';

import type { ColumnViewProps } from './types';

const ColumnViewComponent = ({ children, ...restProps }: ColumnViewProps) => {
  return (
    <AppView column {...restProps}>
      {children}
    </AppView>
  );
};

ColumnViewComponent.displayName = 'ColumnView';

export const ColumnView = memo(ColumnViewComponent);
