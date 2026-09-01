import React, { useRef } from 'react';
import { TouchableWithoutFeedback, Text, StyleSheet, View, Animated } from 'react-native';
import { CategoryItem } from '../../types';
import { theme } from '../../theme';
import { AudioService } from '../../services';

interface CategoryCardProps {
  category: CategoryItem;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 24,
      bounciness: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 12,
    }).start();
  };

  const handlePress = () => {
    AudioService.playClickSound();
    onPress();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: category.bgColor, transform: [{ scale: scaleAnim }] },
          theme.shadows.medium,
        ]}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{category.icon}</Text>
        </View>
        <Text style={[styles.title, { color: category.accentColor }]}>{category.title}</Text>
        <Text style={styles.subtitle}>{category.subtitle}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
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
    width: 62,
    height: 62,
    borderRadius: theme.radius.round,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 34,
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
