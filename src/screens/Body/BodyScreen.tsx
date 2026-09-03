import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { BackButton, BodyCard, BodyDetail } from '../../components';
import { BODY_PARTS } from '../../data';
import { theme } from '../../theme';
import { AudioService } from '../../services';

type BodyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Body'>;

interface BodyScreenProps {
  navigation: BodyScreenNavigationProp;
}

export const BodyScreen: React.FC<BodyScreenProps> = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Play audio announcement when Body screen opens
  useEffect(() => {
    AudioService.playWord('My Body');
  }, []);

  // Auto-play slideshow timer effect
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else {
        timer = setTimeout(() => {
          setSelectedIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % BODY_PARTS.length : 0));
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

  const handleSelectBodyItem = (index: number) => {
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
    if (selectedIndex !== null && selectedIndex < BODY_PARTS.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const currentBodyItem = selectedIndex !== null ? BODY_PARTS[selectedIndex] : null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.categoryBody }]}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <BackButton onPress={handleBackToGrid} title={selectedIndex !== null ? 'Grid' : 'Back'} />
        
        <Text style={styles.headerTitle}>My Body</Text>

        <View style={styles.headerActions}>
          {selectedIndex !== null && (
            <Text style={styles.counterText}>
              {selectedIndex + 1} / {BODY_PARTS.length}
            </Text>
          )}

          <TouchableOpacity
            onPress={togglePlay}
            style={[styles.playBadge, isPlaying && styles.stopBadge]}
            activeOpacity={0.8}
          >
            <Text style={styles.playBadgeText}>
              {isPlaying ? 'Stop ⏹' : 'Play ▶'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      {currentBodyItem !== null ? (
        <View style={styles.detailWrapper}>
          <BodyDetail
            bodyItem={currentBodyItem}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={selectedIndex !== null && selectedIndex > 0}
            hasNext={selectedIndex !== null && selectedIndex < BODY_PARTS.length - 1}
          />
        </View>
      ) : (
        <FlatList
          data={BODY_PARTS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <BodyCard bodyItem={item} index={index} onPress={() => handleSelectBodyItem(index)} />
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
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.extraBold,
    color: theme.colors.textDark,
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
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  detailWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: theme.spacing.sm,
  },
});
