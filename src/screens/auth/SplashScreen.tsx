/**
 * Production-Ready Reanimated Splash Screen — Krishi Mitra / Farmer AI
 * 
 * Features:
 * - Uses react-native-reanimated for 60fps spring & fade entrance/exit animations
 * - Interacts with expo-splash-screen to prevent white/black flash
 * - Respects global language state from LanguageContext (AsyncStorage app_selected_language)
 * - Renders Krishi Mitra leaf logo with soft outer pulse ring and subtle agricultural decorations
 * - Props: { onFinish?: () => void }
 * - Exported as default component matching specification
 */

import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SplashScreenNative from 'expo-splash-screen';

import { useAuthContext } from '../../contexts/AuthContext';
import { useLanguageContext } from '../../contexts/LanguageContext';

// Keep native splash screen visible while JS loads
try {
  SplashScreenNative.preventAutoHideAsync().catch(() => {});
} catch {
  // Ignore in environments where native module is not linked
}

export interface SplashScreenProps {
  onFinish?: () => void;
  navigation?: any;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, navigation }) => {
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isLoading } = useAuthContext();
  const { t } = useLanguageContext();

  // Reanimated Shared Values
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(18);

  const taglineOpacity = useSharedValue(0);
  const footerOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  // Complete initialization and exit sequence
  const handleCompleteExit = useCallback(() => {
    // Hide native splash screen
    try {
      SplashScreenNative.hideAsync().catch(() => {});
    } catch {}

    if (onFinish) {
      onFinish();
    } else if (navigation) {
      if (isAuthenticated) {
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        navigation.replace('Login');
      }
    }
  }, [onFinish, navigation, isAuthenticated]);

  useEffect(() => {
    // 1. Entrance Animations
    // Logo entrance (800ms spring scale & opacity)
    logoOpacity.value = withTiming(1, { duration: 600 });
    logoScale.value = withSpring(1, {
      damping: 10,
      stiffness: 80,
      mass: 0.8,
    });

    // App Name entrance (500ms fade & slide up after 400ms delay)
    titleOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    titleTranslateY.value = withDelay(
      400,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.quad) })
    );

    // Tagline & Footer entrance (400ms fade in after 800ms delay)
    taglineOpacity.value = withDelay(700, withTiming(1, { duration: 400 }));
    footerOpacity.value = withDelay(900, withTiming(1, { duration: 400 }));

    // Continuous subtle pulse glow for logo
    pulseScale.value = withDelay(
      600,
      withRepeat(
        withSequence(
          withTiming(1.15, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, []);

  useEffect(() => {
    // 2. Transition trigger after loading & entrance
    if (!isLoading) {
      const exitTimer = setTimeout(() => {
        // Fade out custom splash screen (400ms) then trigger exit
        containerOpacity.value = withTiming(0, { duration: 400 }, (isFinished) => {
          if (isFinished) {
            runOnJS(handleCompleteExit)();
          }
        });
      }, 1900);

      return () => clearTimeout(exitTimer);
    }
  }, [isLoading, handleCompleteExit]);

  // Reanimated Animated Styles
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const footerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
  }));

  return (
    <Animated.View style={[styles.outerFlex, containerAnimatedStyle]}>
      <LinearGradient
        colors={['#F3FAF5', '#EAF6EE', '#F7F9F7']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[
          styles.container,
          {
            paddingTop: insets.top + 20,
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
      >
        {/* Subtle Background Accent Blobs */}
        <View style={styles.bgBlobTopRight} />
        <View style={styles.bgBlobBottomLeft} />

        {/* Centered Composition */}
        <View style={styles.centerWrapper}>
          {/* Logo Container with Soft Pulse Ring */}
          <Animated.View style={[styles.logoWrapper, logoAnimatedStyle]}>
            <Animated.View style={[styles.pulseRing, pulseAnimatedStyle]} />

            {/* Primary Green Circle Logo Card */}
            <View style={styles.primaryLogoCard}>
              <Ionicons name="leaf" size={44} color="#FFFFFF" />
            </View>

            {/* Subtle Side Decorative Leaf Badges */}
            <View style={[styles.sideLeafBadge, styles.sideLeafLeft]}>
              <Ionicons name="leaf-outline" size={14} color="#187A3D" />
            </View>
            <View style={[styles.sideLeafBadge, styles.sideLeafRight]}>
              <Ionicons name="sparkles" size={14} color="#187A3D" />
            </View>
          </Animated.View>

          {/* App Name & Branding */}
          <Animated.View style={[styles.titleWrapper, titleAnimatedStyle]}>
            <Text style={styles.appTitle}>{t('krishiMitra') || 'Krishi Mitra'}</Text>

            <View style={styles.brandBadge}>
              <Ionicons name="hardware-chip-outline" size={13} color="#187A3D" />
              <Text style={styles.brandBadgeText}>Farmer AI • VOICE ASSISTANT</Text>
            </View>
          </Animated.View>

          {/* Localized Tagline */}
          <Animated.View style={[styles.taglineWrapper, taglineAnimatedStyle]}>
            <Text style={styles.taglineText}>
              {t('splashTagline') || 'Your smart farming companion'}
            </Text>
          </Animated.View>
        </View>

        {/* Minimal Loading Indicator & Footer */}
        <Animated.View style={[styles.footerWrapper, footerAnimatedStyle]}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#187A3D" />
          </View>

          <View style={styles.footerGovPill}>
            <Ionicons name="shield-checkmark" size={14} color="#187A3D" />
            <Text style={styles.footerGovText}>AI Powered Agriculture Platform</Text>
          </View>

          <Text style={styles.footerFarmerText}>Dedicated to Indian Farmers 🌾</Text>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  outerFlex: {
    flex: 1,
    backgroundColor: '#F3FAF5',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  bgBlobTopRight: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(234, 246, 238, 0.75)',
  },
  bgBlobBottomLeft: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 270,
    height: 270,
    borderRadius: 135,
    backgroundColor: 'rgba(243, 250, 245, 0.95)',
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
  },
  logoWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  pulseRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(24, 122, 61, 0.15)',
  },
  primaryLogoCard: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#187A3D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#187A3D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  sideLeafBadge: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EAF6EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDE5E0',
  },
  sideLeafLeft: {
    left: -24,
    top: 10,
  },
  sideLeafRight: {
    right: -24,
    bottom: 10,
  },
  titleWrapper: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#172033',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EAF6EE',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C8E6D1',
    marginBottom: 16,
  },
  brandBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#187A3D',
    letterSpacing: 0.3,
  },
  taglineWrapper: {
    paddingHorizontal: 20,
  },
  taglineText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5F6B7A',
    textAlign: 'center',
    lineHeight: 22,
  },
  footerWrapper: {
    alignItems: 'center',
    gap: 10,
  },
  loadingContainer: {
    marginBottom: 4,
  },
  footerGovPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDE5E0',
    shadowColor: '#187A3D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  footerGovText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#187A3D',
  },
  footerFarmerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5F6B7A',
  },
});
