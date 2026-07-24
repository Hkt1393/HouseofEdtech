/**
 * Shared motion tokens for timing, easing, and spring behavior.
 */

import { Easing } from 'react-native';

import type { ThemeAnimation } from '../types';

export const animation = {
  duration: {
    instant: 0,
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
  },
  easing: {
    linear: Easing.linear,
    standard: Easing.inOut(Easing.ease),
    decelerate: Easing.out(Easing.cubic),
    accelerate: Easing.in(Easing.cubic),
    emphasized: Easing.bezier(0.2, 0, 0, 1),
  },
  spring: {
    gentle: {
      damping: 20,
      mass: 1,
      stiffness: 140,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
    standard: {
      damping: 18,
      mass: 1,
      stiffness: 180,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
    snappy: {
      damping: 16,
      mass: 1,
      stiffness: 220,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  },
  timing: {
    fast: {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    },
    standard: {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    },
    slow: {
      duration: 350,
      easing: Easing.bezier(0.2, 0, 0, 1),
    },
  },
} as const satisfies ThemeAnimation;
