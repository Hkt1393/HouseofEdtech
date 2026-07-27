/**
 * Category contracts used to group content into reusable discovery rails.
 */

import type { ID, Nullable } from './common';
import type { MovieCard } from './movie';

/**
 * Supported row categories rendered in the streaming home experience.
 */
export enum CategoryType {
  Hero = 'hero',
  Featured = 'featured',
  Trending = 'trending',
  ContinueWatching = 'continue-watching',
  Recommended = 'recommended',
  NewReleases = 'new-releases',
  Genre = 'genre',
  Popular = 'popular',
  TopRated = 'top-rated',
}

/**
 * Category metadata used to describe a content rail.
 */
export interface Category {
  readonly id: ID;
  readonly title: string;
  readonly slug: string;
  readonly type: CategoryType;
  readonly description: Nullable<string>;
  readonly priority: number;
  readonly isVisible: boolean;
}

/**
 * Category plus its associated movie cards.
 */
export interface CategoryRow {
  readonly id: ID;
  readonly category: Category;
  readonly items: ReadonlyArray<MovieCard>;
}
