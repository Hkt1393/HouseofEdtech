const colorTokens = [
  'background',
  'surface',
  'surfaceDim',
  'surfaceBright',
  'surfaceLowest',
  'surfaceLow',
  'surfaceSecondary',
  'surfaceHigh',
  'surfaceHighest',
  'surfaceVariant',
  'card',
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'primaryFixed',
  'primaryFixedDim',
  'onPrimaryFixed',
  'onPrimaryFixedVariant',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'secondaryFixed',
  'secondaryFixedDim',
  'onSecondaryFixed',
  'onSecondaryFixedVariant',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'tertiaryFixed',
  'tertiaryFixedDim',
  'onTertiaryFixed',
  'onTertiaryFixedVariant',
  'accent',
  'success',
  'successContainer',
  'onSuccess',
  'warning',
  'warningContainer',
  'onWarning',
  'error',
  'errorContainer',
  'onError',
  'info',
  'infoContainer',
  'onInfo',
  'inverseSurface',
  'inversePrimary',
  'border',
  'divider',
  'overlay',
  'shadow',
  'glassOverlay',
  'heroOverlay',
  'textPrimary',
  'textSecondary',
  'textTertiary',
  'textInverse',
  'iconPrimary',
  'iconSecondary',
  'navigationBackground',
  'surfaceTint',
  'white',
  'black',
  'transparent',
];

const spacingTokens = [
  'none',
  'unit',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  'gutterCompact',
  'gutter',
  'sectionGap',
  'containerMarginMobile',
  'containerMargin',
  'containerMarginDesktop',
  'safeAreaBuffer',
];

const radiusTokens = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];

const semanticColors = Object.fromEntries(
  colorTokens.map((token) => [token, `var(--color-${token})`]),
);

const semanticSpacing = Object.fromEntries(
  spacingTokens.map((token) => [token, `var(--spacing-${token})`]),
);

const semanticRadius = Object.fromEntries(
  radiusTokens.map((token) => [token, `var(--radius-${token})`]),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./App.tsx', './index.ts', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: semanticColors,
      spacing: semanticSpacing,
      borderRadius: semanticRadius,
      fontFamily: {
        body: ['var(--font-family-body)'],
        heading: ['var(--font-family-heading)'],
        mono: ['var(--font-family-mono)'],
      },
      fontSize: {
        display: [
          'var(--font-size-display)',
          {
            lineHeight: 'var(--line-height-display)',
            letterSpacing: 'var(--letter-spacing-display)',
          },
        ],
        'display-mobile': [
          'var(--font-size-displayMobile)',
          {
            lineHeight: 'var(--line-height-displayMobile)',
            letterSpacing: 'var(--letter-spacing-displayMobile)',
          },
        ],
        'hero-display': [
          'var(--font-size-heroDisplay)',
          {
            lineHeight: 'var(--line-height-heroDisplay)',
            letterSpacing: 'var(--letter-spacing-heroDisplay)',
          },
        ],
        'hero-display-mobile': [
          'var(--font-size-heroDisplayMobile)',
          {
            lineHeight: 'var(--line-height-heroDisplayMobile)',
            letterSpacing: 'var(--letter-spacing-heroDisplayMobile)',
          },
        ],
        headline: [
          'var(--font-size-headline)',
          {
            lineHeight: 'var(--line-height-headline)',
            letterSpacing: 'var(--letter-spacing-headline)',
          },
        ],
        'headline-compact': [
          'var(--font-size-headlineCompact)',
          {
            lineHeight: 'var(--line-height-headlineCompact)',
            letterSpacing: 'var(--letter-spacing-headlineCompact)',
          },
        ],
        title: [
          'var(--font-size-title)',
          {
            lineHeight: 'var(--line-height-title)',
            letterSpacing: 'var(--letter-spacing-title)',
          },
        ],
        subtitle: [
          'var(--font-size-subtitle)',
          {
            lineHeight: 'var(--line-height-subtitle)',
            letterSpacing: 'var(--letter-spacing-subtitle)',
          },
        ],
        body: [
          'var(--font-size-body)',
          {
            lineHeight: 'var(--line-height-body)',
            letterSpacing: 'var(--letter-spacing-body)',
          },
        ],
        'body-large': [
          'var(--font-size-bodyLarge)',
          {
            lineHeight: 'var(--line-height-bodyLarge)',
            letterSpacing: 'var(--letter-spacing-bodyLarge)',
          },
        ],
        'body-small': [
          'var(--font-size-bodySmall)',
          {
            lineHeight: 'var(--line-height-bodySmall)',
            letterSpacing: 'var(--letter-spacing-bodySmall)',
          },
        ],
        label: [
          'var(--font-size-label)',
          {
            lineHeight: 'var(--line-height-label)',
            letterSpacing: 'var(--letter-spacing-label)',
          },
        ],
        caption: [
          'var(--font-size-caption)',
          {
            lineHeight: 'var(--line-height-caption)',
            letterSpacing: 'var(--letter-spacing-caption)',
          },
        ],
        overline: [
          'var(--font-size-overline)',
          {
            lineHeight: 'var(--line-height-overline)',
            letterSpacing: 'var(--letter-spacing-overline)',
          },
        ],
        metadata: [
          'var(--font-size-metadata)',
          {
            lineHeight: 'var(--line-height-metadata)',
            letterSpacing: 'var(--letter-spacing-metadata)',
          },
        ],
      },
    },
  },
  plugins: [],
};
