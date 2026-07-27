import React, { memo } from 'react';

import type { CenterProps } from './types';
import { CenterView } from './view';

const CenterComponent = (props: CenterProps) => {
  return <CenterView {...props} />;
};

CenterComponent.displayName = 'Center';

export const Center = memo(CenterComponent);
