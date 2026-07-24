import React, { memo } from 'react';

import { AppView } from '../../base';

import type { SpacerViewProps } from './types';

const SpacerViewComponent = ({
  resolvedStyle,
  ...restProps
}: SpacerViewProps) => {
  return <AppView style={resolvedStyle} {...restProps} />;
};

SpacerViewComponent.displayName = 'SpacerView';

export const SpacerView = memo(SpacerViewComponent);
