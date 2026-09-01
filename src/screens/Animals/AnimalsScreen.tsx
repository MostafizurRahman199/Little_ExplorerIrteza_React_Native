import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { BackButton, AnimalCard, AnimalDetail } from '../../components';
import { ANIMALS } from '../../data';
import { theme } from '../../theme';

type AnimalsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Animals'>;

interface AnimalsScreenProps {
  navigation: AnimalsScreenNavigationProp;
}

export const AnimalsScreen: React.FC<AnimalsScreenProps> = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelectAnimal = (index: number) => {
    setSelectedIndex(index);
  };

  const handleBackToGrid = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(null);
    } else {
      navigation.goBack();
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < ANIMALS.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const currentAnimal = selectedIndex !== null ? ANIMALS[selectedIndex] : null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.categoryAnimals }]}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <BackButton onPress={handleBackToGrid} title={selectedIndex !== null ? 'Grid' : 'Back'} />
        <Text style={styles.headerTitle}>🐶 Animal Friends</Text>
        {selectedIndex !== null ? (
          <Text style={styles.counterText}>
            {selectedIndex + 1} / {ANIMALS.length}
          </Text>
        ) : (
          <TouchableOpacity onPress={() => setSelectedIndex(0)} style={styles.playAllBadge}>
            <Text style={styles.playAllText}>Play ▶</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Content Area */}
      {currentAnimal !== null ? (
        <View style={styles.detailWrapper}>
          <AnimalDetail
            animal={currentAnimal}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={selectedIndex !== null && selectedIndex > 0}
            hasNext={selectedIndex !== null && selectedIndex < ANIMALS.length - 1}
          />
        </View>
      ) : (
        <FlatList
          data={ANIMALS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <AnimalCard animal={item} onPress={() => handleSelectAnimal(index)} />
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
  counterText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textMuted,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.round,
  },
  playAllBadge: {
    backgroundColor: theme.colors.accentOrange,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.radius.round,
  },
  playAllText: {
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
