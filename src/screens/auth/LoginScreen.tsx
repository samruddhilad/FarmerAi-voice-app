/**
 * Login Screen
 * Google + OTP login options
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Button } from '../../components/common/Button';
import { useGoogleLogin } from '../../hooks/useAuth';
import { useAuthContext } from '../../contexts/AuthContext';
import { AuthScreenProps } from '../../navigation/types';

export const LoginScreen: React.FC<AuthScreenProps<'Login'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { login } = useAuthContext();
  const googleLoginMutation = useGoogleLogin();

  const handleGoogleLogin = async () => {
    // In production, integrate expo-auth-session for Google OAuth
    // For now, the mutation is wired to the API endpoint
    try {
      const result = await googleLoginMutation.mutateAsync({
        id_token: 'google_id_token_placeholder',
      });
      if (result.success) {
        await login(result.data.user, result.data.access_token, result.data.refresh_token);
      }
    } catch {
      // Error handling — toast will show network error
    }
  };

  const handleOTPLogin = () => {
    navigation.navigate('OTPLogin', {});
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header illustration */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={40} color={Colors.white} />
        </View>
        <Text style={styles.title}>Welcome to{'\n'}Farmer AI</Text>
        <Text style={styles.subtitle}>
          Your AI-powered assistant for government schemes and agriculture guidance
        </Text>
      </View>

      {/* Login options */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={[styles.googleButton, Shadows.md]}
          onPress={handleGoogleLogin}
          activeOpacity={0.7}
        >
          <Ionicons name="logo-google" size={20} color="#4285F4" />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <Button
          title="Login with Mobile Number"
          onPress={handleOTPLogin}
          variant="primary"
          size="lg"
          icon="phone-portrait-outline"
          fullWidth
        />

        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      {/* Feature highlights */}
      <View style={styles.features}>
        {[
          { icon: 'shield-checkmark-outline' as const, text: 'Secure & Private' },
          { icon: 'language-outline' as const, text: '12 Languages' },
          { icon: 'flash-outline' as const, text: 'Free to Use' },
        ].map((feature, idx) => (
          <View key={idx} style={styles.featureItem}>
            <Ionicons name={feature.icon} size={16} color={Colors.primary[500]} />
            <Text style={styles.featureText}>{feature.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing['5xl'],
    paddingHorizontal: Spacing['3xl'],
    paddingBottom: Spacing['3xl'],
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  title: {
    ...Typography.h2,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
  },
  loginSection: {
    paddingHorizontal: Spacing['2xl'],
    gap: Spacing.lg,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  googleText: {
    ...Typography.button,
    color: Colors.text.primary,
    fontSize: 15,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray[200],
  },
  dividerText: {
    ...Typography.labelSm,
    color: Colors.text.tertiary,
  },
  terms: {
    ...Typography.bodySm,
    color: Colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: Spacing.sm,
  },
  link: {
    color: Colors.primary[600],
    fontWeight: '500',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
    position: 'absolute',
    bottom: Spacing['5xl'],
    left: 0,
    right: 0,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  featureText: {
    ...Typography.caption,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
});
