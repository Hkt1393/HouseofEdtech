/**
 * Minimal TMDB API client for catalog read operations.
 */

import { API_CONFIG, APP_STRINGS, TMDB_CONFIG } from '../../constants';

import type { ApiResponse, PaginationMeta, TmdbErrorResponse, TmdbListResponse } from '../../types';

import { createApiError, createNetworkError } from './errors';
import {
  createEmptyResponse,
  createErrorResponse,
  createSuccessResponse,
} from './response';

type TmdbQueryValue = boolean | number | string | null | undefined;

interface TmdbRequestOptions {
  readonly path: string;
  readonly query?: Readonly<Record<string, TmdbQueryValue>>;
  readonly successMessage: string;
  readonly emptyMessage: string;
}

interface TmdbCollectionRequestOptions<TItem, TResult> extends TmdbRequestOptions {
  readonly mapItem: (item: TItem) => TResult;
}

interface TmdbCredentials {
  readonly accessToken?: string;
  readonly apiKey?: string;
}

const getTmdbCredentials = (): TmdbCredentials => ({
  accessToken: process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN,
  apiKey: process.env.EXPO_PUBLIC_TMDB_API_KEY,
});

const createTmdbPaginationMeta = <TItem>(
  payload: TmdbListResponse<TItem>,
): PaginationMeta => ({
  hasNextPage: payload.page < payload.total_pages,
  hasPreviousPage: payload.page > TMDB_CONFIG.homeInitialPage,
  page: payload.page,
  pageSize: payload.results.length,
  totalItems: payload.total_results,
  totalPages: payload.total_pages,
});

const getTmdbConfigurationError = () =>
  createApiError(
    'TMDB_CONFIGURATION_ERROR',
    APP_STRINGS.errors.tmdbConfigurationDescription,
    500,
  );

const buildQueryString = (
  credentials: TmdbCredentials,
  query: Readonly<Record<string, TmdbQueryValue>> = {},
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });

  if (!credentials.accessToken && credentials.apiKey) {
    searchParams.set('api_key', credentials.apiKey);
  }

  return searchParams.toString();
};

class TmdbApiClient {
  private async fetchJson<TPayload>(
    path: string,
    query?: Readonly<Record<string, TmdbQueryValue>>,
  ): Promise<ApiResponse<TPayload>> {
    const credentials = getTmdbCredentials();

    if (!credentials.accessToken && !credentials.apiKey) {
      return createErrorResponse(getTmdbConfigurationError());
    }

    const queryString = buildQueryString(credentials, query);
    const requestUrl = `${TMDB_CONFIG.apiBaseUrl}${path}${queryString ? `?${queryString}` : ''}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, API_CONFIG.requestTimeoutMs);

    try {
      const response = await fetch(requestUrl, {
        headers: {
          accept: 'application/json',
          ...(credentials.accessToken
            ? {
                Authorization: `Bearer ${credentials.accessToken}`,
              }
            : undefined),
        },
        method: 'GET',
        signal: controller.signal,
      });

      const payload = (await response.json().catch(() => null)) as
        | TPayload
        | TmdbErrorResponse
        | null;

      if (!response.ok) {
        const errorPayload = payload as TmdbErrorResponse | null;

        return createErrorResponse(
          createApiError(
            response.status === 401
              ? 'TMDB_AUTHENTICATION_ERROR'
              : 'TMDB_REQUEST_ERROR',
            errorPayload?.status_message ?? 'TMDB request failed.',
            response.status,
          ),
        );
      }

      return createSuccessResponse(payload as TPayload, 'TMDB request completed.');
    } catch (error) {
      const isAbortError =
        error instanceof Error && error.name === 'AbortError';

      if (isAbortError) {
        return createErrorResponse(
          createApiError(
            'TMDB_TIMEOUT',
            'The TMDB request timed out.',
            504,
          ),
        );
      }

      return createErrorResponse(createNetworkError());
    } finally {
      clearTimeout(timeout);
    }
  }

  async requestCollection<TItem, TResult>({
    emptyMessage,
    mapItem,
    path,
    query,
    successMessage,
  }: TmdbCollectionRequestOptions<TItem, TResult>): Promise<
    ApiResponse<ReadonlyArray<TResult>>
  > {
    const response = await this.fetchJson<TmdbListResponse<TItem>>(path, query);

    if (!response.success) {
      return createErrorResponse(
        response.error ??
          createApiError('TMDB_REQUEST_ERROR', response.message, 500),
        response.message,
      );
    }

    if (!response.data) {
      return createEmptyResponse([], emptyMessage);
    }

    const items = response.data.results.map(mapItem);
    const meta = createTmdbPaginationMeta(response.data);

    if (items.length === 0) {
      return createEmptyResponse([], emptyMessage, meta);
    }

    return createSuccessResponse(items, successMessage, meta);
  }

  buildImageUrl(
    imagePath: string | null | undefined,
    size: typeof TMDB_CONFIG.backdropSize | typeof TMDB_CONFIG.posterSize,
  ): string {
    if (!imagePath) {
      return '';
    }

    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    return `${TMDB_CONFIG.imageBaseUrl}/${size}${imagePath}`;
  }
}

export const tmdbApiClient = new TmdbApiClient();
