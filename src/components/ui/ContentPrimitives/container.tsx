import React, { memo, useMemo } from 'react';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { useTheme } from '../../../theme';
import { moderateScale } from '../../../utils';

import { AppText } from '../../base';
import { Row } from '../../layout';

import { AppIcon, clampPercentage, resolveToneTokens } from '../shared';

import {
  AvatarViewComponent,
  BadgeViewComponent,
  LabelValueRowViewComponent,
  PosterViewComponent,
  ProgressBarViewComponent,
  StatItemViewComponent,
  ThumbnailViewComponent,
} from './view';
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

const avatarSizeMap: Record<PrimitiveSize, number> = {
  xs: moderateScale(COMPONENT_DEFAULTS.media.avatarSizeXs),
  sm: moderateScale(COMPONENT_DEFAULTS.media.avatarSizeSm),
  md: moderateScale(COMPONENT_DEFAULTS.media.avatarSizeMd),
  lg: moderateScale(COMPONENT_DEFAULTS.media.avatarSizeLg),
  xl: moderateScale(COMPONENT_DEFAULTS.media.avatarSizeXl),
};

const posterWidth = moderateScale(COMPONENT_DEFAULTS.media.posterWidth);
const thumbnailWidth = moderateScale(COMPONENT_DEFAULTS.media.thumbnailWidth);

const progressHeightMap = {
  sm: moderateScale(COMPONENT_DEFAULTS.progress.compactHeight),
  md: moderateScale(COMPONENT_DEFAULTS.progress.defaultHeight),
  lg: moderateScale(COMPONENT_DEFAULTS.progress.largeHeight),
} as const;

const AvatarComponent = (props: AvatarProps) => {
  return <AvatarViewComponent avatarSizes={avatarSizeMap} {...props} />;
};

AvatarComponent.displayName = 'Avatar';

const BadgeComponent = ({ tone = 'neutral', ...restProps }: BadgeProps) => {
  const toneTokens = useMemo(() => resolveToneTokens(tone), [tone]);

  return <BadgeViewComponent tone={tone} toneTokens={toneTokens} {...restProps} />;
};

BadgeComponent.displayName = 'Badge';

const TagComponent = ({ variant = 'outline', ...restProps }: TagProps) => {
  return <BadgeComponent variant={variant} {...restProps} />;
};

TagComponent.displayName = 'Tag';

const GenreChipComponent = ({ genre }: GenreChipProps) => {
  return <TagComponent label={genre} tone="primary" variant="outline" />;
};

GenreChipComponent.displayName = 'GenreChip';

const RatingComponent = ({
  caption,
  maxValue,
  showIcon = true,
  tone = 'warning',
  value,
}: RatingProps) => {
  const { colors } = useTheme();
  const toneTokens = useMemo(() => resolveToneTokens(tone), [tone]);
  const valueLabel =
    typeof value === 'number' && typeof maxValue === 'number'
      ? `${value}/${maxValue}`
      : `${value}`;

  return (
    <BadgeViewComponent
      label={caption ? `${valueLabel} ${caption}` : valueLabel}
      leadingIcon={
        showIcon ? (
          <AppIcon
            color={colors[toneTokens.solidText]}
            name="star"
            size={moderateScale(14)}
          />
        ) : undefined
      }
      tone={tone}
      toneTokens={toneTokens}
      variant="solid"
    />
  );
};

RatingComponent.displayName = 'Rating';

const ProgressBarComponent = ({
  height = 'md',
  progress,
  showLabel = false,
  tone = 'primary',
}: ProgressBarProps) => {
  const toneTokens = useMemo(() => resolveToneTokens(tone), [tone]);
  const resolvedProgress = clampPercentage(progress);

  return (
    <ProgressBarViewComponent
      fillWidth={`${resolvedProgress}%`}
      height={height}
      heightValue={progressHeightMap[height]}
      progress={resolvedProgress}
      showLabel={showLabel}
      tone={tone}
      toneTokens={toneTokens}
    />
  );
};

ProgressBarComponent.displayName = 'ProgressBar';

const PosterComponent = (props: PosterProps) => {
  return <PosterViewComponent width={props.width ?? posterWidth} {...props} />;
};

PosterComponent.displayName = 'Poster';

const ThumbnailComponent = (props: ThumbnailProps) => {
  return <ThumbnailViewComponent width={props.width ?? thumbnailWidth} {...props} />;
};

ThumbnailComponent.displayName = 'Thumbnail';

const LabelValueRowComponent = (props: LabelValueRowProps) => {
  return <LabelValueRowViewComponent {...props} />;
};

LabelValueRowComponent.displayName = 'LabelValueRow';

const InfoChipComponent = ({ icon, label, tone = 'info' }: InfoChipProps) => {
  return <BadgeComponent label={label} leadingIcon={icon} tone={tone} />;
};

InfoChipComponent.displayName = 'InfoChip';

const StatItemComponent = (props: StatItemProps) => {
  return <StatItemViewComponent {...props} />;
};

StatItemComponent.displayName = 'StatItem';

export const Avatar = memo(AvatarComponent);
export const Badge = memo(BadgeComponent);
export const Tag = memo(TagComponent);
export const GenreChip = memo(GenreChipComponent);
export const Rating = memo(RatingComponent);
export const ProgressBar = memo(ProgressBarComponent);
export const Poster = memo(PosterComponent);
export const Thumbnail = memo(ThumbnailComponent);
export const LabelValueRow = memo(LabelValueRowComponent);
export const InfoChip = memo(InfoChipComponent);
export const StatItem = memo(StatItemComponent);
