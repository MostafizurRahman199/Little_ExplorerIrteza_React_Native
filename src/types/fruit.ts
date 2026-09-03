export type FruitAnimationType =
  | 'bounce'
  | 'stretch'
  | 'fly'
  | 'swim'
  | 'wiggle'
  | 'pulse'
  | 'hop'
  | 'sway'
  | 'pounce'
  | 'peck';

export interface FruitItem {
  id: string;
  name: string;
  displayName: string;
  illustration: string;
  imageUrl: string;
  images?: string[];
  soundText: string;
  pronunciationText: string;
  bgColor: string;
  accentColor: string;
  animationType: FruitAnimationType;
  description: string;
}
