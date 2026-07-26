import React, { memo } from 'react';

import type { DownloadProgressProps, DownloadStatusProps, StorageCardProps } from './types';
import { DownloadProgressView, DownloadStatusView, StorageCardView } from './view';

const DownloadStatusComponent = (props: DownloadStatusProps) => <DownloadStatusView {...props} />;
DownloadStatusComponent.displayName = 'DownloadStatus';

const DownloadProgressComponent = (props: DownloadProgressProps) => (
  <DownloadProgressView {...props} />
);
DownloadProgressComponent.displayName = 'DownloadProgress';

const StorageCardComponent = (props: StorageCardProps) => <StorageCardView {...props} />;
StorageCardComponent.displayName = 'StorageCard';

export const DownloadStatus = memo(DownloadStatusComponent);
export const DownloadProgress = memo(DownloadProgressComponent);
export const StorageCard = memo(StorageCardComponent);
