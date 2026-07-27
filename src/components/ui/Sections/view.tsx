import React, { memo } from 'react';

import { COMPONENT_DEFAULTS } from '../../../constants';

import { AppText, AppView } from '../../base';
import { Card, Section, Stack } from '../../layout';
import { Avatar } from '../ContentPrimitives';
import {
  CategoryCarousel,
  ContentCarousel,
  ContinueWatchingCarousel,
  EpisodeCarousel,
  MovieCarousel,
  RecommendationCarousel,
} from '../Carousels';
import { FeaturedMovieCard } from '../Cards';

import { styles } from './styles';
import type {
  CastSectionProps,
  CategorySectionProps,
  ContinueWatchingSectionProps,
  EpisodesSectionProps,
  FeaturedSectionProps,
  RecommendationSectionProps,
  RelatedSectionProps,
  SectionHeaderProps,
  TrendingSectionProps,
} from './types';

const SectionHeaderViewComponent = ({
  actionLabel,
  headerAccessory,
  onActionPress,
  subtitle,
  title,
}: SectionHeaderProps) => {
  return (
    <AppView row alignItems="center" gap="md">
      <Stack gap="xs" style={styles.titleGroup}>
        <AppText variant="title">{title}</AppText>
        {subtitle ? <AppText colorToken="textSecondary">{subtitle}</AppText> : null}
      </Stack>
      {headerAccessory}
      {actionLabel && onActionPress ? (
        <AppView
          accessibilityLabel={actionLabel}
          accessibilityRole="button"
          onPress={onActionPress}
          paddingVertical="xs"
          style={styles.action}
        >
          <AppText colorToken="primary" variant="label">
            {actionLabel}
          </AppText>
        </AppView>
      ) : null}
    </AppView>
  );
};

SectionHeaderViewComponent.displayName = 'SectionHeaderView';

const CategorySectionViewComponent = ({
  actionLabel,
  categories,
  headerAccessory,
  onActionPress,
  onCategoryPress,
  subtitle,
  title,
  ...restProps
}: CategorySectionProps) => {
  return (
    <Section
      actionLabel={actionLabel}
      headerAccessory={headerAccessory}
      onActionPress={onActionPress}
      subtitle={subtitle}
      title={title}
    >
      <CategoryCarousel categories={categories} onCategoryPress={onCategoryPress} {...restProps} />
    </Section>
  );
};

CategorySectionViewComponent.displayName = 'CategorySectionView';

const TrendingSectionViewComponent = ({
  actionLabel,
  headerAccessory,
  movies,
  onActionPress,
  onMoviePress,
  subtitle,
  title,
  ...restProps
}: TrendingSectionProps) => {
  return (
    <Section
      actionLabel={actionLabel}
      headerAccessory={headerAccessory}
      onActionPress={onActionPress}
      subtitle={subtitle}
      title={title}
    >
      <MovieCarousel movies={movies} onMoviePress={onMoviePress} {...restProps} />
    </Section>
  );
};

TrendingSectionViewComponent.displayName = 'TrendingSectionView';

const FeaturedSectionViewComponent = ({
  actionLabel,
  headerAccessory,
  items,
  onActionPress,
  onItemPress,
  subtitle,
  title,
}: FeaturedSectionProps) => {
  return (
    <Section
      actionLabel={actionLabel}
      headerAccessory={headerAccessory}
      onActionPress={onActionPress}
      subtitle={subtitle}
      title={title}
    >
      <ContentCarousel
        data={items}
        itemWidth={COMPONENT_DEFAULTS.media.thumbnailWidth}
        keyExtractor={(item) => item.id ?? item.accessibilityLabel ?? item.title}
        renderItem={(item, index) => (
          <FeaturedMovieCard
            {...item}
            onPress={item.onPress ?? (onItemPress ? () => onItemPress(item, index) : undefined)}
          />
        )}
      />
    </Section>
  );
};

FeaturedSectionViewComponent.displayName = 'FeaturedSectionView';

