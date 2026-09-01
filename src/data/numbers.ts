import { NumberItem } from '../types';

const ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function getNumberWord(n: number): string {
  if (n === 100) return 'One Hundred';
  if (n < 20) return ONES[n];
  const ten = Math.floor(n / 10);
  const remainder = n % 10;
  return remainder > 0 ? `${TENS[ten]}-${ONES[remainder]}` : TENS[ten];
}

const EMOJIS = [
  '🍎', '🎈', '🌟', '🐥', '🍓', '🐱', '🚗', '🌸', '🍦', '🚀',
  '🍉', '⚽', '🎨', '🧸', '🐝', '🐬', '👑', '🌈', '🎁', '🎂'
];

const COLOR_PALETTES = [
  { bgColor: '#FFEBEF', accentColor: '#D32F2F' }, // Red
  { bgColor: '#FFFDE0', accentColor: '#F57F17' }, // Yellow
  { bgColor: '#E1F5FE', accentColor: '#0288D1' }, // Blue
  { bgColor: '#E8F5E9', accentColor: '#2E7D32' }, // Green
  { bgColor: '#FFF3E0', accentColor: '#E65100' }, // Orange
  { bgColor: '#F3E5F5', accentColor: '#7B1FA2' }, // Purple
  { bgColor: '#FCE4EC', accentColor: '#C2185B' }, // Pink
  { bgColor: '#EFEBE9', accentColor: '#5D4037' }, // Brown
  { bgColor: '#E0F7FA', accentColor: '#00838F' }, // Cyan
  { bgColor: '#F1F8E9', accentColor: '#558B2F' }, // Light Green
];

export const NUMBERS_ITEMS: NumberItem[] = Array.from({ length: 100 }, (_, i) => {
  const value = i + 1;
  const palette = COLOR_PALETTES[i % COLOR_PALETTES.length];
  const illustration = EMOJIS[i % EMOJIS.length];

  return {
    id: `num_${value}`,
    value: value,
    word: getNumberWord(value),
    illustration: illustration,
    bgColor: palette.bgColor,
    accentColor: palette.accentColor,
  };
});
