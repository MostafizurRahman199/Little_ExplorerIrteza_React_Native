import React, { useRef, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, StyleSheet, View, Animated, Image } from 'react-native';
import { FruitItem } from '../../types';
import { theme } from '../../theme';

interface FruitCardProps {
  fruit: FruitItem;
  onPress: () => void;
  index?: number;
}

export const FruitCard: React.FC<FruitCardProps> = ({ fruit, onPress, index = 0 }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(45)).current;
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    setImageError(false);
  }, [fruit.id]);

  // Staggered animated entrance for grid cards
  useEffect(() => {
    opacityAnim.setValue(0);
    translateYAnim.setValue(45);

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          speed: 14,
          bounciness: 9,
          useNativeDriver: true,
        }),
      ]).start();
    }, (index % 8) * 85);

    return () => clearTimeout(timer);
  }, [index]);

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
          {
            backgroundColor: fruit.bgColor,
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          },
          theme.shadows.medium,
        ]}
      >
        <View style={styles.iconCircle}>
          {!imageError && fruit.imageUrl ? (
            <Image
              source={{ uri: fruit.imageUrl }}
              style={styles.cardImage}
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <Text style={styles.illustration}>{fruit.illustration}</Text>
          )}
        </View>
        <Text style={[styles.name, { color: fruit.accentColor }]}>{fruit.name}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 170,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: theme.radius.round,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  illustration: {
    fontSize: 44,
  },
  name: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.extraBold,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  soundBadgeContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 3,
    borderRadius: theme.radius.round,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  soundBadge: {
    fontSize: theme.fontSize.xs,
    textAlign: 'center',
    fontWeight: theme.fontWeight.bold,
  },
});
