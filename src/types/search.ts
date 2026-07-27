/**
 * Search and discovery contracts used by search history and results.
 */

import { MediaType } from './common';

import type { ID, Nullable, Timestamp } from './common';

/**
 * Supported filters for search discovery.
 */
export enum SearchCategory {
  All = 'all',
  Movies = 'movies',
  Series = 'series',
  Episodes = 'episodes',
  People = 'people',
}

/**
 * Persisted search history item.
 */
export interface SearchHistory {
  readonly id: ID;
  readonly query: string;
  readonly category: SearchCategory;
  readonly resultCount: number;
  readonly searchedAt: Timestamp;
}

/**
 * Suggestion item surfaced before a full search request.
 */
export interface SearchSuggestion {
  readonly id: ID;
  readonly label: string;
  readonly category: SearchCategory;
  readonly deeplink: string;
}

/**
 * Search result contract for streaming content discovery.
 */
export interface SearchResult {
  readonly id: ID;
  readonly title: string;
  readonly subtitle: Nullable<string>;
  readonly backdropUrl: string;
  readonly mediaType: MediaType;
  readonly posterUrl: string;
  readonly rating: Nullable<number>;
  readonly releaseYear: Nullable<number>;
  readonly matchScore: number;
  readonly genres: ReadonlyArray<string>;
}

/**
 * Trending search query metadata used by discovery suggestions.
 */
export interface TrendingSearch {
  readonly id: ID;
  readonly query: string;
  readonly rank: number;
  readonly searchCount: number;
}
