import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface BackButtonProps {
  onPress: () => void;
  title?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress, title = 'Back' }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, theme.shadows.small]}
    >
      <Text style={styles.arrow}>👈</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // Fixes full-width stretching
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.round,
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: '#E8ECF2',
  },
  arrow: {
    fontSize: 20,
    marginRight: 6,
  },
  title: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textDark,
  },
});
