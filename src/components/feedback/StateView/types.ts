/**
 * Public props for reusable state views.
 */

import type { ReactNode } from 'react';

export interface LoadingViewProps {
  description?: string;
  title?: string;
}

export interface EmptyViewProps {
  actionLabel?: string;
  description?: string;
  illustration?: ReactNode;
  onAction?: () => void;
  title?: string;
}

export interface ErrorViewProps {
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  title?: string;
}
