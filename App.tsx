import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation';

export default function App() {
  return (
    <View style={styles.rootWrapper}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  rootWrapper: {
    flex: 1,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? { maxWidth: '100vw' as any, maxHeight: '100vh' as any }
      : {}),
  },
});
