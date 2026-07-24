import React, { memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { APP_STRINGS } from '../../../constants';
import { AppImage, AppText, AppView } from '../../base';
import { AbsoluteFill, Card, Row, Stack } from '../../layout';
import {
  Avatar,
  Badge,
  LabelValueRow,
  Poster,
  ProgressBar,
  Thumbnail,
} from '../ContentPrimitives';
import { GhostButton, PrimaryButton } from '../AppButton';

import { BaseMediaRow } from './BaseMediaRow';
import type {
  CategoryCardProps,
  ContinueWatchingCardProps,
  DownloadCardProps,
  EpisodeCardProps,
  HeroCardProps,
  MovieCardProps,
  ProfileCardProps,
  SearchCardProps,
  SettingsCardProps,
} from './types';

const MovieCardViewComponent = ({
  accessibilityHint = APP_STRINGS.components.cards.movieAccessibilityHint,
  accessibilityLabel,
  accessibilityState,
  badgeLabel,
  metadataLabel,
  onPress,
  posterUrl,
  progress,
  subtitle,
  title,
}: MovieCardProps) => {
  return (
    <Poster
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={accessibilityState}
      badgeLabel={badgeLabel}
      onPress={onPress}
      posterUrl={posterUrl}
      progress={progress}
      subtitle={subtitle ?? metadataLabel}
      title={title}
    />
  );
};

MovieCardViewComponent.displayName = 'MovieCardView';

const HeroCardViewComponent = ({
  accessibilityHint = APP_STRINGS.components.cards.heroAccessibilityHint,
  accessibilityLabel,
  accessibilityState,
  badgeLabel,
  description,
  imageUrl,
  onPress,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionLabel,
  secondaryActionLabel,
  subtitle,
  title,
  heroStyle,
}: HeroCardProps & { heroStyle: StyleProp<ViewStyle> }) => {
  const resolvedPrimaryActionHandler = onPrimaryAction ?? onPress;
  const hasActionButtons = Boolean(primaryActionLabel || secondaryActionLabel);
  const isCardInteractive = Boolean(onPress && !hasActionButtons);

  return (
    <AppView
      accessibilityHint={isCardInteractive ? accessibilityHint : undefined}
      accessibilityLabel={isCardInteractive ? accessibilityLabel ?? title : undefined}
      accessibilityRole={isCardInteractive ? 'button' : undefined}
      accessibilityState={isCardInteractive ? accessibilityState : undefined}
      onPress={isCardInteractive ? onPress : undefined}
      radius="md"
      style={heroStyle}
    >
      <AppImage
        contentFit="cover"
        radius="md"
        source={{ uri: imageUrl }}
        style={heroStyle}
      />
      <AbsoluteFill backgroundColorToken="overlay" radius="md" />
      <Card bordered={false} gap="md" padding="lg" style={heroStyle} variant="overlay">
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
        {(primaryActionLabel || secondaryActionLabel) ? (
          <Row gap="sm">
            {primaryActionLabel ? (
              <PrimaryButton label={primaryActionLabel} onPress={resolvedPrimaryActionHandler} />
            ) : null}
            {secondaryActionLabel ? (
              <GhostButton label={secondaryActionLabel} onPress={onSecondaryAction} />
            ) : null}
          </Row>
        ) : null}
      </Card>
    </AppView>
  );
};

HeroCardViewComponent.displayName = 'HeroCardView';

const EpisodeCardViewComponent = ({
  accessibilityHint = APP_STRINGS.components.cards.episodeAccessibilityHint,
  accessibilityLabel,
  accessibilityState,
  description,
  eyebrow,
  imageUrl,
  onPress,
  title,
  trailingAccessory,
}: EpisodeCardProps) => {
  return (
    <BaseMediaRow
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={accessibilityState}
      content={
        <Stack gap="xs">
          {eyebrow ? (
            <AppText colorToken="textTertiary" variant="caption">
              {eyebrow}
            </AppText>
          ) : null}
          <AppText variant="label">{title}</AppText>
          {description ? (
            <AppText colorToken="textSecondary" numberOfLines={3} variant="caption">
              {description}
            </AppText>
          ) : null}
        </Stack>
      }
      media={<Thumbnail imageUrl={imageUrl} />}
      onPress={onPress}
      trailingAccessory={trailingAccessory}
    />
  );
};

EpisodeCardViewComponent.displayName = 'EpisodeCardView';

const ContinueWatchingCardViewComponent = ({
  accessibilityHint = APP_STRINGS.components.cards.movieAccessibilityHint,
  accessibilityLabel,
  accessibilityState,
  imageUrl,
  onPress,
  progress,
  remainingLabel,
  title,
}: ContinueWatchingCardProps) => {
  return (
    <Card
      accessibilityHint={onPress ? accessibilityHint : undefined}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={accessibilityState}
      bordered={false}
      gap="md"
      onPress={onPress}
      padding="md"
    >
      <Stack gap="md">
        <Thumbnail imageUrl={imageUrl} title={title} />
        <ProgressBar progress={progress} showLabel />
        {remainingLabel ? (
          <AppText colorToken="textSecondary" variant="caption">
            {remainingLabel}
          </AppText>
        ) : null}
      </Stack>
    </Card>
  );
};

ContinueWatchingCardViewComponent.displayName = 'ContinueWatchingCardView';

const DownloadCardViewComponent = ({
  accessibilityHint = APP_STRINGS.components.cards.downloadAccessibilityHint,
  accessibilityLabel,
  accessibilityState,
  onPress,
  posterUrl,
  progress,
  qualityLabel,
  statusLabel,
  title,
}: DownloadCardProps) => {
  return (
    <BaseMediaRow
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={accessibilityState}
      content={
        <Stack gap="xs">
          <AppText variant="label">{title}</AppText>
          <Badge label={statusLabel} tone="info" />
          {qualityLabel ? (
            <Badge label={qualityLabel} tone="neutral" variant="outline" />
          ) : null}
          {typeof progress === 'number' ? <ProgressBar progress={progress} showLabel /> : null}
        </Stack>
      }
      media={<Poster posterUrl={posterUrl} />}
      onPress={onPress}
    />
  );
};

DownloadCardViewComponent.displayName = 'DownloadCardView';

const ProfileCardViewComponent = ({
  accessibilityHint = APP_STRINGS.components.cards.profileAccessibilityHint,
  accessibilityLabel,
  accessibilityState,
  avatarLabel,
  avatarUrl,
  name,
  onPress,
  planLabel,
  subtitle,
}: ProfileCardProps) => {
  return (
    <BaseMediaRow
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel ?? name}
      accessibilityState={accessibilityState}
      content={
        <Stack gap="xs">
          {planLabel ? <Badge label={planLabel} tone="primary" /> : null}
          <AppText variant="label">{name}</AppText>
          <AppText colorToken="textSecondary">{subtitle}</AppText>
        </Stack>
      }
      media={<Avatar fallbackLabel={avatarLabel ?? name} imageUrl={avatarUrl} size="lg" />}
      onPress={onPress}
    />
  );
};

