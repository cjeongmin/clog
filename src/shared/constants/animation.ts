export const SCROLL_CONFIG = {
  SCROLL_THRESHOLD: 16,
  HIDE_THRESHOLD: 100,
  HEADER_OFFSET: 60,
} as const;

export const ANIMATION_CONFIG = {
  DURATIONS: {
    FAST: 200,
    MEDIUM: 300,
    SLOW: 500,
  },
  EASINGS: {
    IN_OUT: 'ease-in-out',
    OUT: 'ease-out',
  },
  CSS_VARS: {
    DURATION_FAST: 'var(--duration-fast)',
    DURATION_MEDIUM: 'var(--duration-medium)',
    DURATION_SLOW: 'var(--duration-slow)',
    EASING_IN_OUT: 'var(--easing-in-out)',
    EASING_OUT: 'var(--easing-out)',
  },
} as const;
