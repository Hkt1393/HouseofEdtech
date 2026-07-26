import React, { memo } from 'react';

import { AppFlatList, AppScrollView } from '../../base';
import { Row } from '../../layout';
import { EpisodeCard } from '../Cards';
import { IconButton, PrimaryButton, SegmentButton } from '../AppButton';

import { styles } from './styles';
import type {
  EpisodeSelectorProps,
  PlayButtonProps,
  PlayerControlsProps,
  SeasonOption,
  SeasonSelectorProps,
} from './types';

const PlayButtonViewComponent = ({
  accessibilityHint,
  accessibilityLabel,
  label,
  onPress,
}: PlayButtonProps) => {
  return (
    <PrimaryButton
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel ?? label}
      label={label}
      onPress={onPress}
    />
  );
};

PlayButtonViewComponent.displayName = 'PlayButtonView';

const PlayerControlsViewComponent = ({
  leadingActions,
  onPrimaryAction,
  primaryActionLabel,
  trailingActions,
}: PlayerControlsProps) => {
  return (
    <Row alignItems="center" gap="sm" justifyContent="space-between" style={styles.controls}>
      <Row gap="sm">
        {leadingActions?.map((action) => (
          <IconButton
            accessibilityHint={action.accessibilityHint}
            accessibilityLabel={action.accessibilityLabel}
            icon={action.icon}
            key={action.id}
            onPress={action.onPress}
            selected={action.selected}
          />
        ))}
      </Row>
      {primaryActionLabel ? (
        <PlayButtonViewComponent label={primaryActionLabel} onPress={onPrimaryAction} />
      ) : null}
      <Row gap="sm">
        {trailingActions?.map((action) => (
          <IconButton
            accessibilityHint={action.accessibilityHint}
            accessibilityLabel={action.accessibilityLabel}
            icon={action.icon}
            key={action.id}
            onPress={action.onPress}
            selected={action.selected}
          />
        ))}
      </Row>
    </Row>
  );
};

PlayerControlsViewComponent.displayName = 'PlayerControlsView';

const SeasonSelectorViewComponent = ({ onSelect, seasons }: SeasonSelectorProps) => {
  return (
    <AppScrollView horizontal contentGap="sm" showsHorizontalScrollIndicator={false}>
      {seasons.map((season: SeasonOption) => (
        <SegmentButton
          accessibilityLabel={season.label}
          key={season.id}
          label={season.label}
          onPress={onSelect ? () => onSelect(season) : undefined}
          selected={season.selected}
        />
      ))}
    </AppScrollView>
  );
};

SeasonSelectorViewComponent.displayName = 'SeasonSelectorView';

const EpisodeSelectorViewComponent = ({ episodes, onEpisodePress }: EpisodeSelectorProps) => {
  return (
    <AppFlatList
      contentGap="sm"
      data={episodes}
      renderItem={({ index, item }) => (
        <EpisodeCard
          {...item}
          onPress={item.onPress ?? (onEpisodePress ? () => onEpisodePress(item, index) : undefined)}
        />
      )}
    />
  );
};

EpisodeSelectorViewComponent.displayName = 'EpisodeSelectorView';

export const PlayButtonView = memo(PlayButtonViewComponent);
export const PlayerControlsView = memo(PlayerControlsViewComponent);
export const SeasonSelectorView = memo(SeasonSelectorViewComponent);
export const EpisodeSelectorView = memo(EpisodeSelectorViewComponent);
