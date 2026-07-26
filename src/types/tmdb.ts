/**
 * TMDB API response contracts used by the real catalog service layer.
 */

export interface TmdbMovieListItem {
  readonly adult: boolean;
  readonly backdrop_path: string | null;
  readonly genre_ids: ReadonlyArray<number>;
  readonly id: number;
  readonly original_language: string;
  readonly overview: string;
  readonly popularity: number;
  readonly poster_path: string | null;
  readonly release_date: string;
  readonly title: string;
  readonly video: boolean;
  readonly vote_average: number;
  readonly vote_count: number;
}

export interface TmdbListResponse<TItem> {
  readonly page: number;
  readonly results: ReadonlyArray<TItem>;
  readonly total_pages: number;
  readonly total_results: number;
}

export interface TmdbErrorResponse {
  readonly status_code?: number;
  readonly status_message?: string;
  readonly success?: boolean;
}
