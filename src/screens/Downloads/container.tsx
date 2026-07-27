import React, { memo } from 'react';

import { DownloadsView } from './view';

const DownloadsContainerComponent = () => {
  return <DownloadsView />;
};

DownloadsContainerComponent.displayName = 'DownloadsContainer';

export const DownloadsContainer = memo(DownloadsContainerComponent);
