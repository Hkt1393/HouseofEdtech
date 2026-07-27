import React, { memo } from 'react';

import type { ColumnProps } from './types';
import { ColumnView } from './view';

const ColumnComponent = (props: ColumnProps) => {
  return <ColumnView {...props} />;
};

ColumnComponent.displayName = 'Column';

export const Column = memo(ColumnComponent);
