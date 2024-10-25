
export const isSmallScreen = (): boolean => document.body.clientWidth < 767;

export interface IDesktop {
  isDesktop: boolean;
}

export const NO_MOTION_PREFERENCE_QUERY =
  "(prefers-reduced-motion: no-preference)";