const ContinueWatchingSectionViewComponent = ({
  actionLabel,
  headerAccessory,
  items,
  onActionPress,
  onItemPress,
  subtitle,
  title,
  ...restProps
}: ContinueWatchingSectionProps) => {
  return (
    <Section
      actionLabel={actionLabel}
      headerAccessory={headerAccessory}
      onActionPress={onActionPress}
      subtitle={subtitle}
      title={title}
    >
      <ContinueWatchingCarousel items={items} onItemPress={onItemPress} {...restProps} />
    </Section>
  );
};

ContinueWatchingSectionViewComponent.displayName = 'ContinueWatchingSectionView';

const RecommendationSectionViewComponent = ({
  actionLabel,
  headerAccessory,
  items,
  onActionPress,
  onItemPress,
  subtitle,
  title,
  ...restProps
}: RecommendationSectionProps) => {
  return (
    <Section
      actionLabel={actionLabel}
      headerAccessory={headerAccessory}
      onActionPress={onActionPress}
      subtitle={subtitle}
      title={title}
    >
      <RecommendationCarousel items={items} onItemPress={onItemPress} {...restProps} />
    </Section>
  );
};

RecommendationSectionViewComponent.displayName = 'RecommendationSectionView';

const EpisodesSectionViewComponent = ({
  actionLabel,
  episodes,
  headerAccessory,
  onActionPress,
  onEpisodePress,
  subtitle,
  title,
  ...restProps
}: EpisodesSectionProps) => {
  return (
    <Section
      actionLabel={actionLabel}
      headerAccessory={headerAccessory}
      onActionPress={onActionPress}
      subtitle={subtitle}
      title={title}
    >
      <EpisodeCarousel episodes={episodes} onEpisodePress={onEpisodePress} {...restProps} />
    </Section>
  );
};

EpisodesSectionViewComponent.displayName = 'EpisodesSectionView';

const CastSectionViewComponent = ({
  actionLabel,
  headerAccessory,
  members,
  onActionPress,
  onMemberPress,
  subtitle,
  title,
}: CastSectionProps) => {
  return (
    <Section
      actionLabel={actionLabel}
      headerAccessory={headerAccessory}
      onActionPress={onActionPress}
      subtitle={subtitle}
      title={title}
    >
      <ContentCarousel
        data={members}
        itemWidth={COMPONENT_DEFAULTS.media.posterWidth}
        keyExtractor={(item) => item.id}
        renderItem={(item, index) => (
          <Card
            accessibilityLabel={item.name}
            accessibilityRole={item.onPress || onMemberPress ? 'button' : undefined}
            bordered={false}
            gap="sm"
            key={item.id}
            onPress={item.onPress ?? (onMemberPress ? () => onMemberPress(item, index) : undefined)}
            padding="md"
            style={styles.castCard}
            variant="secondary"
          >
            <Avatar
              fallbackLabel={item.avatarLabel ?? item.name}
              imageUrl={item.imageUrl}
              size="xl"
            />
            <Stack gap="xs">
              <AppText numberOfLines={1} variant="label">
                {item.name}
              </AppText>
              {item.subtitle ? (
                <AppText colorToken="textSecondary" numberOfLines={2} variant="caption">
                  {item.subtitle}
                </AppText>
              ) : null}
            </Stack>
          </Card>
        )}
      />
    </Section>
  );
};

CastSectionViewComponent.displayName = 'CastSectionView';

const RelatedSectionViewComponent = (props: RelatedSectionProps) => {
  return <RecommendationSectionViewComponent {...props} />;
};

RelatedSectionViewComponent.displayName = 'RelatedSectionView';

export const SectionHeaderView = memo(SectionHeaderViewComponent);
export const CategorySectionView = memo(CategorySectionViewComponent);
export const TrendingSectionView = memo(TrendingSectionViewComponent);
export const FeaturedSectionView = memo(FeaturedSectionViewComponent);
export const ContinueWatchingSectionView = memo(ContinueWatchingSectionViewComponent);
export const RecommendationSectionView = memo(RecommendationSectionViewComponent);
export const EpisodesSectionView = memo(EpisodesSectionViewComponent);
export const CastSectionView = memo(CastSectionViewComponent);
export const RelatedSectionView = memo(RelatedSectionViewComponent);
