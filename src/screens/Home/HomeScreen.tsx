import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { CATEGORIES } from '../../constants/categories';
import { CategoryCard, AnimatedCharacter } from '../../components';
import { theme } from '../../theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Screen entrance stagger animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Soft ambient background bubble movement
    const bgLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bubbleAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );
    bgLoop.start();
    return () => bgLoop.stop();
  }, [fadeAnim, slideAnim, bubbleAnim]);

  const bubbleOneY = bubbleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const bubbleTwoY = bubbleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Decorative Soft Animated Playroom Background Bubbles */}
      <Animated.View
        style={[
          styles.ambientBubble,
          styles.bubbleLeft,
          { transform: [{ translateY: bubbleOneY }] },
        ]}
      />
      <Animated.View
        style={[
          styles.ambientBubble,
          styles.bubbleRight,
          { transform: [{ translateY: bubbleTwoY }] },
        ]}
      />

      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🧸 Little Explorer : Irteza</Text>
          <Text style={styles.subtitle}>Touch & Play to Learn!</Text>
        </View>

        <AnimatedCharacter
          name="Bubu"
          greeting="Let's play together, Irteza! Pick a card below 🌟"
        />

        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={() => navigation.navigate(item.id)}
            />
          )}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.screenPadding,
    paddingTop: theme.spacing.md,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.extraBold,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  ambientBubble: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.15,
  },
  bubbleLeft: {
    width: 140,
    height: 140,
    backgroundColor: theme.colors.accentYellow,
    top: 40,
    left: -40,
  },
  bubbleRight: {
    width: 180,
    height: 180,
    backgroundColor: theme.colors.accentBlue,
    bottom: 80,
    right: -50,
  },
});
