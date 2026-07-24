import React, { memo } from 'react';

import { Surface } from '../Surface';

import type { CardViewProps } from './types';

const CardViewComponent = ({ children, ...restProps }: CardViewProps) => {
  return <Surface {...restProps}>{children}</Surface>;
};

CardViewComponent.displayName = 'CardView';

export const CardView = memo(CardViewComponent);
