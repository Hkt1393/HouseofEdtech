import React, { memo } from 'react';

import type {
  EpisodeSelectorProps,
  PlayButtonProps,
  PlayerControlsProps,
  SeasonSelectorProps,
} from './types';
import {
  EpisodeSelectorView,
  PlayButtonView,
  PlayerControlsView,
  SeasonSelectorView,
} from './view';

const PlayButtonComponent = (props: PlayButtonProps) => <PlayButtonView {...props} />;
PlayButtonComponent.displayName = 'PlayButton';

const PlayerControlsComponent = (props: PlayerControlsProps) => (
  <PlayerControlsView {...props} />
);
PlayerControlsComponent.displayName = 'PlayerControls';

const SeasonSelectorComponent = (props: SeasonSelectorProps) => (
  <SeasonSelectorView {...props} />
);
SeasonSelectorComponent.displayName = 'SeasonSelector';

const EpisodeSelectorComponent = (props: EpisodeSelectorProps) => (
  <EpisodeSelectorView {...props} />
);
EpisodeSelectorComponent.displayName = 'EpisodeSelector';

export const PlayButton = memo(PlayButtonComponent);
export const PlayerControls = memo(PlayerControlsComponent);
export const SeasonSelector = memo(SeasonSelectorComponent);
export const EpisodeSelector = memo(EpisodeSelectorComponent);
