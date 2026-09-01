import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { BackButton } from '../../components';
import { COLORS_ITEMS } from '../../data';
import { ColorItem } from '../../types';
import { theme } from '../../theme';
import { AudioService } from '../../services';

type ColorsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Colors'>;

interface ColorsScreenProps {
  navigation: ColorsScreenNavigationProp;
}

const AnimatedColorCard: React.FC<{
  item: ColorItem;
  index: number;
  onPress: () => void;
}> = ({ item, index, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(45)).current;

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
    }, (index % 8) * 80);

    return () => clearTimeout(timer);
  }, [index]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      speed: 25,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      speed: 20,
      bounciness: 12,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.gridCard,
          {
            backgroundColor: item.bgColor,
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          },
        ]}
      >
        <View style={[styles.gridSwatch, { backgroundColor: item.hex }]} />
        <Text style={[styles.gridName, { color: item.accentColor }]}>{item.name}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export const ColorsScreen: React.FC<ColorsScreenProps> = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  const currentItem: ColorItem | null = selectedIndex !== null ? COLORS_ITEMS[selectedIndex] : null;

  // Play audio announcement on screen mount
  useEffect(() => {
    AudioService.playWord('Colors');
  }, []);

  // Speak ONLY color name (e.g. "Yellow") when selected index changes or on swap
  useEffect(() => {
    if (currentItem) {
      setImageError(false);
      AudioService.playWord(currentItem.name);
    }
  }, [selectedIndex]);

  // Auto-play slideshow timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else {
        timer = setTimeout(() => {
          setSelectedIndex((prevIndex) =>
            prevIndex !== null ? (prevIndex + 1) % COLORS_ITEMS.length : 0
          );
        }, 3500);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, selectedIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (selectedIndex === null) {
        setSelectedIndex(0);
      }
      setIsPlaying(true);
    }
  };

  const handleSelectColor = (index: number) => {
    setIsPlaying(false);
    setSelectedIndex(index);
  };

  const handleBackToGrid = () => {
    setIsPlaying(false);
    if (selectedIndex !== null) {
      setSelectedIndex(null);
    } else {
      navigation.goBack();
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (selectedIndex !== null && selectedIndex < COLORS_ITEMS.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleCardTap = () => {
    if (!currentItem) return;
    AudioService.playWord(currentItem.name);

    sparkleAnim.setValue(0);
    Animated.sequence([
      Animated.timing(sparkleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(sparkleAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.1,
        speed: 25,
        bounciness: 12,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        speed: 20,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleExampleTap = (exampleText: string) => {
    AudioService.playWord(exampleText);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.categoryColors }]}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <BackButton onPress={handleBackToGrid} title={selectedIndex !== null ? 'Grid' : 'Back'} />

        <Text style={styles.headerTitle} numberOfLines={1}>
          Colors World
        </Text>

        <View style={styles.headerActions}>
          {selectedIndex !== null && (
            <Text style={styles.counterText}>
              {selectedIndex + 1} / {COLORS_ITEMS.length}
            </Text>
          )}

          <TouchableOpacity
            onPress={togglePlay}
            style={[styles.playBadge, isPlaying && styles.stopBadge]}
            activeOpacity={0.8}
          >
            <Text style={styles.playBadgeText}>{isPlaying ? 'Stop ⏹' : 'Play ▶'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      {currentItem !== null ? (
        /* Fullscreen Color Detail Card */
        <View style={[styles.detailCard, { backgroundColor: currentItem.bgColor }]}>
          {/* Sparkles */}
          <Animated.View style={[styles.sparkleContainer, { opacity: sparkleAnim }]}>
            <Text style={styles.sparkleText}>✨ 🎨 🌈</Text>
          </Animated.View>

          {/* Color Title Badge */}
          <View style={styles.titleGroup}>
            <View style={[styles.colorSwatchCircle, { backgroundColor: currentItem.hex }]} />
            <Text style={[styles.colorTitleText, { color: currentItem.accentColor }]}>
              {currentItem.name}
            </Text>
          </View>

          {/* Pure Color Card Frame */}
          <TouchableOpacity activeOpacity={0.9} onPress={handleCardTap} style={styles.imageCard}>
            <Animated.View
              style={[
                styles.imageWrapper,
                {
                  backgroundColor: currentItem.hex,
                  borderColor: '#FFFFFF',
                  transform: [{ scale: scaleValue }],
                },
              ]}
            >
            </Animated.View>
          </TouchableOpacity>

          {/* Navigation Controls */}
          <View style={styles.navigationRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePrev}
              disabled={selectedIndex === 0}
              style={[styles.navButton, selectedIndex === 0 && styles.disabledNav]}
            >
              <Text style={styles.navButtonText}>⬅️ Prev</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleNext}
              disabled={selectedIndex === COLORS_ITEMS.length - 1}
              style={[
                styles.navButton,
                selectedIndex === COLORS_ITEMS.length - 1 && styles.disabledNav,
              ]}
            >
              <Text style={styles.navButtonText}>Next ➡️</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* Colors Grid View */
        <FlatList
          data={COLORS_ITEMS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item, index }) => (
            <AnimatedColorCard
              item={item}
              index={index}
              onPress={() => handleSelectColor(index)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.screenPadding,
    paddingTop: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.extraBold,
    color: theme.colors.textDark,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  counterText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textMuted,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 5,
    borderRadius: theme.radius.round,
  },
  playBadge: {
    backgroundColor: theme.colors.accentOrange,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.radius.round,
    minWidth: 70,
    alignItems: 'center',
  },
  stopBadge: {
    backgroundColor: '#E53935',
  },
  playBadgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
  },
  gridContent: {
    paddingBottom: theme.spacing.xl,
  },
  gridCard: {
    flex: 1,
    margin: 8,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  gridSwatch: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  gridIllustration: {
    fontSize: 28,
  },
  gridName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.extraBold,
    textAlign: 'center',
    marginBottom: 4,
  },
  gridExampleBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.radius.round,
  },
  gridExampleText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
  },
  detailCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.radius.xl,
    marginBottom: theme.spacing.sm,
  },
  sparkleContainer: {
    position: 'absolute',
    top: 15,
    zIndex: 10,
  },
  sparkleText: {
    fontSize: 32,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: theme.spacing.md,
  },
  colorSwatchCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  colorTitleText: {
    fontSize: 36,
    fontWeight: theme.fontWeight.extraBold,
    letterSpacing: 1,
  },
  imageCard: {
    marginBottom: theme.spacing.md,
  },
  imageWrapper: {
    width: 240,
    height: 240,
    borderRadius: theme.radius.xl,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  realImage: {
    width: '100%',
    height: '100%',
  },
  fallbackCircle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    fontSize: 90,
  },
  pureColorContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pureColorEmoji: {
    fontSize: 96,
    marginBottom: 8,
  },
  pureColorName: {
    fontSize: 32,
    fontWeight: theme.fontWeight.extraBold,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 320,
  },
  navButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.round,
    minWidth: 120,
    alignItems: 'center',
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
