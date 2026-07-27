/**
 * Repository for Home catalog data backed by TMDB.
 */

import {
  APP_STRINGS,
  TMDB_CONFIG,
  TMDB_HOME_SECTION_DEFINITIONS,
  type TmdbHomeSectionKey,
} from '../../constants';

import type {
  ApiResponse,
  TmdbCreditsResponse,
  TmdbGenreListResponse,
  TmdbImageItem,
  TmdbImagesResponse,
  TmdbMovieDetailResponse,
  TmdbMovieListItem,
  TmdbReleaseDatesResponse,
  TmdbSpokenLanguage,
  TmdbVideoItem,
} from '../../types';

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
  readonly genreIds: ReadonlyArray<number>;
  readonly id: string;
  readonly overview: string;
  readonly posterUrl: string;
  readonly rating: number | null;
  readonly releaseYear: number | null;
  readonly title: string;
}

export interface HomeGenreItem {
  readonly id: string;
  readonly label: string;
}

export interface MovieDetailGenreItem {
  readonly id: string;
  readonly label: string;
}

export interface MovieDetailCastItem {
  readonly character: string;
  readonly id: string;
  readonly imageUrl: string | null;
  readonly name: string;
}

export interface MovieDetailGalleryItem {
  readonly aspectRatio: number;
  readonly id: string;
  readonly imageUrl: string;
  readonly type: 'backdrop' | 'poster';
}

export interface MovieDetailVideoItem {
  readonly id: string;
  readonly isOfficial: boolean;
  readonly name: string;
  readonly publishedAt: string | null;
  readonly site: string;
  readonly thumbnailUrl: string;
  readonly type: string;
  readonly url: string;
}

export interface MovieDetailItem {
  readonly ageCertification: string | null;
  readonly backdropUrl: string;
  readonly budget: number | null;
  readonly cast: ReadonlyArray<MovieDetailCastItem>;
  readonly genres: ReadonlyArray<MovieDetailGenreItem>;
  readonly homepageUrl: string | null;
  readonly id: string;
  readonly images: ReadonlyArray<MovieDetailGalleryItem>;
  readonly language: string | null;
  readonly overview: string;
  readonly posterUrl: string;
  readonly productionCompanies: ReadonlyArray<string>;
  readonly rating: number | null;
  readonly recommendations: ReadonlyArray<HomeMovieItem>;
  readonly releaseDate: string;
  readonly releaseYear: number | null;
  readonly revenue: number | null;
  readonly runtimeMinutes: number | null;
  readonly similar: ReadonlyArray<HomeMovieItem>;
  readonly status: string | null;
  readonly tagline: string;
  readonly title: string;
  readonly tmdbShareUrl: string;
  readonly trailer: MovieDetailVideoItem | null;
  readonly trailers: ReadonlyArray<MovieDetailVideoItem>;
}

export interface HomeSectionRequestOptions extends PaginatedRequestOptions {
  readonly forceRefresh?: boolean;
}

export interface MovieDetailRequestOptions {
  readonly forceRefresh?: boolean;
}

const MAX_GALLERY_ITEMS = 18;
const MAX_CAST_ITEMS = 12;
const TMDB_APPEND_TO_RESPONSE = [
  'credits',
  'videos',
  'images',
  'similar',
  'recommendations',
  'release_dates',
].join(',');
const TMDB_IMAGE_LANGUAGE = `${TMDB_CONFIG.defaultLanguage.split('-')[0]},null`;
const TMDB_VIDEO_SITE_PRIORITY = ['YouTube', 'Vimeo'] as const;
const TMDB_VIDEO_TYPE_PRIORITY = [
  'Trailer',
  'Teaser',
  'Clip',
  'Featurette',
] as const;

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
  genreIds: movie.genre_ids,
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

const toOptionalTrimmedString = (value: string | null | undefined): string | null => {
  const normalizedValue = value?.trim() ?? '';

  return normalizedValue.length > 0 ? normalizedValue : null;
};

