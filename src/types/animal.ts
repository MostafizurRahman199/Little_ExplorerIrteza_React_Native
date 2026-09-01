export type AnimalAnimationType =
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

export interface AnimalItem {
  id: string;
  name: string;
  displayName: string;
  illustration: string;
  imageUrl: string;
  soundText: string;
  pronunciationText: string;
  bgColor: string;
  accentColor: string;
  animationType: AnimalAnimationType;
  description: string;
}
