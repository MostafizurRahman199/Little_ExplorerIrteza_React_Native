import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { BackButton } from '../../components';
import { ABC_ITEMS } from '../../data';
import { ABCItem } from '../../types';
import { theme } from '../../theme';
import { AudioService } from '../../services';

type ABCScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ABC'>;

interface ABCScreenProps {
  navigation: ABCScreenNavigationProp;
}

export const ABCScreen: React.FC<ABCScreenProps> = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  const currentItem: ABCItem | null = selectedIndex !== null ? ABC_ITEMS[selectedIndex] : null;

  // Speak phrase in poem sing-song style whenever selected index changes
  useEffect(() => {
    if (currentItem) {
      setImageError(false);
      AudioService.playPoemPhrase(currentItem.letter, currentItem.word);
    }
  }, [selectedIndex]);

  // Auto-play slideshow timer effect
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else {
        timer = setTimeout(() => {
          setSelectedIndex((prevIndex) =>
            prevIndex !== null ? (prevIndex + 1) % ABC_ITEMS.length : 0
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

  const handleSelectLetter = (index: number) => {
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
    if (selectedIndex !== null && selectedIndex < ABC_ITEMS.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleCardTap = () => {
    if (!currentItem) return;
    AudioService.playPoemPhrase(currentItem.letter, currentItem.word);

    // Sparkle & bounce animation
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
        toValue: 1.12,
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.categoryAbc }]}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <BackButton onPress={handleBackToGrid} title={selectedIndex !== null ? 'Grid' : 'Back'} />

        <Text style={styles.headerTitle} numberOfLines={1}>
          ABC Learning
        </Text>

        <View style={styles.headerActions}>
          {selectedIndex !== null && (
            <Text style={styles.counterText}>
              {selectedIndex + 1} / {ABC_ITEMS.length}
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
        <View style={[styles.detailCard, { backgroundColor: currentItem.bgColor }]}>
          {/* Sparkles */}
          <Animated.View style={[styles.sparkleContainer, { opacity: sparkleAnim }]}>
            <Text style={styles.sparkleText}>✨ ⭐ 🎉</Text>
          </Animated.View>

          {/* Letter & Phrase Title */}
          <View style={styles.titleGroup}>
            <View style={[styles.letterBadge, { backgroundColor: currentItem.accentColor }]}>
              <Text style={styles.letterText}>{currentItem.letter}</Text>
            </View>
            <Text style={[styles.phraseText, { color: currentItem.accentColor }]}>
              {currentItem.phrase}
            </Text>
          </View>

          {/* Audio Speech Button */}
          {/* <TouchableOpacity activeOpacity={0.8} onPress={handleCardTap} style={styles.soundBadge}>
            <Text style={styles.soundBadgeText}>🔊 Say "{currentItem.phrase}"</Text>
          </TouchableOpacity> */}

          {/* Real Photo Card */}
          <TouchableOpacity activeOpacity={0.9} onPress={handleCardTap} style={styles.imageCard}>
            <Animated.View style={[styles.imageWrapper, { transform: [{ scale: scaleValue }] }]}>
              {!imageError && currentItem.imageUrl ? (
                <Image
                  source={{ uri: currentItem.imageUrl }}
                  style={styles.realImage}
                  resizeMode="cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <View style={styles.fallbackCircle}>
                  <Text style={styles.illustration}>{currentItem.illustration}</Text>
                </View>
              )}
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
              disabled={selectedIndex === ABC_ITEMS.length - 1}
              style={[
                styles.navButton,
                selectedIndex === ABC_ITEMS.length - 1 && styles.disabledNav,
              ]}
            >
              <Text style={styles.navButtonText}>Next ➡️</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* A-Z Grid View */
        <FlatList
          data={ABC_ITEMS}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => handleSelectLetter(index)}
              style={[styles.gridCard, { backgroundColor: item.bgColor }]}
            >
              <View style={[styles.gridLetterBadge, { backgroundColor: item.accentColor }]}>
                <Text style={styles.gridLetterText}>{item.letter}</Text>
              </View>
              <Text style={styles.gridIllustration}>{item.illustration}</Text>
              <Text style={[styles.gridWord, { color: item.accentColor }]}>{item.word}</Text>
            </TouchableOpacity>
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
    margin: 6,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridLetterBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  gridLetterText: {
    fontSize: 18,
    fontWeight: theme.fontWeight.extraBold,
    color: '#FFFFFF',
  },
  gridIllustration: {
    fontSize: 34,
    marginVertical: 2,
  },
  gridWord: {
    fontSize: 13,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  letterBadge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  letterText: {
    fontSize: 54,
    fontWeight: theme.fontWeight.extraBold,
    color: '#FFFFFF',
  },
  phraseText: {
    fontSize: 44,
    fontWeight: theme.fontWeight.extraBold,
    letterSpacing: 1,
    textAlign: 'center',
  },
  soundBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.round,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  soundBadgeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textDark,
  },
  imageCard: {
    marginBottom: theme.spacing.lg,
  },
  imageWrapper: {
    width: 250,
    height: 250,
    borderRadius: theme.radius.xl,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#FFFFFF',
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
    fontSize: 100,
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
