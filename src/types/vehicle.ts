export type VehicleAnimationType =
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

export interface VehicleItem {
  id: string;
  name: string;
  displayName: string;
  illustration: string;
  imageUrl: string;
  images: string[];
  soundUrl?: string;
  hornSoundText: string;
  soundText: string;
  pronunciationText: string;
  bgColor: string;
  accentColor: string;
  animationType: VehicleAnimationType;
  description: string;
}
