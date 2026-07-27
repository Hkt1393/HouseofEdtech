/**
 * Public props for hero feature components.
 */

import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { AppImageSource } from '../../base/AppImage';
import type { AppVideoProps } from '../../base/AppVideo';
import type { InteractiveAccessibilityProps } from '../shared';

export interface HeroBackgroundProps {
  imageSource?: AppImageSource;
  imageTransitionDuration?: number;
  videoSource?: AppVideoProps['source'];
}

export interface HeroGradientOverlayProps {
  intensity?: 'soft' | 'medium' | 'strong';
}

export interface HeroActionsProps extends InteractiveAccessibilityProps {
  primaryActionIcon?: ReactNode;
  primaryActionLabel?: string;
  secondaryActionIcon?: ReactNode;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export interface HeroContentProps {
  actions?: ReactNode;
  badgeLabel?: string;
  description?: string;
  footerAccessory?: ReactNode;
  metadata?: ReactNode;
  subtitle?: string;
  title: string;
}

export interface HeroIndicatorsProps {
  activeIndex: number;
  onSelect?: (index: number) => void;
  totalCount: number;
}

export interface HeroBannerProps extends InteractiveAccessibilityProps {
  activeIndicatorIndex?: number;
  badgeLabel?: string;
  backgroundImageSource?: AppImageSource;
  backgroundImageTransitionDuration?: number;
  backgroundVideoSource?: AppVideoProps['source'];
  description?: string;
  footerAccessory?: ReactNode;
  intensity?: HeroGradientOverlayProps['intensity'];
  metadata?: ReactNode;
  onIndicatorSelect?: (index: number) => void;
  onPress?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryActionIcon?: ReactNode;
  primaryActionLabel?: string;
  secondaryActionIcon?: ReactNode;
  secondaryActionLabel?: string;
  subtitle?: string;
  title: string;
  totalIndicators?: number;
}

export interface HeroIndicatorsViewProps {
  renderedIndicators: ReactNode[];
}

export interface HeroBannerViewProps extends HeroBannerProps {
  heroStyle: StyleProp<ViewStyle>;
  indicators?: ReactNode;
  isBannerInteractive: boolean;
}
