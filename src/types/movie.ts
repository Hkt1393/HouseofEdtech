/**
 * Core movie and series contracts used across discovery, details, and playback.
 */

import type { Episode } from './episode';

import { MediaType } from './common';

import type { ID, Nullable, Timestamp } from './common';

/**
 * Publication state for a streamable title.
 */
export enum MovieStatus {
  Released = 'released',
  Upcoming = 'upcoming',
  ComingSoon = 'coming-soon',
}

/**
 * A content genre attached to a movie or series.
 */
export interface Genre {
  readonly id: ID;
  readonly name: string;
  readonly slug: string;
}

/**
 * Cast member metadata used by credits and details pages.
 */
export interface Cast {
  readonly id: ID;
  readonly name: string;
  readonly characterName: string;
  readonly avatarUrl: Nullable<string>;
  readonly sortOrder: number;
}

/**
 * Crew member metadata used by credits and production details.
 */
export interface Crew {
  readonly id: ID;
  readonly name: string;
  readonly role: string;
  readonly department: string;
  readonly avatarUrl: Nullable<string>;
}

/**
 * A season collection for episodic content.
 */
export interface Season {
  readonly id: ID;
  readonly title: string;
  readonly synopsis: string;
  readonly seasonNumber: number;
  readonly episodeCount: number;
  readonly posterUrl: Nullable<string>;
  readonly episodes: ReadonlyArray<Episode>;
}

/**
 * Trailer metadata rendered in preview rails and detail screens.
 */
export interface Trailer {
  readonly id: ID;
  readonly title: string;
  readonly thumbnailUrl: string;
  readonly videoUrl: string;
  readonly durationInSeconds: number;
  readonly publishedAt: Timestamp;
}

/**
 * Base media entity used throughout the catalog.
 */
export interface Movie {
  readonly id: ID;
  readonly slug: string;
  readonly title: string;
  readonly synopsis: string;
  readonly mediaType: MediaType;
  readonly status: MovieStatus;
  readonly releaseYear: number;
  readonly durationInMinutes: number;
  readonly maturityRating: string;
  readonly imdbRating: Nullable<number>;
  readonly posterUrl: string;
  readonly backdropUrl: string;
  readonly logoUrl: Nullable<string>;
  readonly isPremium: boolean;
  readonly isDownloadable: boolean;
  readonly genres: ReadonlyArray<Genre>;
  readonly audioLanguages: ReadonlyArray<string>;
  readonly subtitleLanguages: ReadonlyArray<string>;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

/**
 * Compact movie contract used by carousels, tabs, and rails.
 */
export interface MovieCard {
  readonly id: ID;
  readonly title: string;
  readonly mediaType: MediaType;
  readonly posterUrl: string;
  readonly thumbnailUrl: string;
  readonly backdropUrl: string;
  readonly releaseYear: number;
  readonly durationInMinutes: number;
  readonly maturityRating: string;
  readonly badgeLabel: Nullable<string>;
  readonly progressPercentage: Nullable<number>;
}

/**
 * Recommendation item associated with a title detail view.
 */
export interface Recommendation {
  readonly id: ID;
  readonly reason: string;
  readonly movie: MovieCard;
}

/**
 * Continue-watching progress entry for a title.
 */
export interface ContinueWatching {
  readonly movie: MovieCard;
  readonly lastPositionInSeconds: number;
  readonly progressPercentage: number;
  readonly remainingDurationInMinutes: number;
  readonly lastWatchedAt: Timestamp;
}

/**
 * Ranked trending title metadata used by charts and discovery rows.
 */
export interface TrendingMovie extends MovieCard {
  readonly trendRank: number;
  readonly trendScore: number;
}

/**
 * Featured hero content metadata used by banners and top-of-home placement.
 */
export interface FeaturedMovie extends MovieCard {
  readonly headline: string;
  readonly subheadline: Nullable<string>;
  readonly calloutLabel: Nullable<string>;
  readonly trailer: Nullable<Trailer>;
}

/**
 * Fully hydrated details contract for a selected title.
 */
export interface MovieDetails extends Movie {
  readonly storyline: string;
  readonly cast: ReadonlyArray<Cast>;
  readonly crew: ReadonlyArray<Crew>;
  readonly seasons: ReadonlyArray<Season>;
  readonly trailers: ReadonlyArray<Trailer>;
  readonly recommendations: ReadonlyArray<Recommendation>;
  readonly tags: ReadonlyArray<string>;
}
