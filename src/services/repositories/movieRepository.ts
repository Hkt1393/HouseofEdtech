/**
 * Repository for catalog, discovery, and title-detail data access.
 */

import { PAGINATION_CONFIG } from '../../constants';
import type {
  ApiResponse,
  Banner,
  CategoryRow,
  ContinueWatching,
  Episode,
  MovieCard,
  MovieDetails,
  TrendingMovie,
} from '../../types';
import { CategoryType } from '../../types';

import {
  createErrorResponse,
  createNotFoundError,
  mockApiClient,
  MOCK_REQUEST_SCENARIOS,
  type PaginatedRequestOptions,
  type RepositoryRequestOptions,
} from '../api';
import {
  getMockBanners,
  getMockCategories,
  getMockCategoryRows,
  getMockContinueWatching,
  getMockMovieDetails,
  getMockTrendingMovies,
} from '../mock';

export interface HomeFeedData {
  readonly heroBanners: ReadonlyArray<Banner>;
  readonly rows: ReadonlyArray<CategoryRow>;
}

const isSuccessScenario = (scenario?: RepositoryRequestOptions['scenario']): boolean => {
  return !scenario || scenario === MOCK_REQUEST_SCENARIOS.success;
};

const toMovieCard = (movie: TrendingMovie): MovieCard => ({
  id: movie.id,
  title: movie.title,
  mediaType: movie.mediaType,
  posterUrl: movie.posterUrl,
  thumbnailUrl: movie.thumbnailUrl,
  backdropUrl: movie.backdropUrl,
  releaseYear: movie.releaseYear,
  durationInMinutes: movie.durationInMinutes,
  maturityRating: movie.maturityRating,
  badgeLabel: movie.badgeLabel,
  progressPercentage: movie.progressPercentage,
});

const getCategoryDefinition = (
  categoryType: CategoryType,
) => getMockCategories().find((category) => category.type === categoryType);

const buildContinueWatchingRow = (): CategoryRow | null => {
  const category = getCategoryDefinition(CategoryType.ContinueWatching);
  const items = getMockContinueWatching().map((entry) => entry.movie);

  if (!category || items.length === 0 || !category.isVisible) {
    return null;
  }

  return {
    id: 'row-continue-watching',
    category,
    items,
  };
};

const buildTrendingRow = (): CategoryRow | null => {
  const category = getCategoryDefinition(CategoryType.Trending);
  const items = getMockTrendingMovies().map(toMovieCard);

  if (!category || items.length === 0 || !category.isVisible) {
    return null;
  }

  return {
    id: 'row-trending-now',
    category,
    items,
  };
};

const buildCategoryRows = (): ReadonlyArray<CategoryRow> => {
  const rows: CategoryRow[] = [...getMockCategoryRows()];
  const continueWatchingRow = buildContinueWatchingRow();
  const trendingRow = buildTrendingRow();

  if (continueWatchingRow) {
    rows.push(continueWatchingRow);
  }

  if (trendingRow) {
    rows.push(trendingRow);
  }

  return rows
    .filter((row) => row.category.isVisible)
    .sort((left, right) => left.category.priority - right.category.priority);
};

const getCategoryRowByType = (
  categoryType: CategoryType,
): CategoryRow | undefined => {
  return buildCategoryRows().find((row) => row.category.type === categoryType);
};

const getMovieDetailsById = (movieId: string): MovieDetails | undefined => {
  return getMockMovieDetails().find((movie) => movie.id === movieId);
};

class MovieRepository {
  /**
   * Returns the full home feed payload with hero banners and category rows.
   */
  async getHomeFeed(
    options?: RepositoryRequestOptions,
  ): Promise<ApiResponse<HomeFeedData>> {
    return mockApiClient.request<HomeFeedData>({
      ...options,
      emptyData: {
        heroBanners: [],
        rows: [],
      },
      emptyMessage: 'No home feed data is available.',
      source: () => ({
        heroBanners: getMockBanners(),
        rows: buildCategoryRows(),
      }),
      successMessage: 'Home feed loaded successfully.',
    });
  }

