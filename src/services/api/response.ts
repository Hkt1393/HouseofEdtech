/**
 * Standardized response builders for the mock API layer.
 */

import { PAGINATION_CONFIG } from '../../constants';

import type {
  ApiError,
  ApiResponse,
  ErrorResponse,
  Nullable,
  PaginatedResponse,
  PaginationMeta,
  SuccessResponse,
} from '../../types';

const getTimestamp = (): string => new Date().toISOString();

/**
 * Builds pagination metadata from page arguments.
 */
export const createPaginationMeta = (
  page: number,
  pageSize: number,
  totalItems: number,
): PaginationMeta => {
  const totalPages =
    totalItems === 0 ? 0 : Math.ceil(totalItems / Math.max(pageSize, 1));

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: totalPages > 0 && page < totalPages,
    hasPreviousPage: page > PAGINATION_CONFIG.initialPage && totalPages > 0,
  };
};

/**
 * Creates a success response envelope.
 */
export const createSuccessResponse = <TData>(
  data: TData,
  message: string,
  meta?: PaginationMeta,
): SuccessResponse<TData> => ({
  success: true,
  data,
  message,
  timestamp: getTimestamp(),
  meta,
});

/**
 * Creates a successful empty response envelope.
 */
export const createEmptyResponse = <TData>(
  data: Nullable<TData>,
  message: string,
  meta?: PaginationMeta,
): ApiResponse<TData> => ({
  success: true,
  data,
  message,
  timestamp: getTimestamp(),
  meta,
});

/**
 * Creates an error response envelope.
 */
export const createErrorResponse = (
  error: ApiError,
  message: string = error.message,
): ErrorResponse => ({
  success: false,
  data: null,
  message,
  timestamp: getTimestamp(),
  error,
});

/**
 * Creates a paginated success response envelope.
 */
export const createPaginatedResponse = <TItem>(
  items: ReadonlyArray<TItem>,
  message: string,
  page: number,
  pageSize: number,
  totalItems: number,
): PaginatedResponse<TItem> => {
  const meta = createPaginationMeta(page, pageSize, totalItems);

  return {
    ...createSuccessResponse(items, message, meta),
    meta,
  };
};

/**
 * Paginates a readonly collection.
 */
export const paginateItems = <TItem>(
  items: ReadonlyArray<TItem>,
  page: number,
  pageSize: number,
): ReadonlyArray<TItem> => {
  const safePage = Math.max(page, PAGINATION_CONFIG.initialPage);
  const safePageSize = Math.max(pageSize, 1);
  const startIndex = (safePage - PAGINATION_CONFIG.initialPage) * safePageSize;

  return items.slice(startIndex, startIndex + safePageSize);
};
