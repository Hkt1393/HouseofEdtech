/**
 * Public props for reusable loader affordances.
 */

export interface PullToRefreshProps {
  isRefreshing?: boolean;
  label?: string;
  onRefresh?: () => void;
}

export interface InfiniteLoaderProps {
  errorMessage?: string;
  hasMore?: boolean;
  isLoading?: boolean;
  label?: string;
  onRetry?: () => void;
}