  /**
   * Returns the hero-banner collection for the home screen.
   */
  async getHeroBanners(
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<Banner>>> {
    const banners = getMockBanners();

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No hero banners are available.',
      pageSize:
        options?.pageSize ??
        (banners.length || PAGINATION_CONFIG.homeRailPageSize),
      source: () => banners,
      successMessage: 'Hero banners loaded successfully.',
    });
  }

  /**
   * Returns the ranked trending-title collection.
   */
  async getTrending(
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<TrendingMovie>>> {
    const trending = getMockTrendingMovies();

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No trending titles are available.',
      pageSize:
        options?.pageSize ??
        (trending.length || PAGINATION_CONFIG.homeRailPageSize),
      source: () => trending,
      successMessage: 'Trending titles loaded successfully.',
    });
  }

  /**
   * Returns continue-watching progress entries for the active user.
   */
  async getContinueWatching(
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<ContinueWatching>>> {
    const continueWatching = getMockContinueWatching();

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No continue-watching entries are available.',
      pageSize:
        options?.pageSize ??
        (continueWatching.length || PAGINATION_CONFIG.homeRailPageSize),
      source: () => continueWatching,
      successMessage: 'Continue-watching entries loaded successfully.',
    });
  }

  /**
   * Returns the recommended-title rail.
   */
  async getRecommended(
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<MovieCard>>> {
    const recommended = getCategoryRowByType(CategoryType.Recommended)?.items ?? [];

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No recommendations are available.',
      pageSize:
        options?.pageSize ??
        (recommended.length || PAGINATION_CONFIG.homeRailPageSize),
      source: () => recommended,
      successMessage: 'Recommended titles loaded successfully.',
    });
  }

  /**
   * Returns a full title-details record for the requested title id.
   */
  async getMovieDetails(
    movieId: string,
    options?: RepositoryRequestOptions,
  ): Promise<ApiResponse<MovieDetails>> {
    const movieDetails = getMovieDetailsById(movieId);

    if (isSuccessScenario(options?.scenario) && !movieDetails) {
      return createErrorResponse(createNotFoundError('Movie', movieId));
    }

    return mockApiClient.request<MovieDetails>({
      ...options,
      emptyData: null,
      emptyMessage: 'Movie details are unavailable.',
      source: () => movieDetails ?? null,
      successMessage: 'Movie details loaded successfully.',
    });
  }

  /**
   * Returns all visible curated category rows for the home experience.
   */
  async getCategories(
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<CategoryRow>>> {
    const rows = buildCategoryRows();

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No category rows are available.',
      pageSize:
        options?.pageSize ??
        (rows.length || PAGINATION_CONFIG.homeRailPageSize),
      source: () => rows,
      successMessage: 'Category rows loaded successfully.',
    });
  }

  /**
   * Returns all episodes for a series or for a specific season when provided.
   */
  async getEpisodes(
    movieId: string,
    seasonId?: string,
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<Episode>>> {
    const movieDetails = getMovieDetailsById(movieId);

    if (isSuccessScenario(options?.scenario) && !movieDetails) {
      return createErrorResponse(createNotFoundError('Movie', movieId));
    }

    const selectedSeason = seasonId
      ? movieDetails?.seasons.find((season) => season.id === seasonId)
      : undefined;

    if (isSuccessScenario(options?.scenario) && seasonId && !selectedSeason) {
      return createErrorResponse(createNotFoundError('Season', seasonId));
    }

    const episodes =
      selectedSeason?.episodes ??
      movieDetails?.seasons.flatMap((season) => season.episodes) ??
      [];

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No episodes are available.',
      pageSize:
        options?.pageSize ??
        (episodes.length || PAGINATION_CONFIG.searchPageSize),
      source: () => episodes,
      successMessage: 'Episodes loaded successfully.',
    });
  }

  /**
   * Returns related titles for a given title id using detail recommendations.
   */
  async getRelatedMovies(
    movieId: string,
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<MovieCard>>> {
    const movieDetails = getMovieDetailsById(movieId);

    if (isSuccessScenario(options?.scenario) && !movieDetails) {
      return createErrorResponse(createNotFoundError('Movie', movieId));
    }

    const relatedMovies = movieDetails?.recommendations.map(
      (recommendation) => recommendation.movie,
    ) ?? [];

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No related titles are available.',
      pageSize:
        options?.pageSize ??
        (relatedMovies.length || PAGINATION_CONFIG.homeRailPageSize),
      source: () => relatedMovies,
      successMessage: 'Related titles loaded successfully.',
    });
  }
}

export const movieRepository = new MovieRepository();
