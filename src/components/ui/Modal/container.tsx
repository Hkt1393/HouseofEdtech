import React, { memo } from 'react';

import { COMPONENT_DEFAULTS } from '../../../constants';
import { moderateScale } from '../../../utils';

import { createDynamicStyles } from './styles';
import type { BottomSheetProps, ConfirmationDialogProps } from './types';
import { BottomSheetView, ConfirmationDialogView } from './view';

const dynamicStyles = createDynamicStyles(
  moderateScale(COMPONENT_DEFAULTS.modal.sheetMaxWidth),
  moderateScale(COMPONENT_DEFAULTS.modal.dialogMaxWidth),
);

const BottomSheetComponent = (props: BottomSheetProps) => {
  return <BottomSheetView sheetStyle={dynamicStyles.sheet} {...props} />;
};

BottomSheetComponent.displayName = 'BottomSheet';

const ConfirmationDialogComponent = (props: ConfirmationDialogProps) => {
  return <ConfirmationDialogView dialogStyle={dynamicStyles.dialog} {...props} />;
};

ConfirmationDialogComponent.displayName = 'ConfirmationDialog';

export const BottomSheet = memo(BottomSheetComponent);
export const ConfirmationDialog = memo(ConfirmationDialogComponent);
