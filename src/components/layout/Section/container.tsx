import React, { memo, useMemo } from 'react';

import type { SectionProps } from './types';
import { SectionView } from './view';

const SectionComponent = ({ gap = 'lg', style, ...restProps }: SectionProps) => {
  const resolvedHeaderStyle = useMemo(() => [{ width: '100%' as const }], []);
  const resolvedSectionStyle = useMemo(
    () => [{ width: '100%' as const }, style],
    [style],
  );

  return (
    <SectionView
      gap={gap}
      resolvedHeaderStyle={resolvedHeaderStyle}
      resolvedStyle={resolvedSectionStyle}
      {...restProps}
    />
  );
};

SectionComponent.displayName = 'Section';

export const Section = memo(SectionComponent);
