import React, { memo } from 'react';

import type { EmptyViewProps, ErrorViewProps, LoadingViewProps } from './types';
import {
  EmptyView as EmptyViewContent,
  ErrorView as ErrorViewContent,
  LoadingView as LoadingViewContent,
} from './view';

const LoadingViewComponent = (props: LoadingViewProps) => <LoadingViewContent {...props} />;
LoadingViewComponent.displayName = 'LoadingViewContainer';

const EmptyViewComponent = (props: EmptyViewProps) => <EmptyViewContent {...props} />;
EmptyViewComponent.displayName = 'EmptyViewContainer';

const ErrorViewComponent = (props: ErrorViewProps) => <ErrorViewContent {...props} />;
ErrorViewComponent.displayName = 'ErrorViewContainer';

export const LoadingView = memo(LoadingViewComponent);
export const EmptyView = memo(EmptyViewComponent);
export const ErrorView = memo(ErrorViewComponent);
