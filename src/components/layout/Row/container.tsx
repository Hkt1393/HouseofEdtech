import React, { memo } from 'react';

import type { RowProps } from './types';
import { RowView } from './view';

const RowComponent = (props: RowProps) => {
  return <RowView alignItems="center" {...props} />;
};

RowComponent.displayName = 'Row';

export const Row = memo(RowComponent);
