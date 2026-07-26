import React, { memo, useCallback, useMemo } from 'react';

import { APP_STRINGS } from '../../../constants';

import { ChipButton } from '../AppButton';
import { Badge, GenreChip } from '../ContentPrimitives';

import type {
  DividerRowProps,
  EmptyLibraryProps,
  GenreChipGroupItem,
  GenreChipGroupProps,
  GenreListProps,
  InformationRowProps,
  MetadataRowItem,
  MetadataRowProps,
  NoInternetBannerProps,
  RatingRowProps,
} from './types';
import {
  DividerRowView,
  EmptyLibraryView,
  GenreChipGroupView,
  GenreListView,
  InformationRowView,
  MetadataRowView,
  NoInternetBannerView,
  RatingRowView,
} from './view';

const GenreListComponent = ({ genres }: GenreListProps) => {
  const renderedGenres = useMemo(
    () =>
      genres.map((genre) => <GenreChip genre={genre} key={genre} />),
    [genres],
  );

  return <GenreListView renderedGenres={renderedGenres} />;
};

GenreListComponent.displayName = 'GenreList';

const GenreChipGroupComponent = ({ items, onSelect }: GenreChipGroupProps) => {
  const handleSelect = useCallback(
    (item: GenreChipGroupItem) => {
      onSelect?.(item);
    },
    [onSelect],
  );

  const renderedItems = useMemo(
    () =>
      items.map((item) => (
        <ChipButton
          accessibilityHint={item.accessibilityHint ?? APP_STRINGS.components.button.chipAccessibilityHint}
          accessibilityLabel={item.accessibilityLabel ?? item.label}
          disabled={item.disabled}
          key={item.id}
          label={item.label}
          onPress={item.onPress ?? (onSelect ? () => handleSelect(item) : undefined)}
          selected={item.selected}
        />
      )),
    [handleSelect, items, onSelect],
  );

  return <GenreChipGroupView renderedItems={renderedItems} />;
};

GenreChipGroupComponent.displayName = 'GenreChipGroup';

const RatingRowComponent = (props: RatingRowProps) => <RatingRowView {...props} />;

RatingRowComponent.displayName = 'RatingRow';

const MetadataRowComponent = ({ items, wrap }: MetadataRowProps) => {
  const renderedItems = useMemo(
    () =>
      items.map((item: MetadataRowItem) => (
        <Badge
          key={item.id}
          label={item.label}
          leadingIcon={item.leadingIcon}
          tone={item.tone}
          variant={item.variant}
        />
      )),
    [items],
  );

  return <MetadataRowView renderedItems={renderedItems} wrap={wrap} />;
};

MetadataRowComponent.displayName = 'MetadataRow';

const InformationRowComponent = (props: InformationRowProps) => (
  <InformationRowView {...props} />
);

InformationRowComponent.displayName = 'InformationRow';

const DividerRowComponent = (props: DividerRowProps) => <DividerRowView {...props} />;

DividerRowComponent.displayName = 'DividerRow';

const EmptyLibraryComponent = (props: EmptyLibraryProps) => <EmptyLibraryView {...props} />;

EmptyLibraryComponent.displayName = 'EmptyLibrary';

const NoInternetBannerComponent = (props: NoInternetBannerProps) => (
  <NoInternetBannerView {...props} />
);

NoInternetBannerComponent.displayName = 'NoInternetBanner';

export const GenreList = memo(GenreListComponent);
export const GenreChipGroup = memo(GenreChipGroupComponent);
export const RatingRow = memo(RatingRowComponent);
export const MetadataRow = memo(MetadataRowComponent);
export const InformationRow = memo(InformationRowComponent);
export const DividerRow = memo(DividerRowComponent);
export const EmptyLibrary = memo(EmptyLibraryComponent);
export const NoInternetBanner = memo(NoInternetBannerComponent);
