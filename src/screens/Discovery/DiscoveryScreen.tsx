import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { BackButton } from '../../components';
import { theme } from '../../theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Discovery'> };

export const DiscoveryScreen: React.FC<Props> = ({ navigation }) => (
  <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.categoryDiscovery }]}>
    <View style={styles.header}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.headerTitle}>🌎 Discovery</Text>
    </View>
    <View style={styles.body}>
      <Text style={styles.emoji}>☀️ ☁️ 🌳 🌸 🦋</Text>
      <Text style={styles.title}>Discovery World Scene</Text>
      <Text style={styles.subtitle}>Phase 12 Module Ready</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.md },
  headerTitle: { fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, marginLeft: theme.spacing.md, color: theme.colors.accentGreen },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.lg },
  emoji: { fontSize: 60, marginBottom: theme.spacing.md },
  title: { fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold, color: theme.colors.textDark },
  subtitle: { fontSize: theme.fontSize.md, color: theme.colors.textMuted, marginTop: theme.spacing.xs },
});
