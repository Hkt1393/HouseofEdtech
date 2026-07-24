/**
 * Repository for search, suggestions, and search-history data access.
 */

import { PAGINATION_CONFIG, VALIDATION_RULES } from '../../constants';
import type {
  ApiResponse,
  SearchHistory,
  SearchResult,
  SearchSuggestion,
  TrendingSearch,
} from '../../types';

import { mockApiClient, type PaginatedRequestOptions } from '../api';
import {
  getMockRecentSearches,
  getMockSearchResults,
  getMockSearchSuggestions,
  getMockTrendingSearches,
} from '../mock';

const normalizeQuery = (query: string): string => {
  return query.trim().slice(0, VALIDATION_RULES.search.maxQueryLength).toLowerCase();
};

const getFilteredSearchResults = (query: string): ReadonlyArray<SearchResult> => {
  const normalizedQuery = normalizeQuery(query);

  if (normalizedQuery.length < VALIDATION_RULES.search.minQueryLength) {
    return [];
  }

  return getMockSearchResults()
    .filter((result) => {
      const searchableText = [
        result.title,
        result.subtitle ?? '',
        ...result.genres,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    })
    .sort((left, right) => right.matchScore - left.matchScore);
};

const getFilteredSuggestions = (query: string): ReadonlyArray<SearchSuggestion> => {
  const normalizedQuery = normalizeQuery(query);
  const suggestions = getMockSearchSuggestions();

  if (normalizedQuery.length < VALIDATION_RULES.search.minQueryLength) {
    return suggestions.slice(0, VALIDATION_RULES.search.maxSuggestions);
  }

  return suggestions
    .filter((suggestion) =>
      suggestion.label.toLowerCase().includes(normalizedQuery),
    )
    .slice(0, VALIDATION_RULES.search.maxSuggestions);
};

class SearchRepository {
  /**
   * Returns paginated search results for a query string.
   */
  async searchMovies(
    query: string,
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<SearchResult>>> {
    const searchResults = getFilteredSearchResults(query);

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No search results matched the current query.',
      pageSize: options?.pageSize ?? PAGINATION_CONFIG.searchPageSize,
      source: () => searchResults,
      successMessage: 'Search results loaded successfully.',
    });
  }

  /**
   * Returns trending search queries for the discovery experience.
   */
  async getTrendingSearches(
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<TrendingSearch>>> {
    const trendingSearches = getMockTrendingSearches();

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No trending searches are available.',
      pageSize:
        options?.pageSize ??
        (trendingSearches.length || VALIDATION_RULES.search.maxSuggestions),
      source: () => trendingSearches,
      successMessage: 'Trending searches loaded successfully.',
    });
  }

  /**
   * Returns type-ahead suggestions for an optional query string.
   */
  async getSuggestions(
    query: string = '',
    options?: PaginatedRequestOptions,
  ): Promise<ApiResponse<ReadonlyArray<SearchSuggestion>>> {
    const suggestions = getFilteredSuggestions(query);

    return mockApiClient.requestCollection({
      ...options,
      emptyMessage: 'No search suggestions are available.',
      pageSize: options?.pageSize ?? VALIDATION_RULES.search.maxSuggestions,
      source: () => suggestions,
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
