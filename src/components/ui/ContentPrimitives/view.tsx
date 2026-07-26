import React, { memo } from 'react';

import { APP_STRINGS, COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale } from '../../../utils';
import { AppImage, AppText, AppView } from '../../base';
import { Card, Row, Stack } from '../../layout';

import { resolveToneTokens, type ToneTokenSet } from '../shared';

import type {
  AvatarProps,
  BadgeProps,
  GenreChipProps,
  InfoChipProps,
  LabelValueRowProps,
  PosterProps,
  PrimitiveSize,
  ProgressBarProps,
  RatingProps,
  StatItemProps,
  TagProps,
  ThumbnailProps,
} from './types';
import {
  createPosterStyles,
  createProgressStyles,
  createSquareStyles,
  createThumbnailStyles,
  styles,
} from './styles';

const primaryToneTokens = resolveToneTokens('primary');

const getInitials = (value: string): string => {
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token.charAt(0).toUpperCase())
    .join('');
};

interface RenderAvatarProps extends AvatarProps {
  avatarSizes: Record<PrimitiveSize, number>;
}

const AvatarViewComponent = ({
  accessibilityHint = APP_STRINGS.components.media.avatarAccessibilityHint,
  accessibilityLabel = APP_STRINGS.components.media.avatarAccessibilityLabel,
  accessibilityState,
  avatarSizes,
  fallbackLabel,
  imageUrl,
  onPress,
  size = 'md',
}: RenderAvatarProps) => {
  const resolvedSize = avatarSizes[size];
  const initials = fallbackLabel ? getInitials(fallbackLabel) : '';
  const sizeStyles = createSquareStyles(resolvedSize);

  return (
    <AppView
      accessibilityHint={onPress ? accessibilityHint : undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      accessibilityRole={onPress ? 'button' : 'image'}
      onPress={onPress}
      radius="full"
      style={sizeStyles.root}
    >
      {imageUrl ? (
        <AppImage
          contentFit="cover"
          radius="full"
          source={{ uri: imageUrl }}
          style={sizeStyles.root}
        />
      ) : (
        <AppView
          backgroundColorToken="surfaceSecondary"
          center
          radius="full"
          style={[styles.avatarFallback, sizeStyles.root]}
        >
          <AppText variant={size === 'xs' || size === 'sm' ? 'caption' : 'label'}>
            {initials}
          </AppText>
        </AppView>
      )}
    </AppView>
  );
};

AvatarViewComponent.displayName = 'AvatarView';

const BadgeViewComponent = ({
  label,
  leadingIcon,
  tone = 'neutral',
  variant = 'soft',
  toneTokens,
}: BadgeProps & { toneTokens: ToneTokenSet }) => {
  const backgroundColorToken =
    variant === 'solid'
      ? toneTokens.solidBackground
      : variant === 'outline'
        ? 'transparent'
        : toneTokens.softBackground;
  const borderColorToken =
    variant === 'outline' ? toneTokens.border : 'transparent';
  const textColorToken =
    variant === 'solid' ? toneTokens.solidText : toneTokens.softText;

  return (
    <AppView
      backgroundColorToken={backgroundColorToken}
      borderColorToken={borderColorToken}
      borderWidth={variant === 'outline' ? 1 : 0}
      paddingHorizontal="sm"
      paddingVertical="xs"
      radius="full"
      row
      alignItems="center"
      gap="xs"
    >
      {leadingIcon}
      <AppText colorToken={textColorToken} variant="caption">
        {label}
      </AppText>
    </AppView>
  );
};

BadgeViewComponent.displayName = 'BadgeView';

const ProgressBarViewComponent = ({
  fillWidth,
  heightValue,
  showLabel = false,
  toneTokens,
}: ProgressBarProps & {
  fillWidth: string;
  heightValue: number;
  toneTokens: ToneTokenSet;
}) => {
  const progressStyles = createProgressStyles(heightValue, fillWidth as `${number}%`);

  return (
    <Row alignItems="center" gap="sm">
      <AppView backgroundColorToken="surfaceSecondary" flex radius="full" style={progressStyles.track}>
        <AppView backgroundColorToken={toneTokens.solidBackground} radius="full" style={progressStyles.fill} />
      </AppView>
      {showLabel ? (
        <AppText colorToken="textSecondary" style={styles.progressLabel} variant="caption">
          {fillWidth}
        </AppText>
      ) : null}
    </Row>
  );
};

ProgressBarViewComponent.displayName = 'ProgressBarView';

const PosterViewComponent = ({
  accessibilityHint = APP_STRINGS.components.media.posterAccessibilityHint,
  accessibilityLabel = APP_STRINGS.components.media.posterAccessibilityLabel,
  accessibilityState,
  badgeLabel,
  imageTransitionDuration,
  onPress,
  posterUrl,
  progress,
  showImageLoadingState = true,
  subtitle,
  title,
  width,
}: PosterProps & { width: number }) => {
  const posterStyles = createPosterStyles(width);

  return (
    <Stack gap="sm" style={posterStyles.wrapper}>
      <AppView
        accessibilityHint={onPress ? accessibilityHint : undefined}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityState={accessibilityState}
        onPress={onPress}
        radius="sm"
        style={styles.imageWrapper}
      >
        <AppImage
          accessibilityLabel={onPress ? undefined : accessibilityLabel}
          contentFit="cover"
          radius="sm"
          showLoadingState={showImageLoadingState}
          source={{ uri: posterUrl }}
          style={posterStyles.image}
          transitionDuration={imageTransitionDuration}
        />
        {badgeLabel ? (
          <AppView
            backgroundColorToken="overlay"
            paddingHorizontal="sm"
            paddingVertical="xs"
            radius="full"
            style={posterStyles.badge}
          >
            <AppText colorToken="textInverse" variant="caption">
              {badgeLabel}
            </AppText>
          </AppView>
        ) : null}
      </AppView>
      {title ? (
        <Stack gap="xs">
          <AppText numberOfLines={2} variant="label">
            {title}
          </AppText>
          {subtitle ? (
            <AppText colorToken="textSecondary" numberOfLines={2} variant="caption">
              {subtitle}
            </AppText>
          ) : null}
          {typeof progress === 'number' ? (
            <AppView>
              <ProgressBarViewComponent
                fillWidth={`${progress}%`}
                height="sm"
                heightValue={moderateScale(COMPONENT_DEFAULTS.progress.compactHeight)}
                progress={progress}
                showLabel={false}
                toneTokens={primaryToneTokens}
              />
            </AppView>
          ) : null}
        </Stack>
      ) : null}
    </Stack>
  );
};

PosterViewComponent.displayName = 'PosterView';

const ThumbnailViewComponent = ({
  accessibilityHint = APP_STRINGS.components.media.thumbnailAccessibilityHint,
  accessibilityLabel = APP_STRINGS.components.media.thumbnailAccessibilityLabel,
  accessibilityState,
  durationLabel,
  imageUrl,
  onPress,
  subtitle,
  title,
  width,
}: ThumbnailProps & { width: number }) => {
  const thumbnailStyles = createThumbnailStyles(width);

  return (
    <Stack gap="sm" style={thumbnailStyles.wrapper}>
      <AppView
        accessibilityHint={onPress ? accessibilityHint : undefined}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityState={accessibilityState}
        onPress={onPress}
        radius="sm"
        style={styles.imageWrapper}
      >
        <AppImage
          accessibilityLabel={onPress ? undefined : accessibilityLabel}
          contentFit="cover"
          radius="sm"
          source={{ uri: imageUrl }}
          style={thumbnailStyles.image}
        />
        {durationLabel ? (
          <AppView
            backgroundColorToken="overlay"
            paddingHorizontal="sm"
            paddingVertical="xs"
            radius="full"
            style={thumbnailStyles.badge}
          >
            <AppText colorToken="textInverse" variant="caption">
              {durationLabel}
            </AppText>
          </AppView>
        ) : null}
      </AppView>
      {(title || subtitle) ? (
        <Stack gap="xs">
          {title ? (
            <AppText numberOfLines={2} variant="label">
              {title}
            </AppText>
          ) : null}
          {subtitle ? (
            <AppText colorToken="textSecondary" numberOfLines={2} variant="caption">
              {subtitle}
            </AppText>
          ) : null}
        </Stack>
      ) : null}
    </Stack>
  );
};

ThumbnailViewComponent.displayName = 'ThumbnailView';

const LabelValueRowViewComponent = ({
  accessibilityHint = APP_STRINGS.components.media.labelValueRowAccessibilityHint,
  accessibilityLabel,
  accessibilityState,
  description,
  label,
  onPress,
  trailingAccessory,
  value,
}: LabelValueRowProps) => {
  return (
    <AppView
      accessibilityHint={onPress ? accessibilityHint : undefined}
      accessibilityLabel={accessibilityLabel ?? value}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={accessibilityState}
      onPress={onPress}
      row
      alignItems="center"
      justifyContent="space-between"
      gap="md"
    >
      <Stack gap="xs" flex>
        <AppText colorToken="textSecondary" variant="caption">
          {label}
        </AppText>
        <AppText numberOfLines={2} variant="label">
          {value}
        </AppText>
        {description ? (
          <AppText colorToken="textTertiary" numberOfLines={2} variant="caption">
            {description}
          </AppText>
        ) : null}
      </Stack>
      {trailingAccessory}
    </AppView>
  );
};

LabelValueRowViewComponent.displayName = 'LabelValueRowView';

const StatItemViewComponent = ({ description, label, value }: StatItemProps) => {
  return (
    <Card bordered padding="md" radius="sm" shadow="xs" variant="secondary">
      <Stack gap="xs">
        <AppText colorToken="textTertiary" variant="caption">
          {label}
        </AppText>
        <AppText style={styles.statValue} variant="subtitle">
          {value}
        </AppText>
        {description ? (
          <AppText colorToken="textSecondary" variant="caption">
            {description}
          </AppText>
        ) : null}
      </Stack>
    </Card>
  );
};

StatItemViewComponent.displayName = 'StatItemView';

export {
  AvatarViewComponent,
  BadgeViewComponent,
  LabelValueRowViewComponent,
  PosterViewComponent,
  ProgressBarViewComponent,
  StatItemViewComponent,
  ThumbnailViewComponent,
};
