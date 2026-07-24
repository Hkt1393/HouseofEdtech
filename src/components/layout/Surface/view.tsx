import React, { memo } from 'react';

import { AppView } from '../../base';

import type { SurfaceViewProps } from './types';

const SurfaceViewComponent = ({ children, ...restProps }: SurfaceViewProps) => {
  return <AppView {...restProps}>{children}</AppView>;
};

SurfaceViewComponent.displayName = 'SurfaceView';

export const SurfaceView = memo(SurfaceViewComponent);
