/**
 * Public props for reusable modal components.
 */

import type { ReactNode } from 'react';

export interface BottomSheetProps {
  children?: ReactNode;
  description?: string;
  footer?: ReactNode;
  onClose?: () => void;
  title?: string;
  visible: boolean;
}

export interface ConfirmationDialogProps {
  cancelLabel?: string;
  confirmLabel?: string;
  description: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  title: string;
  visible: boolean;
}
