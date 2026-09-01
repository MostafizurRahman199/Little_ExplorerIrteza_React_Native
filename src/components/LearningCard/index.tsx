import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LearningItem } from '../../types';
import { theme } from '../../theme';

interface LearningCardProps {
  item: LearningItem;
  onPress: () => void;
  iconSymbol?: string;
}

export const LearningCard: React.FC<LearningCardProps> = ({ item, onPress, iconSymbol = '✨' }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, theme.shadows.large]}
    >
      <View style={styles.content}>
        <Text style={styles.symbol}>{iconSymbol}</Text>
        <Text style={styles.name}>{item.displayName.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 240,
    width: '100%',
    marginVertical: theme.spacing.md,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 80,
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.extraBold,
    color: theme.colors.textDark,
    letterSpacing: 1.5,
  },
});
