import React, { memo } from 'react';

import { AppView } from '../../base';

import type { CenterViewProps } from './types';

const CenterViewComponent = ({ children, ...restProps }: CenterViewProps) => {
  return (
    <AppView center {...restProps}>
      {children}
    </AppView>
  );
};

CenterViewComponent.displayName = 'CenterView';

export const CenterView = memo(CenterViewComponent);
