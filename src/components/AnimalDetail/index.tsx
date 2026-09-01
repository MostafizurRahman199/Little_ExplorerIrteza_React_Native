import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { AnimalItem } from '../../types';
import { theme } from '../../theme';
import { AudioService } from '../../services';

interface AnimalDetailProps {
  animal: AnimalItem;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const AnimalDetail: React.FC<AnimalDetailProps> = ({
  animal,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const animValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  // Reset image error state whenever animal changes so real photos always load!
  useEffect(() => {
    setImageError(false);
    setActiveSpeech(null);
  }, [animal.id]);

  const handleAnimalTap = () => {
    // Speak animal name out loud clearly (e.g. "Dog")
    AudioService.playWord(animal.name);
    setActiveSpeech(animal.name);

    // Trigger celebration sparkles
    sparkleAnim.setValue(0);
    Animated.sequence([
      Animated.timing(sparkleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(sparkleAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Trigger animal-specific physical animation
    switch (animal.animationType) {
      case 'bounce':
      case 'hop':
        Animated.sequence([
          Animated.spring(scaleValue, {
            toValue: 1.15,
            speed: 30,
            bounciness: 18,
            useNativeDriver: true,
          }),
          Animated.spring(scaleValue, {
            toValue: 1,
            speed: 20,
            bounciness: 12,
            useNativeDriver: true,
          }),
        ]).start();
        break;

      case 'fly':
        animValue.setValue(0);
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: -25,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start();
        break;

      case 'swim':
      case 'sway':
      case 'wiggle':
        animValue.setValue(0);
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 18,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: -18,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
        break;

      default:
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.12,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
        break;
    }
  };

  const getTransformStyle = () => {
    switch (animal.animationType) {
      case 'fly':
        return { transform: [{ translateY: animValue }, { scale: scaleValue }] };
      case 'swim':
      case 'sway':
      case 'wiggle':
        return { transform: [{ translateX: animValue }, { scale: scaleValue }] };
      default:
        return { transform: [{ scale: scaleValue }] };
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: animal.bgColor }]}>
      {/* Sparkle Celebration Effects */}
      <Animated.View style={[styles.sparkleContainer, { opacity: sparkleAnim }]}>
        <Text style={styles.sparkleText}>✨ ⭐ 🎉</Text>
      </Animated.View>

      {/* Main Centered Content Card */}
      <View style={styles.centerContentGroup}>
        {/* 1. Animal Name Title */}
        <Text style={[styles.displayName, { color: animal.accentColor }]}>
          {animal.displayName}
        </Text>

        {/* 2. Audio Speech Button */}
        <TouchableOpacity activeOpacity={0.8} onPress={handleAnimalTap} style={styles.soundBadge}>
          <Text style={styles.soundBadgeText}>
            🔊 {activeSpeech ? `"${activeSpeech}"` : `Say "${animal.name}"`}
          </Text>
        </TouchableOpacity>

        {/* 3. Large Cute Animal Image */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleAnimalTap}
          style={styles.illustrationCard}
        >
          <Animated.View style={[styles.imageWrapper, getTransformStyle(), theme.shadows.medium]}>
            {!imageError && animal.imageUrl ? (
              <Image
                source={{ uri: animal.imageUrl }}
                style={styles.realAnimalImage}
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <View style={styles.fallbackCircle}>
                <Text style={styles.illustration}>{animal.illustration}</Text>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>

        {/* 4. Navigation Row directly below Image */}
        <View style={styles.navigationRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPrev}
            disabled={!hasPrev}
            style={[
              styles.navButton,
              !hasPrev && styles.disabledNav,
              theme.shadows.medium,
            ]}
          >
            <Text style={styles.navButtonText}>⬅️ Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onNext}
            disabled={!hasNext}
            style={[
              styles.navButton,
              !hasNext && styles.disabledNav,
              theme.shadows.medium,
            ]}
          >
            <Text style={styles.navButtonText}>Next ➡️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.xl,
  },
  sparkleContainer: {
    position: 'absolute',
    top: 20,
    zIndex: 10,
  },
  sparkleText: {
    fontSize: 34,
  },
  centerContentGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 360,
  },
  displayName: {
    fontSize: 44,
    fontWeight: theme.fontWeight.extraBold,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  soundBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.round,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: theme.spacing.md,
  },
  soundBadgeText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textDark,
  },
  illustrationCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  imageWrapper: {
    width: 270,
    height: 270,
    borderRadius: theme.radius.xl,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  realAnimalImage: {
    width: '100%',
    height: '100%',
  },
  fallbackCircle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  illustration: {
    fontSize: 120,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: theme.spacing.xs,
  },
  navButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.round,
    minWidth: 130,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  disabledNav: {
    opacity: 0.35,
  },
  navButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textDark,
  },
});
