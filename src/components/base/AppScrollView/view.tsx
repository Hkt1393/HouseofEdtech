import React, { forwardRef, memo } from 'react';
import { ScrollView } from 'react-native';

import type { AppScrollViewViewProps } from './types';

const AppScrollViewViewComponent = forwardRef<ScrollView, AppScrollViewViewProps>(
  (
    {
      resolvedContentContainerStyle,
      resolvedRefreshControl,
      resolvedStyle,
      ...restProps
    },
    ref,
  ) => {
    return (
      <ScrollView
        {...restProps}
        contentContainerStyle={resolvedContentContainerStyle}
        refreshControl={resolvedRefreshControl}
        ref={ref}
        style={resolvedStyle}
      />
    );
  },
);

AppScrollViewViewComponent.displayName = 'AppScrollViewView';

export const AppScrollViewView = memo(AppScrollViewViewComponent);
