import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../../theme';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.text}>
        {current} / {total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.sm,
  },
  barBackground: {
    flex: 1,
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: theme.radius.round,
    overflow: 'hidden',
    marginRight: theme.spacing.sm,
  },
  barFill: {
    height: '100%',
    backgroundColor: theme.colors.accentGreen,
    borderRadius: theme.radius.round,
  },
  text: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textMuted,
  },
});
