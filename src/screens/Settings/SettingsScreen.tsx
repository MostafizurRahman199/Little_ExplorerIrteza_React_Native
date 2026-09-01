import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { BackButton } from '../../components';
import { theme } from '../../theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'> };

export const SettingsScreen: React.FC<Props> = ({ navigation }) => (
  <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.categorySettings }]}>
    <View style={styles.header}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.headerTitle}>⚙️ Settings</Text>
    </View>
    <View style={styles.body}>
      <Text style={styles.emoji}>⚙️ 🔊 🎵 🎨</Text>
      <Text style={styles.title}>Audio & Theme Settings</Text>
      <Text style={styles.subtitle}>Phase 15/17 Module Ready</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.md },
  headerTitle: { fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, marginLeft: theme.spacing.md, color: theme.colors.textMuted },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.lg },
  emoji: { fontSize: 60, marginBottom: theme.spacing.md },
  title: { fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold, color: theme.colors.textDark },
  subtitle: { fontSize: theme.fontSize.md, color: theme.colors.textMuted, marginTop: theme.spacing.xs },
});
