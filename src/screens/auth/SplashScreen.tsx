/**
 * Splash Screen
 * Animated logo → auto-navigate to Onboarding or Main
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '../../theme';
import { useAuthContext } from '../../contexts/AuthContext';
import { AuthScreenProps } from '../../navigation/types';

export const SplashScreen: React.FC<AuthScreenProps<'Splash'>> = ({ navigation }) => {
  const { isAuthenticated, hasOnboarded, isLoading } = useAuthContext();
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate in
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ scale: logoScale }], opacity: logoOpacity },
        ]}
      >
        <View style={styles.logo}>
          <Ionicons name="leaf" size={48} color={Colors.white} />
        </View>
      </Animated.View>

      <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
        <Text style={styles.title}>Farmer AI</Text>
        <Text style={styles.subtitle}>Your Voice Assistant for Agriculture</Text>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: textOpacity }]}>
        <Text style={styles.footerText}>Made for Indian Farmers 🌾</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    ...Typography.h2,
    color: Colors.primary[700],
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
  },
  footerText: {
    ...Typography.bodySm,
    color: Colors.text.tertiary,
  },
});
