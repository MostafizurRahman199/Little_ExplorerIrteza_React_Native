export type BodyAnimationType =
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

export interface BodyItem {
  id: string;
  name: string;
  displayName: string;
  illustration: string;
  imageUrl: string;
  images: string[];
  actionText: string;
  soundText: string;
  pronunciationText: string;
  bgColor: string;
  accentColor: string;
  animationType: BodyAnimationType;
  description: string;
}
