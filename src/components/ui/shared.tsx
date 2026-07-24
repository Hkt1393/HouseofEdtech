/**
 * Shared UI helpers for icons, tones, and common visual utilities.
 */

import React, { memo } from 'react';
import type { AccessibilityState } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

import type { ThemeColorToken } from '../base/shared';

export type SemanticTone =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'inverse';

export type IconName =
  | 'arrow-left'
  | 'search'
  | 'close'
  | 'chevron-right'
  | 'play'
  | 'star'
  | 'download'
  | 'check'
  | 'alert'
  | 'info'
  | 'plus'
  | 'user'
  | 'refresh'
  | 'clock'
  | 'settings';

export interface ToneTokenSet {
  border: ThemeColorToken;
  softBackground: ThemeColorToken;
  softText: ThemeColorToken;
  solidBackground: ThemeColorToken;
  solidText: ThemeColorToken;
}

export interface AppIconProps {
  color: string;
  name: IconName;
  size: number;
  strokeWidth?: number;
}

export interface InteractiveAccessibilityProps {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
}

/**
 * Resolves consistent semantic token sets for buttons, badges, and feedback UI.
 */
export const resolveToneTokens = (tone: SemanticTone): ToneTokenSet => {
  switch (tone) {
    case 'secondary':
      return {
        border: 'secondary',
        softBackground: 'secondaryContainer',
        softText: 'onSecondaryContainer',
        solidBackground: 'secondary',
        solidText: 'onSecondary',
      };
    case 'success':
      return {
        border: 'success',
        softBackground: 'successContainer',
        softText: 'onSuccess',
        solidBackground: 'success',
        solidText: 'onSuccess',
      };
    case 'warning':
      return {
        border: 'warning',
        softBackground: 'warningContainer',
        softText: 'onWarning',
        solidBackground: 'warning',
        solidText: 'onWarning',
      };
    case 'error':
      return {
        border: 'error',
        softBackground: 'errorContainer',
        softText: 'onError',
        solidBackground: 'error',
        solidText: 'onError',
      };
    case 'info':
      return {
        border: 'info',
        softBackground: 'infoContainer',
        softText: 'onInfo',
        solidBackground: 'info',
        solidText: 'onInfo',
      };
    case 'inverse':
      return {
        border: 'inverseSurface',
        softBackground: 'inverseSurface',
        softText: 'textInverse',
        solidBackground: 'inverseSurface',
        solidText: 'textInverse',
      };
    case 'neutral':
      return {
        border: 'divider',
        softBackground: 'surfaceSecondary',
        softText: 'textSecondary',
        solidBackground: 'surfaceHighest',
        solidText: 'textPrimary',
      };
    case 'primary':
    default:
      return {
        border: 'primary',
        softBackground: 'primaryContainer',
        softText: 'onPrimaryContainer',
        solidBackground: 'primary',
        solidText: 'onPrimary',
      };
  }
};

/**
 * Clamps percentage-like values to the 0-100 range.
 */
export const clampPercentage = (value: number): number => {
  return Math.min(100, Math.max(0, value));
};

const AppIconComponent = ({
  color,
  name,
  size,
  strokeWidth = 1.75,
}: AppIconProps) => {
  switch (name) {
    case 'arrow-left':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="m14.5 5-7 7 7 7"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'search':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Circle cx="11" cy="11" r="6.5" stroke={color} strokeWidth={strokeWidth} />
          <Line
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x1="16.2"
            x2="20"
            y1="16.2"
            y2="20"
          />
        </Svg>
      );
    case 'close':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Line
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x1="6"
            x2="18"
            y1="6"
            y2="18"
          />
          <Line
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x1="18"
            x2="6"
            y1="6"
            y2="18"
          />
        </Svg>
      );
    case 'chevron-right':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="m9 5 7 7-7 7"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'play':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="M8 6.75v10.5a.75.75 0 0 0 1.15.64l8-5.25a.75.75 0 0 0 0-1.28l-8-5.25A.75.75 0 0 0 8 6.75Z"
            fill={color}
          />
        </Svg>
      );
    case 'star':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="m12 4 2.6 5.27 5.82.84-4.21 4.1.99 5.79L12 17.27 6.8 20l.99-5.79-4.21-4.1 5.82-.84Z"
            fill={color}
          />
        </Svg>
      );
    case 'download':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path d="M12 4v10" stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
          <Path
            d="m8.5 11.5 3.5 3.5 3.5-3.5"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
          <Rect
            height="2.5"
            rx="1.25"
            stroke={color}
            strokeWidth={strokeWidth}
            width="13"
            x="5.5"
            y="17.5"
          />
        </Svg>
      );
    case 'check':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="m6.5 12.5 3.5 3.5 7.5-8"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'alert':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="M12 4 21 20H3L12 4Z"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
          <Line
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x1="12"
            x2="12"
            y1="9"
            y2="13"
          />
          <Circle cx="12" cy="16.5" fill={color} r="1" />
        </Svg>
      );
    case 'info':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Circle cx="12" cy="12" r="8.25" stroke={color} strokeWidth={strokeWidth} />
          <Line
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x1="12"
            x2="12"
            y1="11"
            y2="16"
          />
          <Circle cx="12" cy="8" fill={color} r="1" />
        </Svg>
      );
    case 'plus':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Line
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x1="12"
            x2="12"
            y1="5"
            y2="19"
          />
          <Line
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x1="5"
            x2="19"
            y1="12"
            y2="12"
          />
        </Svg>
      );
    case 'user':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Circle cx="12" cy="8" r="3.25" stroke={color} strokeWidth={strokeWidth} />
          <Path
            d="M5 19a7 7 0 0 1 14 0"
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'refresh':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Path
            d="M18.5 8.5A7 7 0 1 0 19 13"
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
          <Path
            d="M15.5 4.5h3v3"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'clock':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Circle cx="12" cy="12" r="8.25" stroke={color} strokeWidth={strokeWidth} />
          <Path
            d="M12 7.5v5l3 2"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    case 'settings':
      return (
        <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
          <Circle cx="12" cy="12" r="2.5" stroke={color} strokeWidth={strokeWidth} />
          <Path
            d="M19 12a7 7 0 0 0-.06-.9l1.8-1.4-1.8-3.1-2.18.87a7.1 7.1 0 0 0-1.56-.9L14.9 4h-3.8l-.32 2.56a7.1 7.1 0 0 0-1.56.9L7.04 6.6l-1.8 3.1 1.8 1.4a7 7 0 0 0 0 1.8l-1.8 1.4 1.8 3.1 2.18-.87c.48.38 1 .68 1.56.9L11.1 20h3.8l.32-2.56c.56-.22 1.08-.52 1.56-.9l2.18.87 1.8-3.1-1.8-1.4c.04-.3.06-.6.06-.9Z"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </Svg>
      );
    default:
      return null;
  }
};

AppIconComponent.displayName = 'AppIcon';

export const AppIcon = memo(AppIconComponent);
