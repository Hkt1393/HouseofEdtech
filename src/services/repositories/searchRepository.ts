/**
 * Repository for search, suggestions, and search-history data access.
 */

import {
  PAGINATION_CONFIG,
  TMDB_CONFIG,
  VALIDATION_RULES,
} from '../../constants';
import { MediaType } from '../../types/common';

import type {
  ApiResponse,
  SearchHistory,
  SearchResult,
  SearchSuggestion,
  TmdbGenreListResponse,
  TmdbListResponse,
  TmdbMovieListItem,
  TmdbPersonListItem,
  TrendingSearch,
} from '../../types';

import {
  createApiError,
  createEmptyResponse,
  createErrorResponse,
  createSuccessResponse,
  mockApiClient,
  tmdbApiClient,
  type PaginatedRequestOptions,
} from '../api';
import {
  getMockRecentSearches,
  getMockSearchSuggestions,
} from '../mock';

export interface SearchPopularPerson {
  readonly id: string;
  readonly imageUrl: string | null;
  readonly name: string;
}

export interface SearchRequestOptions extends PaginatedRequestOptions {
  readonly forceRefresh?: boolean;
}

const normalizeQuery = (query: string): string => {
  return query.trim().slice(0, VALIDATION_RULES.search.maxQueryLength);
};

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

class SearchRepository {
  private genreLookupCache: ReadonlyMap<number, string> | null = null;

  private genreLookupRequest: Promise<ReadonlyMap<number, string>> | null = null;

  private readonly popularPeopleCache = new Map<
    number,
    ApiResponse<ReadonlyArray<SearchPopularPerson>>
  >();

  private readonly popularPeopleRequests = new Map<
    number,
    Promise<ApiResponse<ReadonlyArray<SearchPopularPerson>>>
  >();

  private readonly searchCache = new Map<
    string,
    ApiResponse<ReadonlyArray<SearchResult>>
  >();

  private readonly searchRequests = new Map<
    string,
    Promise<ApiResponse<ReadonlyArray<SearchResult>>>
  >();

  private trendingSearchesCache: ApiResponse<ReadonlyArray<TrendingSearch>> | null = null;

  private trendingSearchesRequest: Promise<ApiResponse<ReadonlyArray<TrendingSearch>>> | null =
    null;

  private getSearchCacheKey(query: string, page: number): string {
    return `${normalizeQuery(query).toLowerCase()}-${page}`;
  }

  private async getGenreLookup(
    forceRefresh: boolean = false,
  ): Promise<ReadonlyMap<number, string>> {
    if (!forceRefresh && this.genreLookupCache) {
      return this.genreLookupCache;
    }

    if (this.genreLookupRequest) {
      return this.genreLookupRequest;
    }

    const request = (async (): Promise<ReadonlyMap<number, string>> => {
      const response = await tmdbApiClient.requestPayload<TmdbGenreListResponse>(
        '/genre/movie/list',
        {
          language: TMDB_CONFIG.defaultLanguage,
        },
      );

      if (!response.success || !response.data) {
        return new Map();
      }

      const nextLookup = new Map<number, string>(
        response.data.genres.map((genre) => [genre.id, genre.name]),
      );

      this.genreLookupCache = nextLookup;

      return nextLookup;
    })();

    this.genreLookupRequest = request;

    try {
      return await request;
    } finally {
      this.genreLookupRequest = null;
    }
  }

  private mapSearchResult(
    movie: TmdbMovieListItem,
    genreLookup: ReadonlyMap<number, string>,
  ): SearchResult {
    return {
      backdropUrl: tmdbApiClient.buildImageUrl(
        movie.backdrop_path ?? movie.poster_path,
        TMDB_CONFIG.backdropSize,
      ),
      genres: movie.genre_ids
        .map((genreId) => genreLookup.get(genreId))
        .filter((genreLabel): genreLabel is string => Boolean(genreLabel)),
      id: String(movie.id),
      matchScore: movie.popularity,
      mediaType: MediaType.Movie,
      posterUrl: tmdbApiClient.buildImageUrl(
        movie.poster_path ?? movie.backdrop_path,
        TMDB_CONFIG.posterSize,
      ),
      rating: toRating(movie.vote_average),
      releaseYear: toReleaseYear(movie.release_date),
      subtitle: movie.overview.trim() || null,
      title: movie.title,
    };
  }

  clearSearchCache(): void {
    this.searchCache.clear();
    this.searchRequests.clear();
    this.trendingSearchesCache = null;
    this.trendingSearchesRequest = null;
    this.popularPeopleCache.clear();
    this.popularPeopleRequests.clear();
  }

