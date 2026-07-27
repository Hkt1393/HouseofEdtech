/**
 * Public props for feature-level downloads components.
 */

import type { SemanticTone } from '../shared';

export interface DownloadStatusProps {
  label: string;
  tone?: SemanticTone;
}

export interface DownloadProgressProps {
  label?: string;
  progress: number;
  subtitle?: string;
  trailingLabel?: string;
}

export interface StorageSegment {
  id: string;
  label: string;
  tone?: SemanticTone;
  value: number;
}

export interface StorageCardProps {
  actionLabel?: string;
  availableLabel?: string;
  onAction?: () => void;
  segments: readonly StorageSegment[];
  title: string;
  usedLabel?: string;
}
