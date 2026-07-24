import React, { memo } from 'react';

import type { BaseMediaRowProps } from './types';
import { BaseMediaRowView } from './view';

const BaseMediaRowComponent = (props: BaseMediaRowProps) => {
  return <BaseMediaRowView {...props} />;
};

BaseMediaRowComponent.displayName = 'BaseMediaRow';

export const BaseMediaRow = memo(BaseMediaRowComponent);
