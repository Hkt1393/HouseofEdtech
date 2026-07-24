import React, { memo } from 'react';

import type { CardProps } from './types';
import { CardView } from './view';

const CardComponent = ({
  bordered = false,
  padding = 'lg',
  radius = 'md',
  shadow = 'md',
  variant = 'elevated',
  ...restProps
}: CardProps) => {
  return (
    <CardView
      bordered={bordered}
      padding={padding}
      radius={radius}
      shadow={shadow}
      variant={variant}
      {...restProps}
    />
  );
};

CardComponent.displayName = 'Card';

export const Card = memo(CardComponent);