const mapDetailGenres = (
  genres: ReadonlyArray<{
    readonly id: number;
    readonly name: string;
  }>,
): ReadonlyArray<MovieDetailGenreItem> => {
  return genres.map((genre) => ({
    id: String(genre.id),
    label: genre.name,
  }));
};

const mapCastItems = (
  credits?: TmdbCreditsResponse,
): ReadonlyArray<MovieDetailCastItem> => {
  return [...(credits?.cast ?? [])]
    .sort((left, right) => left.order - right.order)
    .slice(0, MAX_CAST_ITEMS)
    .map((member) => ({
      character: member.character.trim(),
      id: String(member.id),
      imageUrl: tmdbApiClient.buildImageUrl(
        member.profile_path,
        TMDB_CONFIG.posterSize,
      ) || null,
      name: member.name,
    }));
};

const getLanguageLabel = (
  spokenLanguages: ReadonlyArray<TmdbSpokenLanguage>,
  originalLanguage: string,
): string | null => {
  const spokenLanguage =
    spokenLanguages.find((language) => language.english_name.trim().length > 0)
      ?.english_name ??
    spokenLanguages.find((language) => language.name.trim().length > 0)?.name;

  return toOptionalTrimmedString(spokenLanguage) ?? originalLanguage.toUpperCase();
};

const buildVideoUrl = (video: TmdbVideoItem): string => {
  switch (video.site) {
    case 'YouTube':
      return `https://www.youtube.com/watch?v=${video.key}`;
    case 'Vimeo':
      return `https://vimeo.com/${video.key}`;
    default:
      return '';
  }
};

