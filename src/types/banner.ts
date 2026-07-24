/**
 * Banner contracts used for hero promotions and editorial placements.
 */

import { MediaType } from './common';

import type { ID, Nullable } from './common';

/**
 * Primary action metadata attached to a banner.
 */
export interface BannerAction {
  readonly id: ID;
  readonly label: string;
  readonly deeplink: string;
  readonly analyticsEvent: string;
}

/**
 * Promotional banner rendered in hero or spotlight slots.
 */
export interface Banner {
  readonly id: ID;
  readonly title: string;
  readonly subtitle: Nullable<string>;
  readonly description: Nullable<string>;
  readonly imageUrl: string;
  readonly overlayImageUrl: Nullable<string>;
  readonly badgeLabel: Nullable<string>;
  readonly mediaType: MediaType;
  readonly targetId: ID;
  readonly action: BannerAction;
  readonly sortOrder: number;
}
