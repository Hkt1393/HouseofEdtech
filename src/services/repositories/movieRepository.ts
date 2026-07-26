/**
 * Repository for Home catalog data backed by TMDB.
 */

import {
  TMDB_CONFIG,
  TMDB_HOME_SECTION_DEFINITIONS,
  type TmdbHomeSectionKey,
} from '../../constants';

import type { ApiResponse, TmdbMovieListItem } from '../../types';

import {
  createApiError,
  createEmptyResponse,
  createErrorResponse,
  createSuccessResponse,
  tmdbApiClient,
  type PaginatedRequestOptions,
} from '../api';

export interface HomeMovieItem {
  readonly backdropUrl: string;
  readonly id: string;
  readonly overview: string;
  readonly posterUrl: string;
  readonly rating: number | null;
  readonly releaseYear: number | null;
  readonly title: string;
}

export interface HomeSectionRequestOptions extends PaginatedRequestOptions {
  readonly forceRefresh?: boolean;
}

const toReleaseYear = (releaseDate: string): number | null => {
  const [year] = releaseDate.split('-');
  const parsedYear = Number(year);

  return Number.isFinite(parsedYear) && parsedYear > 0 ? parsedYear : null;
};

const toRating = (voteAverage: number): number | null => {
  if (!Number.isFinite(voteAverage) || voteAverage <= 0) {
    return null;
  }

  return Number(voteAverage.toFixed(1));
};

const mapMovieItem = (movie: TmdbMovieListItem): HomeMovieItem => ({
  backdropUrl: tmdbApiClient.buildImageUrl(
    movie.backdrop_path ?? movie.poster_path,
    TMDB_CONFIG.backdropSize,
  ),
  id: String(movie.id),
  overview: movie.overview.trim(),
  posterUrl: tmdbApiClient.buildImageUrl(
    movie.poster_path ?? movie.backdrop_path,
    TMDB_CONFIG.posterSize,
  ),
  rating: toRating(movie.vote_average),
  releaseYear: toReleaseYear(movie.release_date),
  title: movie.title,
});

class MovieRepository {
  private readonly homeSectionCache = new Map<
    TmdbHomeSectionKey,
    Map<number, ApiResponse<ReadonlyArray<HomeMovieItem>>>
  >();

  private readonly homeSectionRequests = new Map<
    string,
    Promise<ApiResponse<ReadonlyArray<HomeMovieItem>>>
  >();

  private getSectionCacheKey(sectionKey: TmdbHomeSectionKey, page: number): string {
    return `${sectionKey}-${page}`;
  }

  private getCachedSection(
    sectionKey: TmdbHomeSectionKey,
    page: number,
  ): ApiResponse<ReadonlyArray<HomeMovieItem>> | undefined {
    return this.homeSectionCache.get(sectionKey)?.get(page);
  }

  private setCachedSection(
    sectionKey: TmdbHomeSectionKey,
    page: number,
    response: ApiResponse<ReadonlyArray<HomeMovieItem>>,
  ): void {
    const sectionCache = this.homeSectionCache.get(sectionKey) ?? new Map();

    sectionCache.set(page, response);
    this.homeSectionCache.set(sectionKey, sectionCache);
  }

  clearHomeCache(): void {
    this.homeSectionCache.clear();
    this.homeSectionRequests.clear();
  }

  async getHomeHero(
    options?: Pick<HomeSectionRequestOptions, 'forceRefresh'>,
  ): Promise<ApiResponse<HomeMovieItem>> {
    const response = await this.getHomeSection('trending', {
      forceRefresh: options?.forceRefresh,
      page: TMDB_CONFIG.homeInitialPage,
    });

    if (!response.success) {
      return createErrorResponse(
        response.error ??
          createApiError('TMDB_REQUEST_ERROR', response.message, 500),
        response.message,
      );
    }

    const heroItem =
      response.data?.find((item) => item.backdropUrl.length > 0) ??
      response.data?.[0];

    if (!heroItem) {
      return createEmptyResponse<HomeMovieItem>(
        null,
        'No hero content is available.',
      );
    }

    return createSuccessResponse(heroItem, 'Hero content loaded successfully.');
  }

  async getHomeSection(
    sectionKey: TmdbHomeSectionKey,
    options?: HomeSectionRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<HomeMovieItem>>> {
    const page = options?.page ?? TMDB_CONFIG.homeInitialPage;

    if (!options?.forceRefresh) {
      const cachedResponse = this.getCachedSection(sectionKey, page);

      if (cachedResponse) {
        return cachedResponse;
      }
    }

    const requestKey = this.getSectionCacheKey(sectionKey, page);
    const inFlightRequest = this.homeSectionRequests.get(requestKey);

    if (inFlightRequest) {
      return inFlightRequest;
    }

    const sectionDefinition = TMDB_HOME_SECTION_DEFINITIONS[sectionKey];
    const request = tmdbApiClient.requestCollection<TmdbMovieListItem, HomeMovieItem>({
      emptyMessage: `${sectionDefinition.title} is unavailable right now.`,
      mapItem: mapMovieItem,
      path: sectionDefinition.endpoint,
      query: {
        language: TMDB_CONFIG.defaultLanguage,
        page,
        region:
          sectionKey === 'trending' ? undefined : TMDB_CONFIG.defaultRegion,
      },
      successMessage: `${sectionDefinition.title} loaded successfully.`,
    });

    this.homeSectionRequests.set(requestKey, request);

    try {
      const response = await request;

      if (response.success) {
        this.setCachedSection(sectionKey, page, response);
      }

      return response;
    } finally {
      this.homeSectionRequests.delete(requestKey);
    }
  }
}

export const movieRepository = new MovieRepository();
