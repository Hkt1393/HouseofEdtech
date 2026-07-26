import React, { memo } from 'react';

import { AppImage, AppText, AppVideo, AppView } from '../../base';
import { AbsoluteFill, Card, Row, Stack } from '../../layout';
import { Badge } from '../ContentPrimitives';
import { GhostButton, PrimaryButton } from '../AppButton';

import { styles } from './styles';
import type {
  HeroActionsProps,
  HeroBackgroundProps,
  HeroBannerViewProps,
  HeroContentProps,
  HeroGradientOverlayProps,
  HeroIndicatorsViewProps,
} from './types';

const HeroBackgroundViewComponent = ({
  imageSource,
  imageTransitionDuration,
  videoSource,
}: HeroBackgroundProps) => {
  if (videoSource) {
    return (
      <AppVideo
        autoPlay
        controls={false}
        loop
        muted
        resizeMode="cover"
        showErrorState={false}
        showLoadingState={false}
        source={videoSource}
        style={styles.grow}
      />
    );
  }

  return (
    <AppImage
      contentFit="cover"
      showErrorState={false}
      showLoadingState={false}
      source={imageSource}
      style={styles.grow}
      transitionDuration={imageTransitionDuration}
    />
  );
};

HeroBackgroundViewComponent.displayName = 'HeroBackgroundView';

const HeroGradientOverlayViewComponent = ({
  intensity = 'medium',
}: HeroGradientOverlayProps) => {
  const topOpacity = intensity === 'soft' ? 0.15 : intensity === 'strong' ? 0.35 : 0.2;
  const middleOpacity = intensity === 'soft' ? 0.35 : intensity === 'strong' ? 0.55 : 0.45;
  const bottomOpacity = intensity === 'soft' ? 0.6 : intensity === 'strong' ? 0.88 : 0.72;

  return (
    <AbsoluteFill>
      <AppView backgroundColorToken="overlay" opacityValue={topOpacity} style={styles.overlayTop} />
      <AppView backgroundColorToken="overlay" opacityValue={middleOpacity} style={styles.overlayMiddle} />
      <AppView backgroundColorToken="overlay" opacityValue={bottomOpacity} style={styles.overlayBottom} />
    </AbsoluteFill>
  );
};

HeroGradientOverlayViewComponent.displayName = 'HeroGradientOverlayView';

const HeroActionsViewComponent = ({
  primaryActionIcon,
  primaryActionLabel,
  secondaryActionIcon,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}: HeroActionsProps) => {
  if (!primaryActionLabel && !secondaryActionLabel) {
    return null;
  }

  return (
    <Row gap="sm">
      {primaryActionLabel ? (
        <PrimaryButton icon={primaryActionIcon} label={primaryActionLabel} onPress={onPrimaryAction} />
      ) : null}
      {secondaryActionLabel ? (
        <GhostButton icon={secondaryActionIcon} label={secondaryActionLabel} onPress={onSecondaryAction} />
      ) : null}
    </Row>
  );
};

HeroActionsViewComponent.displayName = 'HeroActionsView';

const HeroContentViewComponent = ({
  actions,
  badgeLabel,
  description,
  footerAccessory,
  metadata,
  subtitle,
  title,
}: HeroContentProps) => {
  return (
    <Card bordered={false} gap="md" padding="lg" style={styles.content} variant="overlay">
      <Stack gap="md">
        {badgeLabel ? <Badge label={badgeLabel} tone="primary" /> : null}
        <Stack gap="xs">
          <AppText colorToken="textInverse" variant="heading">
            {title}
          </AppText>
          {subtitle ? (
            <AppText colorToken="textInverse" variant="subtitle">
              {subtitle}
            </AppText>
          ) : null}
          {description ? <AppText colorToken="textInverse">{description}</AppText> : null}
        </Stack>
        {metadata}
      </Stack>
      <Stack gap="md">
        {actions}
        {footerAccessory}
      </Stack>
    </Card>
  );
};

HeroContentViewComponent.displayName = 'HeroContentView';

const HeroIndicatorsViewComponent = ({ renderedIndicators }: HeroIndicatorsViewProps) => {
  return (
    <Row alignItems="center" gap="xs" justifyContent="center" style={styles.indicatorRow}>
      {renderedIndicators}
    </Row>
  );
};

HeroIndicatorsViewComponent.displayName = 'HeroIndicatorsView';

const HeroBannerViewComponent = ({
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  activeIndicatorIndex = 0,
  badgeLabel,
  backgroundImageSource,
  backgroundImageTransitionDuration,
  backgroundVideoSource,
  description,
  footerAccessory,
  heroStyle,
  indicators,
  intensity = 'medium',
  isBannerInteractive,
  metadata,
  onPress,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionIcon,
  primaryActionLabel,
  secondaryActionIcon,
  secondaryActionLabel,
  subtitle,
  title,
}: HeroBannerViewProps) => {
  return (
    <AppView
      accessibilityHint={isBannerInteractive ? accessibilityHint : undefined}
      accessibilityLabel={isBannerInteractive ? accessibilityLabel ?? title : undefined}
      accessibilityRole={isBannerInteractive ? 'button' : undefined}
      accessibilityState={isBannerInteractive ? accessibilityState : undefined}
      onPress={isBannerInteractive ? onPress : undefined}
      radius="md"
      style={[styles.hero, heroStyle]}
    >
      <HeroBackgroundViewComponent
        imageSource={backgroundImageSource}
        imageTransitionDuration={backgroundImageTransitionDuration}
        videoSource={backgroundVideoSource}
      />
      <HeroGradientOverlayViewComponent intensity={intensity} />
      <AbsoluteFill>
        <HeroContentViewComponent
          actions={
            <HeroActionsViewComponent
              primaryActionIcon={primaryActionIcon}
              primaryActionLabel={primaryActionLabel}
              secondaryActionIcon={secondaryActionIcon}
              secondaryActionLabel={secondaryActionLabel}
              onPrimaryAction={onPrimaryAction ?? onPress}
              onSecondaryAction={onSecondaryAction}
            />
          }
          badgeLabel={badgeLabel}
          description={description}
          footerAccessory={
            indicators ?? footerAccessory
          }
          metadata={metadata}
          subtitle={subtitle}
          title={title}
        />
      </AbsoluteFill>
    </AppView>
  );
};

HeroBannerViewComponent.displayName = 'HeroBannerView';

export const HeroBackgroundView = memo(HeroBackgroundViewComponent);
export const HeroGradientOverlayView = memo(HeroGradientOverlayViewComponent);
export const HeroActionsView = memo(HeroActionsViewComponent);
export const HeroContentView = memo(HeroContentViewComponent);
export const HeroIndicatorsView = memo(HeroIndicatorsViewComponent);
export const HeroBannerView = memo(HeroBannerViewComponent);
