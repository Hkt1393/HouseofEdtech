import React, { memo } from 'react';

import { AppView } from '../../base';

import type { StackViewProps } from './types';

const StackViewComponent = ({
  children,
  gap = 'md',
  ...restProps
}: StackViewProps) => {
  return (
    <AppView column gap={gap} {...restProps}>
      {children}
    </AppView>
  );
};

StackViewComponent.displayName = 'StackView';

export const StackView = memo(StackViewComponent);
