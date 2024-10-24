
export const isSmallScreen = (): boolean => document.body.clientWidth < 767;

export interface IDesktop {
  isDesktop: boolean;
}