import React, { useRef, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, StyleSheet, View, Animated, Image } from 'react-native';
import { AnimalItem } from '../../types';
import { theme } from '../../theme';

interface AnimalCardProps {
  animal: AnimalItem;
  onPress: () => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    setImageError(false);
  }, [animal.id]);

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
            backgroundColor: animal.bgColor,
            transform: [{ scale: scaleAnim }],
          },
          theme.shadows.medium,
        ]}
      >
        <View style={styles.iconCircle}>
          {!imageError && animal.imageUrl ? (
            <Image
              source={{ uri: animal.imageUrl }}
              style={styles.cardImage}
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <Text style={styles.illustration}>{animal.illustration}</Text>
          )}
        </View>
        <Text style={[styles.name, { color: animal.accentColor }]}>{animal.name}</Text>
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
