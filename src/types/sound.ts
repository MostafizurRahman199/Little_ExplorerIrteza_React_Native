export type SoundAnimationType =
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

export type SoundCategory = 'all' | 'nature' | 'vehicles' | 'home' | 'music';

export interface SoundItem {
  id: string;
  name: string;
  displayName: string;
  category: 'nature' | 'vehicles' | 'home' | 'music';
  illustration: string;
  imageUrl: string;
  images: string[];
  soundAsset?: any;
  soundUrl?: string;
  soundText: string;
  pronunciationText: string;
  bgColor: string;
  accentColor: string;
  animationType: SoundAnimationType;
  description: string;
}
