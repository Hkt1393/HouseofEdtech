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

export interface TmdbGenreListItem {
  readonly id: number;
  readonly name: string;
}

export interface TmdbGenreListResponse {
  readonly genres: ReadonlyArray<TmdbGenreListItem>;
}

export interface TmdbPersonListItem {
  readonly adult: boolean;
  readonly gender: number | null;
  readonly id: number;
  readonly known_for_department: string;
  readonly name: string;
  readonly original_name: string;
  readonly popularity: number;
  readonly profile_path: string | null;
}

export interface TmdbProductionCompany {
  readonly id: number;
  readonly logo_path: string | null;
  readonly name: string;
  readonly origin_country: string;
}

export interface TmdbSpokenLanguage {
  readonly english_name: string;
  readonly iso_639_1: string;
  readonly name: string;
}

export interface TmdbCreditCastItem {
  readonly adult: boolean;
  readonly cast_id?: number;
  readonly character: string;
  readonly credit_id: string;
  readonly gender: number | null;
  readonly id: number;
  readonly known_for_department: string;
  readonly name: string;
  readonly order: number;
  readonly original_name: string;
  readonly popularity: number;
  readonly profile_path: string | null;
}

export interface TmdbCreditCrewItem {
  readonly adult: boolean;
  readonly credit_id: string;
  readonly department: string;
  readonly gender: number | null;
  readonly id: number;
  readonly job: string;
  readonly known_for_department: string;
  readonly name: string;
  readonly original_name: string;
  readonly popularity: number;
  readonly profile_path: string | null;
}

export interface TmdbCreditsResponse {
  readonly cast: ReadonlyArray<TmdbCreditCastItem>;
  readonly crew: ReadonlyArray<TmdbCreditCrewItem>;
}

export interface TmdbVideoItem {
  readonly id: string;
  readonly iso_3166_1: string;
  readonly iso_639_1: string;
  readonly key: string;
  readonly name: string;
  readonly official: boolean;
  readonly published_at: string;
  readonly site: string;
  readonly size: number;
  readonly type: string;
}

export interface TmdbVideosResponse {
  readonly results: ReadonlyArray<TmdbVideoItem>;
}

export interface TmdbImageItem {
  readonly aspect_ratio: number;
  readonly file_path: string;
  readonly height: number;
  readonly iso_639_1: string | null;
  readonly vote_average: number;
  readonly vote_count: number;
  readonly width: number;
}

export interface TmdbImagesResponse {
  readonly backdrops: ReadonlyArray<TmdbImageItem>;
  readonly logos: ReadonlyArray<TmdbImageItem>;
  readonly posters: ReadonlyArray<TmdbImageItem>;
}

export interface TmdbReleaseDateEntry {
  readonly certification: string;
  readonly descriptors: ReadonlyArray<string>;
  readonly iso_639_1: string;
  readonly note: string;
  readonly release_date: string;
  readonly type: number;
}

export interface TmdbReleaseDateCountryResult {
  readonly iso_3166_1: string;
  readonly release_dates: ReadonlyArray<TmdbReleaseDateEntry>;
}

export interface TmdbReleaseDatesResponse {
  readonly results: ReadonlyArray<TmdbReleaseDateCountryResult>;
}

export interface TmdbListResponse<TItem> {
  readonly page: number;
  readonly results: ReadonlyArray<TItem>;
  readonly total_pages: number;
  readonly total_results: number;
}

export interface TmdbMovieDetailResponse {
  readonly adult: boolean;
  readonly backdrop_path: string | null;
  readonly budget: number;
  readonly credits?: TmdbCreditsResponse;
  readonly genres: ReadonlyArray<TmdbGenreListItem>;
  readonly homepage: string | null;
  readonly id: number;
  readonly images?: TmdbImagesResponse;
  readonly imdb_id: string | null;
  readonly original_language: string;
  readonly original_title: string;
  readonly overview: string;
  readonly popularity: number;
  readonly poster_path: string | null;
  readonly production_companies: ReadonlyArray<TmdbProductionCompany>;
  readonly recommendations?: TmdbListResponse<TmdbMovieListItem>;
  readonly release_date: string;
  readonly release_dates?: TmdbReleaseDatesResponse;
  readonly revenue: number;
  readonly runtime: number | null;
  readonly similar?: TmdbListResponse<TmdbMovieListItem>;
  readonly spoken_languages: ReadonlyArray<TmdbSpokenLanguage>;
  readonly status: string;
  readonly tagline: string;
  readonly title: string;
  readonly video: boolean;
  readonly videos?: TmdbVideosResponse;
  readonly vote_average: number;
  readonly vote_count: number;
}

export interface TmdbErrorResponse {
  readonly status_code?: number;
  readonly status_message?: string;
  readonly success?: boolean;
}
