import React, { memo } from 'react';

import { AppView } from '../../base';

import type { RowViewProps } from './types';

const RowViewComponent = ({ children, ...restProps }: RowViewProps) => {
  return (
    <AppView row {...restProps}>
      {children}
    </AppView>
  );
};

RowViewComponent.displayName = 'RowView';

export const RowView = memo(RowViewComponent);
