/**
 * Reusable regular expression constants.
 */

export const REGEX_PATTERNS = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,64}$/,
  phone: /^\+?[1-9]\d{7,14}$/,
  username: /^(?![._])(?!.*[._]{2})[A-Za-z0-9._]{3,24}(?<![._])$/,
  specialCharacter: /[^A-Za-z0-9]/,
  number: /\d/,
} as const;
