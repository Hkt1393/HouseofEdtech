/**
 * Reusable artificial delay helpers for the mock API layer.
 */

import { API_CONFIG } from '../../constants';

export const DELAY_PRESETS = {
  short: 200,
  medium: 500,
  standard: API_CONFIG.mockDelayMs,
  extended: 1200,
} as const;

export type DelayDuration = (typeof DELAY_PRESETS)[keyof typeof DELAY_PRESETS];

/**
 * Awaits a configured artificial delay.
 */
export const delay = async (
  delayMs: DelayDuration = DELAY_PRESETS.standard,
): Promise<void> => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });
};
