import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface AnimatedCharacterProps {
  name?: string;
  onPress?: () => void;
  greeting?: string;
}

export const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  name = 'Bubu',
  onPress,
  greeting = 'Hello Explorer! 🧸',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, theme.shadows.medium]}
    >
      <View style={styles.avatarCircle}>
        <Text style={styles.mascotEmoji}>🧸</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.mascotName}>{name}</Text>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF5',
    padding: theme.spacing.md,
    borderRadius: theme.radius.xl,
    marginVertical: theme.spacing.sm,
    borderWidth: 2,
    borderColor: theme.colors.accentYellow,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.accentYellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  mascotEmoji: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  mascotName: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  greeting: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textDark,
  },
});
