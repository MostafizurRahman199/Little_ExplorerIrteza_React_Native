import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { BackButton } from '../../components';
import { NUMBERS_ITEMS } from '../../data';
import { NumberItem } from '../../types';
import { theme } from '../../theme';
import { AudioService } from '../../services';
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from 'lottie-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type NumbersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Numbers'>;

interface NumbersScreenProps {
  navigation: NumbersScreenNavigationProp;
}

interface TouchPoint {
  x: number;
  y: number;
  id: string;
  strokeId: number;
}



const AnimatedNumberCard: React.FC<{
  item: NumberItem;
  index: number;
  onPress: () => void;
}> = ({ item, index, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    opacityAnim.setValue(0);
    translateYAnim.setValue(40);

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          speed: 16,
          bounciness: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, (index % 12) * 50);

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
        <View style={[styles.gridNumberBadge, { backgroundColor: item.accentColor }]}>
          <Text style={styles.gridNumberText}>{item.value}</Text>
        </View>
        <Text style={styles.gridIllustration}>{item.illustration}</Text>
        <Text style={[styles.gridWord, { color: item.accentColor }]} numberOfLines={1}>
          {item.word}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export const NumbersScreen: React.FC<NumbersScreenProps> = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [drawingPoints, setDrawingPoints] = useState<TouchPoint[]>([]);
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);

  const scaleValue = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  // Party Celebration Animations
  const partyAnim = useRef(new Animated.Value(0)).current;
  const partyScale = useRef(new Animated.Value(0.5)).current;

  const currentItem: NumberItem | null = selectedIndex !== null ? NUMBERS_ITEMS[selectedIndex] : null;

  // Track points ref for touch handler
  const pointsRef = useRef<TouchPoint[]>([]);
  const isCelebratingRef = useRef<boolean>(false);
  const currentStrokeIdRef = useRef<number>(0);

  useEffect(() => {
    pointsRef.current = drawingPoints;
  }, [drawingPoints]);

  useEffect(() => {
    isCelebratingRef.current = isCelebrating;
  }, [isCelebrating]);

  // Clear drawing when switching selected item
  useEffect(() => {
    setDrawingPoints([]);
    pointsRef.current = [];
    setIsCelebrating(false);
    isCelebratingRef.current = false;
  }, [selectedIndex]);

  // Play entrance audio announcement when screen opens
  useEffect(() => {
    AudioService.playWord('Numbers 1 to 100');
  }, []);

  // Speak number name whenever selected index changes
  useEffect(() => {
    if (currentItem) {
      AudioService.playWord(currentItem.word);
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
            prevIndex !== null ? (prevIndex + 1) % NUMBERS_ITEMS.length : 0
          );
        }, 3500);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, selectedIndex]);

  // Canvas dimensions (must match styles.drawingCanvasWrapper)
  const CANVAS_W = 270;
  const CANVAS_H = 250;

  // Randomized cheering phrases for success
  const CHEER_PHRASES = [
    'Yay! Great job!',
    'Awesome! You did it!',
    'Yeah! Super star!',
    'Wonderful! Amazing!',
    'Bravo! Well done!',
    'Fantastic!',
    'You are a champion!',
    'Perfect! So good!',
  ];

  // Encouragement phrases when the drawing doesn't match yet
  const TRY_PHRASES = [
    'Almost! Try again!',
    'Keep going, you can do it!',
    'Try to trace the number!',
    'Draw over each part!',
  ];

  /**
   * Get the digit zones for the current number.
   * Each zone is a horizontal slice of the canvas corresponding to one digit.
   * The child must draw in ALL zones to succeed.
   */
  const getDigitZones = (value: number): { xMin: number; xMax: number }[] => {
    const digits = String(value).length;
    const padding = 20; // border + padding
    const usable = CANVAS_W - padding * 2;

    if (digits === 1) {
      // Single digit — one center zone (middle 60%)
      const center = CANVAS_W / 2;
      const halfW = usable * 0.30;
      return [{ xMin: center - halfW, xMax: center + halfW }];
    }
    if (digits === 2) {
      // Two digits — left half and right half
      const mid = CANVAS_W / 2;
      return [
        { xMin: padding, xMax: mid },
        { xMin: mid, xMax: CANVAS_W - padding },
      ];
    }
    // Three digits (100) — thirds
    const third = usable / 3;
    return [
      { xMin: padding, xMax: padding + third },
      { xMin: padding + third, xMax: padding + third * 2 },
      { xMin: padding + third * 2, xMax: CANVAS_W - padding },
    ];
  };

  /**
   * Check if drawing points cover all digit zones.
   * Each zone needs at least a few points to count as "drawn".
   */
  const checkZoneCoverage = (points: TouchPoint[], value: number): boolean => {
    const zones = getDigitZones(value);
    const MIN_POINTS_PER_ZONE = 3;

    return zones.every((zone) => {
      const count = points.filter(
        (pt) => pt.x >= zone.xMin && pt.x <= zone.xMax && pt.y > 20 && pt.y < CANVAS_H - 20
      ).length;
      return count >= MIN_POINTS_PER_ZONE;
    });
  };

  // Confetti cannon ref
  const confettiRef = useRef<any>(null);
  const lottieRef = useRef<LottieView>(null);

  // Trigger celebration with Confetti Cannon + Lottie
  const triggerCelebration = () => {
    if (isCelebratingRef.current) return;
    setIsCelebrating(true);
    isCelebratingRef.current = true;

    // Pick a random cheer phrase
    const cheer = CHEER_PHRASES[Math.floor(Math.random() * CHEER_PHRASES.length)];
    AudioService.playWord(cheer);

    // Fire confetti cannon
    confettiRef.current?.start();

    // Play Lottie celebration
    lottieRef.current?.reset();
    lottieRef.current?.play();

    // Banner animation
    partyAnim.setValue(0);
    partyScale.setValue(0.5);

    Animated.parallel([
      Animated.timing(partyAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.spring(partyScale, {
        toValue: 1,
        speed: 10,
        bounciness: 12,
        useNativeDriver: true,
      }),
    ]).start();

    // Wait for cheer voice to finish, THEN advance
    setTimeout(() => {
      setDrawingPoints([]);
      pointsRef.current = [];
      setIsCelebrating(false);
      isCelebratingRef.current = false;

      setSelectedIndex((prev) => {
        if (prev !== null && prev < NUMBERS_ITEMS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3500);
  };

  // Encourage when drawing doesn't match all zones yet
  const encourageRetry = () => {
    const phrase = TRY_PHRASES[Math.floor(Math.random() * TRY_PHRASES.length)];
    AudioService.playWord(phrase);
  };

  // PanResponder to handle finger drawing over the number
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        if (isCelebratingRef.current) return;
        // New stroke — increment strokeId so we don't connect to previous stroke
        currentStrokeIdRef.current += 1;
        const { locationX, locationY } = evt.nativeEvent;
        const newPoint = {
          x: locationX,
          y: locationY,
          id: `${Date.now()}_${Math.random()}`,
          strokeId: currentStrokeIdRef.current,
        };
        setDrawingPoints([...pointsRef.current, newPoint]);
      },

      onPanResponderMove: (evt) => {
        if (isCelebratingRef.current) return;
        const { locationX, locationY } = evt.nativeEvent;
        const newPoint = {
          x: locationX,
          y: locationY,
          id: `${Date.now()}_${Math.random()}`,
          strokeId: currentStrokeIdRef.current,
        };
        const updated = [...pointsRef.current, newPoint];
        setDrawingPoints(updated);
      },

      onPanResponderRelease: () => {
        // Nothing to do — stroke break is handled by strokeId
      },
    })
  ).current;

  // Check zone coverage whenever drawingPoints change (after finger release is handled by timeout)
  const checkTimeoutRef = useRef<any>(null);
  useEffect(() => {
    if (isCelebrating || !currentItem || drawingPoints.length < 5) return;

    // Debounce the check so it runs after drawing settles
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    checkTimeoutRef.current = setTimeout(() => {
      // Only check once drawing has paused (finger lifted)
    }, 200);

    return () => {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    };
  }, [drawingPoints, isCelebrating]);

  // Manual "Done" check — child taps the ✅ button when finished drawing
  const handleCheckDrawing = () => {
    if (!currentItem || isCelebratingRef.current) return;
    if (checkZoneCoverage(drawingPoints, currentItem.value)) {
      triggerCelebration();
    } else {
      encourageRetry();
    }
  };

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

  const handleSelectNumber = (index: number) => {
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
    if (selectedIndex !== null && selectedIndex < NUMBERS_ITEMS.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const clearDrawing = () => {
    setDrawingPoints([]);
    pointsRef.current = [];
  };

  const handleCardTap = () => {
    if (!currentItem) return;
    AudioService.playWord(currentItem.word);

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
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.categoryNumbers }]}>
      {/* Confetti Cannon — fires on celebration */}
      {isCelebrating && (
        <ConfettiCannon
          ref={confettiRef}
          count={150}
          origin={{ x: SCREEN_WIDTH / 2, y: -20 }}
          autoStart={true}
          fadeOut={true}
          explosionSpeed={400}
          fallSpeed={3000}
          colors={['#FF4081', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#00BCD4']}
        />
      )}

      {/* Lottie Celebration Overlay */}
      {isCelebrating && (
        <View style={styles.lottieOverlay} pointerEvents="none">
          <LottieView
            ref={lottieRef}
            source={require('../../../assets/animations/celebration.json')}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
          />
          {/* Center Banner */}
          <Animated.View
            style={[
              styles.partyBannerContainer,
              {
                opacity: partyAnim.interpolate({
                  inputRange: [0, 0.15, 0.85, 1],
                  outputRange: [0, 1, 1, 0],
                }),
                transform: [{ scale: partyScale }],
              },
            ]}
          >
            <Text style={styles.partyBannerText}>🎉 GREAT JOB! 🎉</Text>
          </Animated.View>
        </View>
      )}

      {/* Header Row */}
      <View style={styles.headerRow}>
        <BackButton onPress={handleBackToGrid} title={selectedIndex !== null ? 'Grid' : 'Back'} />

        <Text style={styles.headerTitle} numberOfLines={1}>
          Numbers 1-100
        </Text>

        <View style={styles.headerActions}>
          {selectedIndex !== null && (
            <Text style={styles.counterText}>
              {selectedIndex + 1} / {NUMBERS_ITEMS.length}
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
        /* Fullscreen Tracing Canvas Detail View */
        <View style={[styles.detailCard, { backgroundColor: currentItem.bgColor }]}>
          {/* Sparkles */}
          <Animated.View style={[styles.sparkleContainer, { opacity: sparkleAnim }]}>
            <Text style={styles.sparkleText}>✨ ✏️ 🎨</Text>
          </Animated.View>

          {/* Word Header */}
          <View style={styles.titleGroup}>
            <Text style={[styles.wordTitleText, { color: currentItem.accentColor }]}>
              {currentItem.word}
            </Text>
            <Text style={styles.instructionSubtext}>✏️ Draw the number with your finger!</Text>
          </View>

          {/* Drawing Canvas Frame */}
          <View
            style={[styles.drawingCanvasWrapper, { borderColor: currentItem.accentColor }]}
            {...panResponder.panHandlers}
          >
            {/* Faint guide number in background */}
            <View style={styles.guideNumberContainer} pointerEvents="none">
              <Text
                style={[
                  styles.guideNumberText,
                  { color: currentItem.accentColor + '22' },
                ]}
              >
                {currentItem.value}
              </Text>
            </View>

            {/* Marker stroke layer — dense interpolated dots for smooth line */}
            {drawingPoints.map((pt, idx) => {
              // First point of entire drawing OR first point of a new stroke
              const isStrokeStart =
                idx === 0 || pt.strokeId !== drawingPoints[idx - 1].strokeId;

              if (isStrokeStart) {
                return (
                  <View
                    key={pt.id}
                    style={[
                      styles.markerDot,
                      {
                        left: pt.x - 6,
                        top: pt.y - 6,
                        backgroundColor: currentItem.accentColor,
                      },
                    ]}
                    pointerEvents="none"
                  />
                );
              }

              // Interpolate between previous and current point for smooth marker stroke
              const prev = drawingPoints[idx - 1];
              const dx = pt.x - prev.x;
              const dy = pt.y - prev.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const steps = Math.max(Math.floor(dist / 2), 1);
              const interpolated = [];

              for (let s = 0; s <= steps; s++) {
                const t = s / steps;
                interpolated.push(
                  <View
                    key={`${pt.id}_${s}`}
                    style={[
                      styles.markerDot,
                      {
                        left: prev.x + dx * t - 6,
                        top: prev.y + dy * t - 6,
                        backgroundColor: currentItem.accentColor,
                      },
                    ]}
                    pointerEvents="none"
                  />
                );
              }
              return interpolated;
            })}
          </View>

          {/* Navigation Row: Prev / Next */}
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
              disabled={selectedIndex === NUMBERS_ITEMS.length - 1}
              style={[
                styles.navButton,
                selectedIndex === NUMBERS_ITEMS.length - 1 && styles.disabledNav,
              ]}
            >
              <Text style={styles.navButtonText}>Next ➡️</Text>
            </TouchableOpacity>
          </View>

          {/* Action Row: Speak / Done / Clear */}
          <View style={styles.actionRow}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleCardTap} style={styles.speakerButton}>
              <Text style={styles.speakerButtonText}>🔊 Speak</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCheckDrawing}
              style={[styles.checkButton, { backgroundColor: currentItem.accentColor }]}
            >
              <Text style={styles.checkButtonText}>✅ Done</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={clearDrawing} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>🧹 Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* 1-100 Grid View */
        <FlatList
          data={NUMBERS_ITEMS}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          initialNumToRender={18}
          maxToRenderPerBatch={24}
          windowSize={7}
          renderItem={({ item, index }) => (
            <AnimatedNumberCard
              item={item}
              index={index}
              onPress={() => handleSelectNumber(index)}
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
  lottieOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  partyBannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  partyBannerText: {
    fontSize: 32,
    fontWeight: theme.fontWeight.extraBold,
    color: '#E53935',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: theme.radius.xl,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    gap: 6,
  },
  clearBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.radius.round,
  },
  clearBadgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textDark,
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
    margin: 5,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  gridNumberBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  gridNumberText: {
    fontSize: 18,
    fontWeight: theme.fontWeight.extraBold,
    color: '#FFFFFF',
  },
  gridIllustration: {
    fontSize: 26,
    marginVertical: 2,
  },
  gridWord: {
    fontSize: 12,
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
  wordTitleText: {
    fontSize: 34,
    fontWeight: theme.fontWeight.extraBold,
    textAlign: 'center',
  },
  instructionSubtext: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  drawingCanvasWrapper: {
    width: 270,
    height: 250,
    borderRadius: theme.radius.xl,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  guideNumberContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideNumberText: {
    fontSize: 150,
    fontWeight: '900',
    textAlign: 'center',
  },
  markerDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    opacity: 0.8,
  },
  checkButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.round,
    alignItems: 'center',
  },
  checkButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.extraBold,
    color: '#FFFFFF',
  },
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 320,
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320,
    gap: 12,
  },
  speakerButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.round,
    alignItems: 'center',
  },
  speakerButtonText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textDark,
  },
  clearButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.round,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textDark,
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
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textDark,
  },
});