  /**
   * Returns paginated search results for a query string.
   */
  async searchMovies(
    query: string,
    options?: SearchRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<SearchResult>>> {
    const normalizedQuery = normalizeQuery(query);
    const page = options?.page ?? PAGINATION_CONFIG.initialPage;

    if (normalizedQuery.length < VALIDATION_RULES.search.minQueryLength) {
      return createEmptyResponse(
        [],
        'No search results matched the current query.',
      );
    }

    const cacheKey = this.getSearchCacheKey(normalizedQuery, page);

    if (!options?.forceRefresh) {
      const cachedResponse = this.searchCache.get(cacheKey);

      if (cachedResponse) {
        return cachedResponse;
      }

      const inFlightRequest = this.searchRequests.get(cacheKey);

      if (inFlightRequest) {
        return inFlightRequest;
      }
    }

    const request = (async (): Promise<ApiResponse<ReadonlyArray<SearchResult>>> => {
      const genreLookup = await this.getGenreLookup(options?.forceRefresh);
      const response = await tmdbApiClient.requestCollection<
        TmdbMovieListItem,
        SearchResult
      >({
        emptyMessage: 'No search results matched the current query.',
        mapItem: (movie) => this.mapSearchResult(movie, genreLookup),
        path: '/search/movie',
        query: {
          include_adult: false,
          language: TMDB_CONFIG.defaultLanguage,
          page,
          query: normalizedQuery,
        },
        successMessage: 'Search results loaded successfully.',
      });

      if (response.success) {
        this.searchCache.set(cacheKey, response);
      }

      return response;
    })();

    this.searchRequests.set(cacheKey, request);

    try {
      return await request;
    } finally {
      this.searchRequests.delete(cacheKey);
    }
  }

  /**
   * Returns trending search queries for the discovery experience.
   */
  async getTrendingSearches(
    options?: Pick<SearchRequestOptions, 'forceRefresh'>,
  ): Promise<ApiResponse<ReadonlyArray<TrendingSearch>>> {
    if (!options?.forceRefresh && this.trendingSearchesCache) {
      return this.trendingSearchesCache;
    }

    if (this.trendingSearchesRequest) {
      return this.trendingSearchesRequest;
    }

    const request = (async (): Promise<ApiResponse<ReadonlyArray<TrendingSearch>>> => {
      const response = await tmdbApiClient.requestPayload<
        TmdbListResponse<TmdbMovieListItem>
      >('/trending/movie/day', {
        language: TMDB_CONFIG.defaultLanguage,
        page: PAGINATION_CONFIG.initialPage,
      });

      if (response.success && response.data) {
        const nextResponse = createSuccessResponse(
          response.data.results.slice(0, 4).map((movie, index) => ({
            id: String(movie.id),
            query: movie.title,
            rank: index + 1,
            searchCount: movie.vote_count,
          })),
          'Trending searches loaded successfully.',
        );

        this.trendingSearchesCache = nextResponse;

        return nextResponse;
      }

      return createErrorResponse(
        response.error ??
          createApiError('TMDB_REQUEST_ERROR', response.message, 500),
        response.message,
      );
    })();

    this.trendingSearchesRequest = request;

    try {
      return await request;
    } finally {
      this.trendingSearchesRequest = null;
    }
  }

  async getPopularPeople(
    options?: SearchRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<SearchPopularPerson>>> {
    const page = options?.page ?? PAGINATION_CONFIG.initialPage;

    if (!options?.forceRefresh) {
      const cachedResponse = this.popularPeopleCache.get(page);

      if (cachedResponse) {
        return cachedResponse;
      }

      const inFlightRequest = this.popularPeopleRequests.get(page);

      if (inFlightRequest) {
        return inFlightRequest;
      }
    }

    const request = tmdbApiClient.requestCollection<
      TmdbPersonListItem,
      SearchPopularPerson
    >({
      emptyMessage: 'Popular talent is unavailable right now.',
      mapItem: (person) => ({
        id: String(person.id),
        imageUrl:
          tmdbApiClient.buildImageUrl(
            person.profile_path,
            TMDB_CONFIG.posterSize,
          ) || null,
        name: person.name,
      }),
      path: '/person/popular',
      query: {
        language: TMDB_CONFIG.defaultLanguage,
        page,
      },
      successMessage: 'Popular talent loaded successfully.',
    });

    this.popularPeopleRequests.set(page, request);

    try {
      const response = await request;

      if (response.success) {
        const nextResponse = createSuccessResponse(
          (response.data ?? []).slice(0, 8),
          response.message,
          response.meta,
        );

        this.popularPeopleCache.set(page, nextResponse);

        return nextResponse;
      }

      return response;
    } finally {
      this.popularPeopleRequests.delete(page);
    }
  }

  /**
   * Returns type-ahead suggestions for an optional query string.
   */
  async getSuggestions(
    query: string = '',
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<SearchSuggestion>>> {
    const normalizedQuery = normalizeQuery(query).toLowerCase();
    const suggestions = getMockSearchSuggestions();

    const filteredSuggestions =
      normalizedQuery.length < VALIDATION_RULES.search.minQueryLength
        ? suggestions.slice(0, VALIDATION_RULES.search.maxSuggestions)
        : suggestions
            .filter((suggestion) =>
              suggestion.label.toLowerCase().includes(normalizedQuery),
            )
            .slice(0, VALIDATION_RULES.search.maxSuggestions);

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No search suggestions are available.',
      pageSize: options?.pageSize ?? VALIDATION_RULES.search.maxSuggestions,
      source: () => filteredSuggestions,
      successMessage: 'Search suggestions loaded successfully.',
    });
  }

  /**
   * Returns recent searches for the active profile.
   */
  async getRecentSearches(
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<SearchHistory>>> {
    const recentSearches = getMockRecentSearches();

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No recent searches are available.',
      pageSize: options?.pageSize ?? VALIDATION_RULES.search.maxRecentItems,
      source: () => recentSearches,
      successMessage: 'Recent searches loaded successfully.',
    });
  }
}

export const searchRepository = new SearchRepository();
