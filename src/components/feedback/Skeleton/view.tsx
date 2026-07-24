import React, { memo } from 'react';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale } from '../../../utils';
import { Card, Row, Stack } from '../../layout';

import { SkeletonBlock } from '../shared';

import { createBannerStyles, styles } from './styles';

const bannerStyles = createBannerStyles(
  moderateScale(COMPONENT_DEFAULTS.media.heroMinHeight),
);

const SkeletonCardComponent = () => {
  return (
    <Card bordered={false} gap="md" padding="md">
      <SkeletonBlock height={moderateScale(180)} />
      <Stack gap="sm">
        <SkeletonBlock height={moderateScale(20)} width="70%" />
        <SkeletonBlock height={moderateScale(16)} width="50%" />
      </Stack>
    </Card>
  );
};

SkeletonCardComponent.displayName = 'SkeletonCard';

const SkeletonRowComponent = () => {
  return (
    <Row alignItems="center" gap="md">
      <SkeletonBlock height={moderateScale(56)} radius={moderateScale(28)} width={moderateScale(56)} />
      <Stack flex gap="sm" style={styles.grow}>
        <SkeletonBlock height={moderateScale(16)} width="55%" />
        <SkeletonBlock height={moderateScale(14)} width="35%" />
      </Stack>
    </Row>
  );
};

SkeletonRowComponent.displayName = 'SkeletonRow';

const SkeletonPosterComponent = () => {
  return (
    <Stack gap="sm">
      <SkeletonBlock height={moderateScale(200)} />
      <SkeletonBlock height={moderateScale(16)} width="60%" />
      <SkeletonBlock height={moderateScale(14)} width="40%" />
    </Stack>
  );
};

SkeletonPosterComponent.displayName = 'SkeletonPoster';

const SkeletonBannerComponent = () => {
  return (
    <Stack gap="md">
      <SkeletonBlock height={bannerStyles.media.height as number} />
      <SkeletonBlock height={moderateScale(24)} width="45%" />
      <SkeletonBlock height={moderateScale(18)} width="65%" />
      <SkeletonBlock height={moderateScale(18)} width="80%" />
    </Stack>
  );
};

SkeletonBannerComponent.displayName = 'SkeletonBanner';

export const SkeletonCardView = memo(SkeletonCardComponent);
export const SkeletonRowView = memo(SkeletonRowComponent);
export const SkeletonPosterView = memo(SkeletonPosterComponent);
export const SkeletonBannerView = memo(SkeletonBannerComponent);
