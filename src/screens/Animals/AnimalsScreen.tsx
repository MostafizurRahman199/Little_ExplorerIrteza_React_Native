import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { BackButton } from '../../components';
import { theme } from '../../theme';

type AnimalsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Animals'>;

interface AnimalsScreenProps {
  navigation: AnimalsScreenNavigationProp;
}

export const AnimalsScreen: React.FC<AnimalsScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.categoryAnimals }]}>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.title}>🐶 Animals</Text>
        <Text style={styles.subtitle}>Meet your friendly animal friends!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.screenPadding,
    paddingTop: theme.spacing.md,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.extraBold,
    color: theme.colors.textDark,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
  },
});
