import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { VehicleItem } from '../../types';
import { theme } from '../../theme';
import { AudioService } from '../../services';

interface VehicleDetailProps {
  vehicle: VehicleItem;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const VehicleDetail: React.FC<VehicleDetailProps> = ({
  vehicle,
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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  // List of photos available for this vehicle
  const photoList = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.imageUrl];

  // When new vehicle comes, reset photo index and speak name
  useEffect(() => {
    setImageError(false);
    setCurrentPhotoIndex(0);
    setActiveSpeech(vehicle.name);

    if (vehicle.soundUrl) {
      AudioService.playAudioUrl(vehicle.soundUrl);
    } else {
      AudioService.playWord(vehicle.name);
    }
  }, [vehicle.id]);

  const triggerAnimation = () => {
    // Sparkles animation
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

    // Physical animation
    switch (vehicle.animationType) {
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

  const handleVehicleTap = () => {
    // Rotate photo
    if (photoList.length > 1) {
      setImageError(false);
      setCurrentPhotoIndex((prev) => (prev + 1) % photoList.length);
    }

    if (vehicle.soundUrl) {
      AudioService.playAudioUrl(vehicle.soundUrl);
    } else {
      AudioService.playWord(vehicle.name);
    }
    setActiveSpeech(vehicle.name);

    triggerAnimation();
  };

  const getTransformStyle = () => {
    switch (vehicle.animationType) {
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

  const activePhotoUri = photoList[currentPhotoIndex] || vehicle.imageUrl;

  return (
    <View style={[styles.container, { backgroundColor: vehicle.bgColor }]}>
      {/* Sparkle Celebration Effects */}
      <Animated.View style={[styles.sparkleContainer, { opacity: sparkleAnim }]}>
        <Text style={styles.sparkleText}>✨ 🚗 🎉</Text>
      </Animated.View>

      {/* Main Centered Content Card */}
      <View style={styles.centerContentGroup}>
        {/* 1. Vehicle Name Title */}
        <Text style={[styles.displayName, { color: vehicle.accentColor }]}>
          {vehicle.displayName}
        </Text>

        {/* 2. Audio Speech Button */}
        <View style={styles.audioActionRow}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleVehicleTap} style={styles.soundBadge}>
            <Text style={styles.soundBadgeText}>
              🔊 {activeSpeech ? `"${activeSpeech}"` : `Say "${vehicle.name}"`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 3. Large Vehicle Image (Tap to rotate photo!) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleVehicleTap}
          style={styles.illustrationCard}
        >
          <Animated.View style={[styles.imageWrapper, getTransformStyle(), theme.shadows.medium]}>
            {!imageError && activePhotoUri ? (
              <Image
                source={{ uri: activePhotoUri }}
                style={styles.realVehicleImage}
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <View style={styles.fallbackCircle}>
                <Text style={styles.illustration}>{vehicle.illustration}</Text>
              </View>
            )}

            {/* Photo Counter Pill Indicator */}
            {photoList.length > 1 && (
              <View style={styles.photoCountBadge}>
                <Text style={styles.photoCountText}>
                  📸 {currentPhotoIndex + 1}/{photoList.length}
                </Text>
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
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.xl,
  },
  sparkleContainer: {
    position: 'absolute',
    top: 10,
    zIndex: 20,
  },
  sparkleText: {
    fontSize: 34,
  },
  centerContentGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 360,
    paddingTop: theme.spacing.xs,
  },
  displayName: {
    fontSize: 40,
    fontWeight: theme.fontWeight.extraBold,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
    zIndex: 10,
  },
  audioActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    zIndex: 10,
  },
  soundBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.round,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  soundBadgeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textDark,
  },
  illustrationCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 28,
    zIndex: 1,
  },
  imageWrapper: {
    width: 260,
    height: 240,
    borderRadius: theme.radius.xl,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#FFFFFF',
    position: 'relative',
  },
  realVehicleImage: {
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
  photoCountBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 3,
    borderRadius: theme.radius.round,
  },
  photoCountText: {
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: theme.spacing.xs,
    zIndex: 10,
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