ProfileCardViewComponent.displayName = 'ProfileCardView';

const SettingsCardViewComponent = ({
  accessibilityHint = APP_STRINGS.components.cards.settingsAccessibilityHint,
  accessibilityLabel,
  accessibilityState,
  description,
  onPress,
  title,
  trailingAccessory,
  value = '',
}: SettingsCardProps) => {
  return (
    <Card
      accessibilityHint={onPress ? accessibilityHint : undefined}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={accessibilityState}
      bordered={false}
      gap="md"
      onPress={onPress}
      padding="md"
    >
      <LabelValueRow
        description={description}
        label={title}
        trailingAccessory={trailingAccessory}
        value={value}
      />
    </Card>
  );
};

SettingsCardViewComponent.displayName = 'SettingsCardView';

const SearchCardViewComponent = ({
  accessibilityHint = APP_STRINGS.components.cards.searchAccessibilityHint,
  accessibilityLabel,
  accessibilityState,
  imageUrl,
  metadataLabel,
  onPress,
  subtitle,
  title,
}: SearchCardProps) => {
  return (
    <BaseMediaRow
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={accessibilityState}
      content={
        <Stack gap="xs">
          <AppText variant="label">{title}</AppText>
          {subtitle ? <AppText colorToken="textSecondary">{subtitle}</AppText> : null}
          {metadataLabel ? (
            <AppText colorToken="textTertiary" variant="caption">
              {metadataLabel}
            </AppText>
          ) : null}
        </Stack>
      }
      media={<Poster posterUrl={imageUrl} />}
      onPress={onPress}
    />
  );
};

SearchCardViewComponent.displayName = 'SearchCardView';

const CategoryCardViewComponent = ({
  accessibilityHint = APP_STRINGS.components.cards.categoryAccessibilityHint,
  accessibilityLabel,
  accessibilityState,
  countLabel,
  description,
  imageUrl,
  onPress,
  title,
}: CategoryCardProps) => {
  return (
    <Card
      accessibilityHint={onPress ? accessibilityHint : undefined}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={accessibilityState}
      bordered={false}
      gap="md"
      onPress={onPress}
      padding="md"
      variant="secondary"
    >
      {imageUrl ? <Thumbnail imageUrl={imageUrl} /> : null}
      <Stack gap="xs">
        {countLabel ? <Badge label={countLabel} tone="secondary" variant="outline" /> : null}
        <AppText variant="title">{title}</AppText>
        {description ? <AppText colorToken="textSecondary">{description}</AppText> : null}
      </Stack>
    </Card>
  );
};

CategoryCardViewComponent.displayName = 'CategoryCardView';

export const MovieCardView = memo(MovieCardViewComponent);
export const HeroCardView = memo(HeroCardViewComponent);
export const EpisodeCardView = memo(EpisodeCardViewComponent);
export const ContinueWatchingCardView = memo(ContinueWatchingCardViewComponent);
export const DownloadCardView = memo(DownloadCardViewComponent);
export const ProfileCardView = memo(ProfileCardViewComponent);
export const SettingsCardView = memo(SettingsCardViewComponent);
export const SearchCardView = memo(SearchCardViewComponent);
export const CategoryCardView = memo(CategoryCardViewComponent);
