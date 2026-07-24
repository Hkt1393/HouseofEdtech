/**
 * Download-management contracts used by offline playback features.
 */

import { MediaType } from './common';

import type { ID, Nullable, Timestamp } from './common';

/**
 * Download lifecycle states for offline content.
 */
export enum DownloadStatus {
  Queued = 'queued',
  Downloading = 'downloading',
  Paused = 'paused',
  Completed = 'completed',
  Failed = 'failed',
  Expired = 'expired',
}

/**
 * Supported download quality presets.
 */
export enum DownloadQuality {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Ultra = 'ultra',
}

/**
 * Offline media item persisted on the device.
 */
export interface DownloadItem {
  readonly id: ID;
  readonly mediaId: ID;
  readonly mediaType: MediaType;
  readonly title: string;
  readonly posterUrl: string;
  readonly quality: DownloadQuality;
  readonly status: DownloadStatus;
  readonly progressPercentage: number;
  readonly downloadedBytes: number;
  readonly totalBytes: number;
  readonly downloadedAt: Nullable<Timestamp>;
  readonly expiresAt: Nullable<Timestamp>;
  readonly updatedAt: Timestamp;
}

/**
 * Aggregate storage usage information for the downloads feature.
 */
export interface StorageInfo {
  readonly usedBytes: number;
  readonly availableBytes: number;
  readonly totalBytes: number;
  readonly usagePercentage: number;
}

/**
 * Downloads payload returned by the repository with storage metadata.
 */
export interface DownloadsOverview {
  readonly items: ReadonlyArray<DownloadItem>;
  readonly storageInfo: StorageInfo;
}
