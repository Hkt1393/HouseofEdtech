import React, { forwardRef, memo } from 'react';
import { Text as RNText } from 'react-native';

import type { AppTextViewProps } from './types';

const AppTextViewComponent = forwardRef<
  React.ElementRef<typeof RNText>,
  AppTextViewProps
>(
  ({ children, resolvedStyle, ...restProps }, ref) => {
    return (
      <RNText ref={ref} style={resolvedStyle} {...restProps} allowFontScaling={false}>
        {children}
      </RNText>
    );
  },
);

AppTextViewComponent.displayName = 'AppTextView';

export const AppTextView = memo(AppTextViewComponent);
