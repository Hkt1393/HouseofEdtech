import React, { memo } from 'react';

import type { StackProps } from './types';
import { StackView } from './view';

const StackComponent = (props: StackProps) => {
  return <StackView {...props} />;
};

StackComponent.displayName = 'Stack';

export const Stack = memo(StackComponent);
