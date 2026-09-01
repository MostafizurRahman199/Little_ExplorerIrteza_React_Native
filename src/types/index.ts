export * from './navigation';
export * from './animal';
export * from './abc';
export * from './color';

export interface CategoryItem {
  id: keyof import('./navigation').RootStackParamList;
  title: string;
  subtitle: string;
  icon: string;
  bgColor: string;
  accentColor: string;
}

export interface LearningItem {
  id: string;
  name: string;
  displayName: string;
  image?: string;
  sound?: string;
  pronunciation?: string;
  description?: string;
  color?: string;
  animationType?: 'bounce' | 'stretch' | 'fly' | 'swim' | 'wiggle' | 'pulse';
}
