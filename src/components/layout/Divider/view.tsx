import React, { memo } from 'react';

import { AppView } from '../../base';

import type { DividerViewProps } from './types';

const DividerViewComponent = ({
  resolvedStyle,
  ...restProps
}: DividerViewProps) => {
  return <AppView style={resolvedStyle} {...restProps} />;
};

DividerViewComponent.displayName = 'DividerView';

export const DividerView = memo(DividerViewComponent);
