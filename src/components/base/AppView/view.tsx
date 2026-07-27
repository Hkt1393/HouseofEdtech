import React, { forwardRef, memo } from 'react';
import { Pressable, View } from 'react-native';

import type { AppViewViewProps } from './types';

const AppViewViewComponent = forwardRef<View, AppViewViewProps>(
  (
    {
      androidRippleColor,
      children,
      disabled = false,
      hitSlop,
      isInteractive,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      pressRetentionOffset,
      pressedStyle,
      resolvedStyle,
      ...restProps
    },
    ref,
  ) => {
    if (isInteractive) {
      return (
        <Pressable
          {...restProps}
          android_ripple={
            androidRippleColor
              ? {
                  color: androidRippleColor,
                }
              : undefined
          }
          disabled={disabled}
          hitSlop={hitSlop}
          onLongPress={onLongPress}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          pressRetentionOffset={pressRetentionOffset}
          ref={ref}
          style={({ pressed }) => [
            resolvedStyle,
            pressed && !disabled ? pressedStyle : null,
          ]}
        >
          {children}
        </Pressable>
      );
    }

    return (
      <View ref={ref} style={resolvedStyle} {...restProps}>
        {children}
      </View>
    );
  },
);

AppViewViewComponent.displayName = 'AppViewView';

export const AppViewView = memo(AppViewViewComponent);
