/**
 * Shared validation rule constants.
 */

export const VALIDATION_RULES = {
  auth: {
    emailMaxLength: 320,
    passwordMinLength: 8,
    passwordMaxLength: 64,
    otpLength: 6,
  },
  profile: {
    fullNameMinLength: 2,
    fullNameMaxLength: 60,
    usernameMinLength: 3,
    usernameMaxLength: 24,
  },
  search: {
    minQueryLength: 2,
    maxQueryLength: 50,
    maxRecentItems: 10,
    maxSuggestions: 8,
  },
  downloads: {
    maxConcurrentDownloads: 3,
  },
} as const;
