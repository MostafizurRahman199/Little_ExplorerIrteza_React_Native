export const fontSize = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 26,
  xl: 34,
  xxl: 44,
  hero: 56,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

export const typography = {
  fontSize,
  fontWeight,
  animationDuration: {
    fast: 150,
    normal: 300,
    slow: 500,
    bounce: 400,
  },
};

export type TypographyType = typeof typography;
