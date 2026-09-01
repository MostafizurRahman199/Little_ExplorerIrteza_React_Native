import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CategoryItem } from '../../types';
import { theme } from '../../theme';

interface CategoryCardProps {
  category: CategoryItem;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: category.bgColor },
        theme.shadows.medium,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>
      <Text style={[styles.title, { color: category.accentColor }]}>{category.title}</Text>
      <Text style={styles.subtitle}>{category.subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.round,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },
});
