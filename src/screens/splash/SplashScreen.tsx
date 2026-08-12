/**
 * SplashScreen — Animated Entry Screen
 *
 * Flow:
 *  1. Mounts while native splash is still visible
 *  2. Runs async initialization (session restore, font preloading, minimum wait)
 *  3. Triggers entrance animations via Reanimated
 *  4. Hides native splash screen
 *  5. Calls `onFinish` to hand off to Auth/Main stack
 */

import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SplashScreenProps {
  /** Called once all animations complete and the app is ready to navigate */
  onFinish: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LOGO_SIZE = SCREEN_WIDTH * 0.38;

const TIMING = {
  MIN_DISPLAY_MS: 2500,
  LOGO_SPRING_MS: 800,
  NAME_FADE_DELAY_MS: 400,
  NAME_FADE_MS: 600,
  TAGLINE_DELAY_MS: 700,
  TAGLINE_FADE_MS: 500,
  EXIT_DELAY_MS: 900,
  EXIT_FADE_MS: 600,
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // ── Animated values ──────────────────────────────────────────────────────

  /** Logo: scale + opacity entrance */
  const logoScale = useSharedValue(0.78);
  const logoOpacity = useSharedValue(0);

  /** App name: fade-in */
  const nameOpacity = useSharedValue(0);
  const nameTranslateY = useSharedValue(12);

  /** Tagline: fade-in */
  const taglineOpacity = useSharedValue(0);
  const taglineTranslateY = useSharedValue(8);

  /** Entire screen: exit fade */
  const screenOpacity = useSharedValue(1);

  // ── Animated styles ──────────────────────────────────────────────────────

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const nameAnimatedStyle = useAnimatedStyle(() => ({
    opacity: nameOpacity.value,
    transform: [{ translateY: nameTranslateY.value }],
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }],
  }));

  const screenAnimatedStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  // ── Initialization ───────────────────────────────────────────────────────

  const runExitAnimation = useCallback(() => {
    screenOpacity.value = withDelay(
      TIMING.EXIT_DELAY_MS,
      withTiming(0, { duration: TIMING.EXIT_FADE_MS, easing: Easing.out(Easing.ease) }, () => {
        runOnJS(onFinish)();
      })
    );
  }, [screenOpacity, onFinish]);

  const runEntranceAnimations = useCallback(() => {
    // Logo: spring scale + fade
    logoScale.value = withSpring(1, {
      damping: 14,
      stiffness: 100,
      mass: 0.9,
    });
    logoOpacity.value = withTiming(1, {
      duration: TIMING.LOGO_SPRING_MS,
      easing: Easing.out(Easing.ease),
    });

    // App name: delayed fade up
    nameOpacity.value = withDelay(
      TIMING.NAME_FADE_DELAY_MS,
      withTiming(1, { duration: TIMING.NAME_FADE_MS, easing: Easing.out(Easing.ease) })
    );
    nameTranslateY.value = withDelay(
      TIMING.NAME_FADE_DELAY_MS,
      withTiming(0, { duration: TIMING.NAME_FADE_MS, easing: Easing.out(Easing.ease) })
    );

    // Tagline: further delayed fade up
    taglineOpacity.value = withDelay(
      TIMING.TAGLINE_DELAY_MS,
      withTiming(1, { duration: TIMING.TAGLINE_FADE_MS, easing: Easing.out(Easing.ease) })
    );
    taglineTranslateY.value = withDelay(
      TIMING.TAGLINE_DELAY_MS,
      withTiming(0, { duration: TIMING.TAGLINE_FADE_MS, easing: Easing.out(Easing.ease) })
    );
  }, [logoScale, logoOpacity, nameOpacity, nameTranslateY, taglineOpacity, taglineTranslateY]);

  const initialize = useCallback(async () => {
    try {
      // ── Place async init tasks here ──────────────────────────────────────
      // e.g. await Font.loadAsync({ ... });
      // e.g. await SecureStore.getItemAsync('auth_access_token');

      // Minimum display window — keeps splash visible while tasks run
      await new Promise<void>((resolve) => setTimeout(resolve, TIMING.MIN_DISPLAY_MS));
    } catch {
      // Non-blocking: swallow errors so we never get stuck on splash
    } finally {
      runEntranceAnimations();
      runExitAnimation();
    }
  }, [runEntranceAnimations, runExitAnimation]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <Animated.View style={[styles.container, screenAnimatedStyle]}>
      {/* ── Decorative background ambient glows ── */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      {/* ── Center: Logo + Name + Tagline ── */}
      <View style={styles.centerContent}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.logoRing}>
            <Image
              source={require('../../../assets/splash-icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.View style={nameAnimatedStyle}>
          <Text style={styles.appName}>FarmerAI</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={taglineAnimatedStyle}>
          <Text style={styles.tagline}>Your Voice, Your Farm, Your Future</Text>
        </Animated.View>
      </View>

      {/* ── Loading Indicator — bottom anchored ── */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="small"
          color="rgba(46, 125, 50, 0.85)"
          style={styles.loader}
        />
        <Text style={styles.loadingText}>Initializing…</Text>
      </View>

      {/* ── Powered-by badge ── */}
      <View style={styles.poweredByContainer}>
        <Text style={styles.poweredBy}>Powered by Gemini AI</Text>
      </View>
    </Animated.View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F17',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Decorative ambient glows ──────────────────────────────────────────────
  glowTop: {
    position: 'absolute',
    top: -SCREEN_HEIGHT * 0.12,
    left: -SCREEN_WIDTH * 0.25,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.9,
    borderRadius: SCREEN_WIDTH * 0.45,
    backgroundColor: 'rgba(46, 125, 50, 0.08)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -SCREEN_HEIGHT * 0.1,
    right: -SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: SCREEN_WIDTH * 0.4,
    backgroundColor: 'rgba(102, 187, 106, 0.05)',
  },

  // ── Center content ────────────────────────────────────────────────────────
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Logo ──────────────────────────────────────────────────────────────────
  logoContainer: {
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRing: {
    width: LOGO_SIZE + 24,
    height: LOGO_SIZE + 24,
    borderRadius: (LOGO_SIZE + 24) / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(46, 125, 50, 0.35)',
    backgroundColor: 'rgba(46, 125, 50, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
    elevation: 12,
  },
  logoImage: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
  },

  // ── App Name ──────────────────────────────────────────────────────────────
  appName: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2.5,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(46, 125, 50, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },

  // ── Tagline ───────────────────────────────────────────────────────────────
  tagline: {
    fontSize: 13.5,
    color: 'rgba(255, 255, 255, 0.45)',
    textAlign: 'center',
    letterSpacing: 0.6,
    lineHeight: 20,
    paddingHorizontal: 32,
    fontWeight: '400',
  },

  // ── Loading indicator ─────────────────────────────────────────────────────
  loadingContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 90 : 72,
    alignItems: 'center',
  },
  loader: {
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.28)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontWeight: '500',
  },

  // ── Powered by ────────────────────────────────────────────────────────────
  poweredByContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 42 : 24,
  },
  poweredBy: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.18)',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
});

export default SplashScreen;
