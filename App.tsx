/**
 * Farmer Voice AI Assistant — App Entry Point
 *
 * Wraps the app with all required providers:
 * - QueryClientProvider (React Query)
 * - AuthProvider
 * - LanguageProvider
 * - SafeAreaProvider
 * - NavigationContainer
 */

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/api/queryClient';
import { AuthProvider } from './src/contexts/AuthContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { RootNavigator } from './src/navigation/RootNavigator';

const isWeb = Platform.OS === 'web';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.webContainer}>
        <View style={styles.mobileFrame}>
          <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <LanguageProvider>
                  <ThemeProvider>
                    <NavigationContainer>
                      <StatusBar style="auto" />
                      <RootNavigator />
                    </NavigationContainer>
                  </ThemeProvider>
                </LanguageProvider>
              </AuthProvider>
            </QueryClientProvider>
          </SafeAreaProvider>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: isWeb ? '#E2E8F0' : '#FFFFFF',
  },
  webContainer: {
    flex: 1,
    alignItems: isWeb ? 'center' : undefined,
    justifyContent: isWeb ? 'center' : undefined,
    backgroundColor: isWeb ? '#E2E8F0' : '#FFFFFF',
  },
  mobileFrame: {
    flex: 1,
    width: '100%',
    maxWidth: isWeb ? 450 : undefined,
    maxHeight: isWeb ? 900 : undefined,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderRadius: isWeb ? 24 : 0,
    marginVertical: isWeb ? 16 : 0,
  },
});
