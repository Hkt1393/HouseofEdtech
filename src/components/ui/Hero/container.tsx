import React, { memo, useMemo } from 'react';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale } from '../../../utils';

import { AppView } from '../../base';

import type {
  HeroActionsProps,
  HeroBackgroundProps,
  HeroBannerProps,
  HeroContentProps,
  HeroGradientOverlayProps,
  HeroIndicatorsProps,
} from './types';
import {
  HeroActionsView,
  HeroBackgroundView,
  HeroBannerView,
  HeroContentView,
  HeroGradientOverlayView,
  HeroIndicatorsView,
} from './view';
import { createDynamicStyles, styles } from './styles';

const dynamicStyles = createDynamicStyles(
  moderateScale(COMPONENT_DEFAULTS.media.heroMinHeight),
  moderateScale(COMPONENT_DEFAULTS.button.iconSize + COMPONENT_DEFAULTS.progress.compactHeight),
  moderateScale(COMPONENT_DEFAULTS.progress.compactHeight * 2),
);

const HeroBackgroundComponent = (props: HeroBackgroundProps) => <HeroBackgroundView {...props} />;

HeroBackgroundComponent.displayName = 'HeroBackground';

const HeroGradientOverlayComponent = (props: HeroGradientOverlayProps) => (
  <HeroGradientOverlayView {...props} />
);

HeroGradientOverlayComponent.displayName = 'HeroGradientOverlay';

const HeroActionsComponent = (props: HeroActionsProps) => <HeroActionsView {...props} />;

HeroActionsComponent.displayName = 'HeroActions';

const HeroContentComponent = (props: HeroContentProps) => <HeroContentView {...props} />;

HeroContentComponent.displayName = 'HeroContent';

const HeroIndicatorsComponent = ({ activeIndex, onSelect, totalCount }: HeroIndicatorsProps) => {
  const renderedIndicators = useMemo(
    () =>
      Array.from({ length: totalCount }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <AppView
            accessibilityLabel={`${index + 1}`}
            accessibilityRole={onSelect ? 'button' : undefined}
            backgroundColorToken="white"
            key={`hero-indicator-${index}`}
            onPress={onSelect ? () => onSelect(index) : undefined}
            opacityValue={isActive ? 1 : 0.5}
            radius="full"
            style={[
              dynamicStyles.indicator,
              isActive ? dynamicStyles.activeIndicator : styles.indicatorInactive,
            ]}
          />
        );
      }),
    [activeIndex, onSelect, totalCount],
  );

  return <HeroIndicatorsView renderedIndicators={renderedIndicators} />;
};

HeroIndicatorsComponent.displayName = 'HeroIndicators';

const HeroBannerComponent = ({
  activeIndicatorIndex = 0,
  footerAccessory,
  onIndicatorSelect,
  onPress,
  primaryActionLabel,
  secondaryActionLabel,
  totalIndicators = 0,
  ...restProps
}: HeroBannerProps) => {
  const isBannerInteractive = useMemo(
    () => Boolean(onPress && !primaryActionLabel && !secondaryActionLabel),
    [onPress, primaryActionLabel, secondaryActionLabel],
  );

  const indicators = useMemo(
    () =>
      totalIndicators > 1 ? (
        <HeroIndicators
          activeIndex={activeIndicatorIndex}
          onSelect={onIndicatorSelect}
          totalCount={totalIndicators}
        />
      ) : (
        footerAccessory
      ),
    [activeIndicatorIndex, footerAccessory, onIndicatorSelect, totalIndicators],
  );

  return (
    <HeroBannerView
      activeIndicatorIndex={activeIndicatorIndex}
      footerAccessory={footerAccessory}
      heroStyle={dynamicStyles.hero}
      indicators={indicators}
      isBannerInteractive={isBannerInteractive}
      onIndicatorSelect={onIndicatorSelect}
      onPress={onPress}
      primaryActionLabel={primaryActionLabel}
      secondaryActionLabel={secondaryActionLabel}
      totalIndicators={totalIndicators}
      {...restProps}
    />
  );
};

HeroBannerComponent.displayName = 'HeroBanner';

export const HeroBackground = memo(HeroBackgroundComponent);
export const HeroGradientOverlay = memo(HeroGradientOverlayComponent);
export const HeroActions = memo(HeroActionsComponent);
export const HeroContent = memo(HeroContentComponent);
export const HeroIndicators = memo(HeroIndicatorsComponent);
export const HeroBanner = memo(HeroBannerComponent);
