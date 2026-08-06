/**
 * About, Privacy, Terms, Offline, Error, NotFound, Loading support screens
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, BorderRadius } from '../../theme';
import { Button } from '../../components/common/Button';

// ── Shared Header ─────────────────────────────────────────────────────
const ScreenHeader: React.FC<{ title: string; onBack: () => void }> = ({ title, onBack }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[headerStyles.container, { paddingTop: insets.top + Spacing.sm }]}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
      </TouchableOpacity>
      <Text style={headerStyles.title}>{title}</Text>
    </View>
  );
};
const headerStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md, gap: Spacing.md },
  title: { ...Typography.h5, color: Colors.text.primary },
});

// ── About Screen ──────────────────────────────────────────────────────
export const AboutScreen: React.FC<any> = ({ navigation }) => (
  <View style={styles.container}>
    <ScreenHeader title="About" onBack={() => navigation.goBack()} />
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.logoContainer}>
        <Ionicons name="leaf" size={40} color={Colors.white} />
      </View>
      <Text style={styles.appName}>Farmer AI</Text>
      <Text style={styles.version}>Version 1.0.0</Text>
      <Text style={styles.bodyText}>
        Farmer AI Voice Assistant is designed to help Indian farmers discover government schemes, check eligibility, get agricultural guidance, and access information in their preferred language.{'\n\n'}
        Built with ❤️ for Indian farmers.{'\n\n'}
        Our mission is to bridge the information gap and empower farmers with AI-powered assistance in 12 regional languages.
      </Text>
    </ScrollView>
  </View>
);

// ── Privacy Policy Screen ─────────────────────────────────────────────
export const PrivacyPolicyScreen: React.FC<any> = ({ navigation }) => (
  <View style={styles.container}>
    <ScreenHeader title="Privacy Policy" onBack={() => navigation.goBack()} />
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.bodyText}>
        <Text style={styles.bold}>Effective Date:</Text> January 1, 2025{'\n\n'}
        We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.{'\n\n'}
        <Text style={styles.bold}>Information We Collect</Text>{'\n'}
        • Personal information (name, mobile number, email){'\n'}
        • Location data (state, district){'\n'}
        • Voice recordings (for AI assistance){'\n'}
        • Usage analytics{'\n\n'}
        <Text style={styles.bold}>How We Use Your Information</Text>{'\n'}
        • To provide personalized scheme recommendations{'\n'}
        • To check eligibility for government schemes{'\n'}
        • To improve our AI assistant{'\n'}
        • To send relevant notifications{'\n\n'}
        <Text style={styles.bold}>Data Security</Text>{'\n'}
        We implement industry-standard security measures to protect your data. Your voice recordings are processed securely and not shared with third parties.{'\n\n'}
        <Text style={styles.bold}>Contact</Text>{'\n'}
        For questions about this policy, contact us at privacy@farmervoice.in
      </Text>
    </ScrollView>
  </View>
);

// ── Terms & Conditions Screen ─────────────────────────────────────────
export const TermsScreen: React.FC<any> = ({ navigation }) => (
  <View style={styles.container}>
    <ScreenHeader title="Terms & Conditions" onBack={() => navigation.goBack()} />
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.bodyText}>
        <Text style={styles.bold}>Last Updated:</Text> January 1, 2025{'\n\n'}
        By using Farmer AI Voice Assistant, you agree to these terms.{'\n\n'}
        <Text style={styles.bold}>Use of Service</Text>{'\n'}
        • The app provides information about government schemes and agricultural guidance{'\n'}
        • Information is for reference only and may not be fully up-to-date{'\n'}
        • Always verify scheme details with official government sources{'\n\n'}
        <Text style={styles.bold}>User Responsibilities</Text>{'\n'}
        • Provide accurate information for eligibility checks{'\n'}
        • Do not misuse the voice assistant{'\n'}
        • Keep your account credentials secure{'\n\n'}
        <Text style={styles.bold}>Disclaimer</Text>{'\n'}
        We provide information as-is. We are not responsible for decisions made based on the information provided by our AI assistant. Government scheme details are sourced from publicly available data and may change without notice.
      </Text>
    </ScrollView>
  </View>
);

// ── Offline Screen ────────────────────────────────────────────────────
export const OfflineScreen: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <View style={styles.centerContainer}>
    <View style={[styles.iconCircle, { backgroundColor: Colors.warningBg }]}>
      <Ionicons name="cloud-offline-outline" size={48} color={Colors.warning} />
    </View>
    <Text style={styles.centerTitle}>No Internet Connection</Text>
    <Text style={styles.centerSubtitle}>Please check your connection and try again.</Text>
    {onRetry && <Button title="Retry" onPress={onRetry} variant="primary" size="md" icon="refresh" style={{ marginTop: Spacing.xl }} />}
  </View>
);

// ── Loading Screen ────────────────────────────────────────────────────
export const LoadingScreen: React.FC = () => (
  <View style={styles.centerContainer}>
    <View style={styles.logoContainer}>
      <Ionicons name="leaf" size={32} color={Colors.white} />
    </View>
    <ActivityIndicator size="large" color={Colors.primary[500]} style={{ marginTop: Spacing.xl }} />
    <Text style={[styles.centerSubtitle, { marginTop: Spacing.md }]}>Loading...</Text>
  </View>
);

// ── Error Screen ──────────────────────────────────────────────────────
export const ErrorScreen: React.FC<{ onRetry?: () => void; message?: string }> = ({ onRetry, message }) => (
  <View style={styles.centerContainer}>
    <View style={[styles.iconCircle, { backgroundColor: Colors.errorBg }]}>
      <Ionicons name="alert-circle-outline" size={48} color={Colors.error} />
    </View>
    <Text style={styles.centerTitle}>Something Went Wrong</Text>
    <Text style={styles.centerSubtitle}>{message || 'An unexpected error occurred. Please try again.'}</Text>
    {onRetry && <Button title="Try Again" onPress={onRetry} variant="primary" size="md" icon="refresh" style={{ marginTop: Spacing.xl }} />}
  </View>
);

// ── 404 Screen ────────────────────────────────────────────────────────
export const NotFoundScreen: React.FC<{ onGoHome?: () => void }> = ({ onGoHome }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.notFoundCode}>404</Text>
    <Text style={styles.centerTitle}>Page Not Found</Text>
    <Text style={styles.centerSubtitle}>The page you're looking for doesn't exist.</Text>
    {onGoHome && <Button title="Go Home" onPress={onGoHome} variant="primary" size="md" icon="home-outline" style={{ marginTop: Spacing.xl }} />}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: Spacing.xl, paddingBottom: 100 },
  logoContainer: {
    width: 72, height: 72, borderRadius: 20, backgroundColor: Colors.primary[500],
    justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.lg,
  },
  appName: { ...Typography.h3, color: Colors.text.primary, marginBottom: Spacing.xs },
  version: { ...Typography.bodySm, color: Colors.text.tertiary, marginBottom: Spacing['2xl'] },
  bodyText: { ...Typography.body, color: Colors.text.secondary, lineHeight: 24 },
  bold: { fontWeight: '600', color: Colors.text.primary },
  centerContainer: {
    flex: 1, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: Spacing['3xl'],
  },
  iconCircle: {
    width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  centerTitle: { ...Typography.h4, color: Colors.text.primary, textAlign: 'center', marginBottom: Spacing.sm },
  centerSubtitle: { ...Typography.body, color: Colors.text.secondary, textAlign: 'center', lineHeight: 22 },
  notFoundCode: { fontSize: 64, fontWeight: '800', color: Colors.primary[200], marginBottom: Spacing.md },
});