const buildVideoThumbnailUrl = (video: TmdbVideoItem): string => {
  if (video.site === 'YouTube') {
    return `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;
  }

  return '';
};

const mapVideoItem = (video: TmdbVideoItem): MovieDetailVideoItem | null => {
  const url = buildVideoUrl(video);

  if (!url) {
    return null;
  }

  return {
    id: video.id,
    isOfficial: video.official,
    name: video.name.trim(),
    publishedAt: toOptionalTrimmedString(video.published_at),
    site: video.site,
    thumbnailUrl: buildVideoThumbnailUrl(video),
    type: video.type,
    url,
  };
};

const getVideoSitePriority = (site: string): number => {
  const index = TMDB_VIDEO_SITE_PRIORITY.indexOf(
    site as (typeof TMDB_VIDEO_SITE_PRIORITY)[number],
  );

  return index >= 0 ? index : TMDB_VIDEO_SITE_PRIORITY.length;
};

const getVideoTypePriority = (type: string): number => {
  const index = TMDB_VIDEO_TYPE_PRIORITY.indexOf(
    type as (typeof TMDB_VIDEO_TYPE_PRIORITY)[number],
  );

  return index >= 0 ? index : TMDB_VIDEO_TYPE_PRIORITY.length;
};

const selectPrimaryTrailer = (
  videos: ReadonlyArray<MovieDetailVideoItem>,
): MovieDetailVideoItem | null => {
  return (
    [...videos].sort((left, right) => {
      const sitePriorityDifference =
        getVideoSitePriority(left.site) - getVideoSitePriority(right.site);

      if (sitePriorityDifference !== 0) {
        return sitePriorityDifference;
      }

      if (left.isOfficial !== right.isOfficial) {
        return left.isOfficial ? -1 : 1;
      }

      const typePriorityDifference =
        getVideoTypePriority(left.type) - getVideoTypePriority(right.type);

      if (typePriorityDifference !== 0) {
        return typePriorityDifference;
      }

      const leftPublishedAt = left.publishedAt
        ? new Date(left.publishedAt).getTime()
        : 0;
      const rightPublishedAt = right.publishedAt
        ? new Date(right.publishedAt).getTime()
        : 0;

      return rightPublishedAt - leftPublishedAt;
    })[0] ?? null
  );
};

const mapGalleryImage = (
  image: TmdbImageItem,
  type: MovieDetailGalleryItem['type'],
): MovieDetailGalleryItem | null => {
  const imageUrl = tmdbApiClient.buildImageUrl(
    image.file_path,
    type === 'backdrop' ? TMDB_CONFIG.backdropSize : TMDB_CONFIG.posterSize,
  );

  if (!imageUrl) {
    return null;
  }

  return {
    aspectRatio: image.aspect_ratio,
    id: `${type}-${image.file_path}`,
    imageUrl,
    type,
  };
};

const mapGalleryItems = (
  images?: TmdbImagesResponse,
): ReadonlyArray<MovieDetailGalleryItem> => {
  const seen = new Set<string>();
  const galleryItems: MovieDetailGalleryItem[] = [];

  const appendImages = (
    items: ReadonlyArray<TmdbImageItem>,
    type: MovieDetailGalleryItem['type'],
  ) => {
    items.forEach((image) => {
      const mappedImage = mapGalleryImage(image, type);

      if (!mappedImage || seen.has(mappedImage.imageUrl)) {
        return;
      }

      seen.add(mappedImage.imageUrl);
      galleryItems.push(mappedImage);
    });
  };

  appendImages(images?.backdrops ?? [], 'backdrop');
  appendImages(images?.posters ?? [], 'poster');

  return galleryItems.slice(0, MAX_GALLERY_ITEMS);
};

const getAgeCertification = (
  releaseDates: TmdbReleaseDatesResponse | undefined,
  isAdult: boolean,
): string | null => {
  const preferredRegion = releaseDates?.results.find(
    (item) => item.iso_3166_1 === TMDB_CONFIG.defaultRegion,
  );
  const preferredCertification = preferredRegion?.release_dates.find(
    (item) => item.certification.trim().length > 0,
  )?.certification;

  if (preferredCertification?.trim()) {
    return preferredCertification.trim();
  }

  for (const countryReleaseDates of releaseDates?.results ?? []) {
    const certification = countryReleaseDates.release_dates.find(
      (item) => item.certification.trim().length > 0,
    )?.certification;

    if (certification?.trim()) {
      return certification.trim();
    }
  }

  return isAdult ? '18+' : null;
};

const mapMovieDetailItem = (movie: TmdbMovieDetailResponse): MovieDetailItem => {
  const trailers = (movie.videos?.results ?? [])
    .map(mapVideoItem)
    .filter(
      (video): video is MovieDetailVideoItem => Boolean(video),
    );

  return {
    ageCertification: getAgeCertification(movie.release_dates, movie.adult),
    backdropUrl: tmdbApiClient.buildImageUrl(
      movie.backdrop_path ?? movie.poster_path,
      TMDB_CONFIG.backdropSize,
    ),
    budget: movie.budget > 0 ? movie.budget : null,
    cast: mapCastItems(movie.credits),
    genres: mapDetailGenres(movie.genres),
    homepageUrl: toOptionalTrimmedString(movie.homepage),
    id: String(movie.id),
    images: mapGalleryItems(movie.images),
    language: getLanguageLabel(
      movie.spoken_languages,
      movie.original_language,
    ),
    overview: movie.overview.trim(),
    posterUrl: tmdbApiClient.buildImageUrl(
      movie.poster_path ?? movie.backdrop_path,
      TMDB_CONFIG.posterSize,
    ),
    productionCompanies: movie.production_companies
      .map((company) => company.name.trim())
      .filter((company): company is string => company.length > 0),
    rating: toRating(movie.vote_average),
    recommendations: (movie.recommendations?.results ?? []).map(mapMovieItem),
    releaseDate: movie.release_date,
    releaseYear: toReleaseYear(movie.release_date),
    revenue: movie.revenue > 0 ? movie.revenue : null,
    runtimeMinutes:
      typeof movie.runtime === 'number' && movie.runtime > 0
        ? movie.runtime
        : null,
    similar: (movie.similar?.results ?? []).map(mapMovieItem),
    status: toOptionalTrimmedString(movie.status),
    tagline: movie.tagline.trim(),
    title: movie.title,
    tmdbShareUrl: `https://www.themoviedb.org/movie/${movie.id}`,
    trailer: selectPrimaryTrailer(trailers),
    trailers,
  };
};

