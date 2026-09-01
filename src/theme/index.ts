import { colors } from './colors';
import { spacing } from './spacing';
import { typography, fontSize, fontWeight } from './typography';
import { radius } from './radius';
import { shadows } from './shadows';

export const theme = {
  colors,
  spacing,
  typography,
  fontSize,
  fontWeight,
  radius,
  shadows,
};

export type ThemeType = typeof theme;

export { colors, spacing, typography, fontSize, fontWeight, radius, shadows };
