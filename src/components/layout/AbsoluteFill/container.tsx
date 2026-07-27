import React, { memo, useMemo } from 'react';

import { styles } from './styles';
import type { AbsoluteFillProps } from './types';
import { AbsoluteFillView } from './view';

const AbsoluteFillComponent = ({ style, ...restProps }: AbsoluteFillProps) => {
  const resolvedStyle = useMemo(() => [styles.root, style], [style]);

  return <AbsoluteFillView resolvedStyle={resolvedStyle} {...restProps} />;
};

AbsoluteFillComponent.displayName = 'AbsoluteFill';

export const AbsoluteFill = memo(AbsoluteFillComponent);