class MovieRepository {
  private homeGenreCache: ApiResponse<ReadonlyArray<HomeGenreItem>> | null = null;

  private homeGenreRequest: Promise<ApiResponse<ReadonlyArray<HomeGenreItem>>> | null = null;

  private readonly movieDetailCache = new Map<string, ApiResponse<MovieDetailItem>>();

  private readonly movieDetailRequests = new Map<
    string,
    Promise<ApiResponse<MovieDetailItem>>
  >();

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
    this.homeGenreCache = null;
    this.homeGenreRequest = null;
    this.homeSectionCache.clear();
    this.homeSectionRequests.clear();
  }

  clearMovieDetailCache(movieId?: string): void {
    if (movieId) {
      this.movieDetailCache.delete(movieId);
      this.movieDetailRequests.delete(movieId);

      return;
    }

    this.movieDetailCache.clear();
    this.movieDetailRequests.clear();
  }

  async getHomeGenres(
    options?: Pick<HomeSectionRequestOptions, 'forceRefresh'>,
  ): Promise<ApiResponse<ReadonlyArray<HomeGenreItem>>> {
    if (!options?.forceRefresh && this.homeGenreCache) {
      return this.homeGenreCache;
    }

    if (this.homeGenreRequest) {
      return this.homeGenreRequest;
    }

    const request = (async (): Promise<ApiResponse<ReadonlyArray<HomeGenreItem>>> => {
      const response = await tmdbApiClient.requestPayload<TmdbGenreListResponse>(
        '/genre/movie/list',
        {
          language: TMDB_CONFIG.defaultLanguage,
        },
      );

      if (!response.success) {
        return createErrorResponse(
          response.error ??
            createApiError('TMDB_REQUEST_ERROR', response.message, 500),
          response.message,
        );
      }

      const genres = (response.data?.genres ?? []).map((genre) => ({
        id: String(genre.id),
        label: genre.name,
      }));

      const nextResponse =
        genres.length > 0
          ? createSuccessResponse(
              genres,
              'Movie genres loaded successfully.',
            )
          : createEmptyResponse(
              [],
              APP_STRINGS.home.categoriesEmptyDescription,
            );

      this.homeGenreCache = nextResponse;

      return nextResponse;
    })();

    this.homeGenreRequest = request;

    try {
      return await request;
    } finally {
      this.homeGenreRequest = null;
    }
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

  async getMovieDetails(
    movieId: string,
    options?: MovieDetailRequestOptions,
  ): Promise<ApiResponse<MovieDetailItem>> {
    if (!options?.forceRefresh) {
      const cachedResponse = this.movieDetailCache.get(movieId);

      if (cachedResponse) {
        return cachedResponse;
      }

      const inFlightRequest = this.movieDetailRequests.get(movieId);

      if (inFlightRequest) {
        return inFlightRequest;
      }
    }

    const request = (async (): Promise<ApiResponse<MovieDetailItem>> => {
      const response = await tmdbApiClient.requestPayload<TmdbMovieDetailResponse>(
        `/movie/${movieId}`,
        {
          append_to_response: TMDB_APPEND_TO_RESPONSE,
          include_image_language: TMDB_IMAGE_LANGUAGE,
          language: TMDB_CONFIG.defaultLanguage,
        },
      );

      if (!response.success) {
        return createErrorResponse(
          response.error ??
            createApiError('TMDB_REQUEST_ERROR', response.message, 500),
          response.message,
        );
      }

      if (!response.data) {
        return createEmptyResponse<MovieDetailItem>(
          null,
          'Movie details are unavailable right now.',
        );
      }

      const detailItem = mapMovieDetailItem(response.data);
      const nextResponse = createSuccessResponse(
        detailItem,
        'Movie details loaded successfully.',
      );

      this.movieDetailCache.set(movieId, nextResponse);

      return nextResponse;
    })();

    this.movieDetailRequests.set(movieId, request);

    try {
      return await request;
    } finally {
      this.movieDetailRequests.delete(movieId);
    }
  }
}

export const movieRepository = new MovieRepository();
