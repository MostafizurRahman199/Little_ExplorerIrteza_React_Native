import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { BackButton } from '../../components';
import { theme } from '../../theme';

type ParentsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Parents'>;

interface ParentsScreenProps {
  navigation: ParentsScreenNavigationProp;
}

export const ParentsScreen: React.FC<ParentsScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.categoryParents }]}>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.title}>👨‍👩‍👧 Parent Area</Text>
        <Text style={styles.subtitle}>Family profiles & audio settings</Text>
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
