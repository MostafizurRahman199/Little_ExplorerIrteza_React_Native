import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface SoundButtonProps {
  onPress: () => void;
  label?: string;
  isPlaying?: boolean;
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  onPress,
  label = 'Play Sound',
  isPlaying = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: isPlaying ? theme.colors.accentGreen : theme.colors.secondary },
        theme.shadows.medium,
      ]}
    >
      <Text style={styles.icon}>{isPlaying ? '🔊' : '🔈'}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: theme.spacing.minTouchTarget,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    marginVertical: theme.spacing.sm,
  },
  icon: {
    fontSize: theme.fontSize.lg,
    marginRight: theme.spacing.sm,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textLight,
  },
});
