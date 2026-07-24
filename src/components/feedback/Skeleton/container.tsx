import React, { memo } from 'react';

import {
  SkeletonBannerView,
  SkeletonCardView,
  SkeletonPosterView,
  SkeletonRowView,
} from './view';

const SkeletonCardComponent = () => <SkeletonCardView />;
SkeletonCardComponent.displayName = 'SkeletonCardContainer';

const SkeletonRowComponent = () => <SkeletonRowView />;
SkeletonRowComponent.displayName = 'SkeletonRowContainer';

const SkeletonPosterComponent = () => <SkeletonPosterView />;
SkeletonPosterComponent.displayName = 'SkeletonPosterContainer';

const SkeletonBannerComponent = () => <SkeletonBannerView />;
SkeletonBannerComponent.displayName = 'SkeletonBannerContainer';

export const SkeletonCard = memo(SkeletonCardComponent);
export const SkeletonRow = memo(SkeletonRowComponent);
export const SkeletonPoster = memo(SkeletonPosterComponent);
export const SkeletonBanner = memo(SkeletonBannerComponent);
