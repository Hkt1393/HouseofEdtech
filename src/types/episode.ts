/**
 * Episode-level media contracts used for series details and playback state.
 */

import type { ID, Nullable, Timestamp } from './common';

/**
 * A single episode available in a season.
 */
export interface Episode {
  readonly id: ID;
  readonly seasonId: ID;
  readonly seasonNumber: number;
  readonly episodeNumber: number;
  readonly title: string;
  readonly synopsis: string;
  readonly durationInMinutes: number;
  readonly thumbnailUrl: string;
  readonly stillUrl: Nullable<string>;
  readonly videoUrl: string;
  readonly airDate: Nullable<Timestamp>;
  readonly isDownloadable: boolean;
}

/**
 * Persisted playback progress for an episode.
 */
export interface EpisodeProgress {
  readonly episodeId: ID;
  readonly progressPercentage: number;
  readonly lastPositionInSeconds: number;
  readonly updatedAt: Timestamp;
}
