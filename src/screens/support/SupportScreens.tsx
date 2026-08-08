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
// ── About Screen ──────────────────────────────────────────────────────
export const AboutScreen: React.FC<any> = ({ navigation }) => (
  <View style={styles.container}>
    <ScreenHeader title="About" onBack={() => navigation.goBack()} />
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* App Header Section */}
      <View style={styles.aboutHeader}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={40} color={Colors.white} />
        </View>
        <Text style={styles.appName}>Farmer AI</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      {/* Main Info Card */}
      <View style={aboutStyles.card}>
        <Text style={aboutStyles.cardTitle}>About Farmer AI</Text>
        <Text style={aboutStyles.cardText}>
          Farmer AI is a premium, voice-first agricultural assistant designed to bridge the digital gap for Indian farmers. By providing trilingual and regional voice assistance, it allows farmers to easily discover government welfare schemes, check eligibility, and get direct farm advice just by speaking.
        </Text>
      </View>

      {/* Vision & Mission */}
      <View style={aboutStyles.card}>
        <Text style={aboutStyles.cardTitle}>Vision & Mission</Text>
        <View style={aboutStyles.bulletRow}>
          <Ionicons name="eye-outline" size={20} color={Colors.primary[600]} style={aboutStyles.bulletIcon} />
          <View style={aboutStyles.bulletTextWrap}>
            <Text style={aboutStyles.bulletLabel}>Our Vision</Text>
            <Text style={aboutStyles.bulletText}>To democratize access to agricultural intelligence and government support for every farmer in India, regardless of language or literacy barriers.</Text>
          </View>
        </View>
        <View style={aboutStyles.bulletRow}>
          <Ionicons name="flag-outline" size={20} color={Colors.primary[600]} style={aboutStyles.bulletIcon} />
          <View style={aboutStyles.bulletTextWrap}>
            <Text style={aboutStyles.bulletLabel}>Our Mission</Text>
            <Text style={aboutStyles.bulletText}>To build highly localized, voice-enabled AI solutions that empower farming communities with instant, actionable guidance on crop health, soil welfare, market rates, and welfare eligibility.</Text>
          </View>
        </View>
      </View>

      {/* AI Features */}
      <View style={aboutStyles.card}>
        <Text style={aboutStyles.cardTitle}>Core AI Features</Text>

        <View style={aboutStyles.featureItem}>
          <View style={aboutStyles.featureHeader}>
            <Ionicons name="document-text" size={18} color="#FF8A00" />
            <Text style={aboutStyles.featureName}>Government Scheme Support</Text>
          </View>
          <Text style={aboutStyles.featureDesc}>Automatic eligibility mapping and trilingual instructions for central and state schemes.</Text>
        </View>

        <View style={aboutStyles.featureItem}>
          <View style={aboutStyles.featureHeader}>
            <Ionicons name="flower" size={18} color="#FF8A00" />
            <Text style={aboutStyles.featureName}>Crop Recommendation</Text>
          </View>
          <Text style={aboutStyles.featureDesc}>Smart soil-to-crop guidance based on geographic indicators, land sizes, and regional inputs.</Text>
        </View>

        <View style={aboutStyles.featureItem}>
          <View style={aboutStyles.featureHeader}>
            <Ionicons name="bug" size={18} color="#FF8A00" />
            <Text style={aboutStyles.featureName}>Crop Disease Detection</Text>
          </View>
          <Text style={aboutStyles.featureDesc}>Identify crop pests and leaf leaf-spots instantly using AI-powered diagnostic recommendations.</Text>
        </View>

        <View style={aboutStyles.featureItem}>
          <View style={aboutStyles.featureHeader}>
            <Ionicons name="thunderstorm" size={18} color="#FF8A00" />
            <Text style={aboutStyles.featureName}>Weather Forecast</Text>
          </View>
          <Text style={aboutStyles.featureDesc}>Micro-local weather insights with voice alerts to protect crops during storm events.</Text>
        </View>
      </View>

      {/* Technology Stack */}
      <View style={aboutStyles.card}>
        <Text style={aboutStyles.cardTitle}>Technology Stack</Text>
        <Text style={aboutStyles.cardText}>Built with state-of-the-art technologies for smooth multi-platform delivery:</Text>
        <View style={aboutStyles.tagContainer}>
          {['React Native', 'Expo', 'TypeScript', 'Axios', 'React Query', 'LLM Agents', 'Whisper Speech API'].map((tag) => (
            <View key={tag} style={aboutStyles.tag}>
              <Text style={aboutStyles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Contact & Support */}
      <View style={aboutStyles.card}>
        <Text style={aboutStyles.cardTitle}>Contact & Support</Text>
        <View style={aboutStyles.bulletRow}>
          <Ionicons name="mail-outline" size={16} color={Colors.primary[600]} />
          <Text style={aboutStyles.contactText}>Email: support@farmervoice.in</Text>
        </View>
        <View style={aboutStyles.bulletRow}>
          <Ionicons name="call-outline" size={16} color={Colors.primary[600]} />
          <Text style={aboutStyles.contactText}>Helpline: +91 1800 200 3456</Text>
        </View>
        <TouchableOpacity
          style={aboutStyles.privacyButton}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Text style={aboutStyles.privacyText}>View Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.primary[600]} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 40 }} />
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
  aboutHeader: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
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

const aboutStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary[600],
    marginBottom: Spacing.md,
  },
  cardText: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: Spacing.xs,
    gap: Spacing.sm,
  },
  bulletIcon: {
    marginTop: 2,
  },
  bulletTextWrap: {
    flex: 1,
  },
  bulletLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text.primary,
  },
  bulletText: {
    fontSize: 12,
    color: Colors.text.secondary,
    lineHeight: 16,
  },
  featureItem: {
    marginBottom: Spacing.md,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 2,
  },
  featureName: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text.primary,
  },
  featureDesc: {
    fontSize: 12,
    color: Colors.text.secondary,
    lineHeight: 16,
    marginLeft: 22,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  tag: {
    backgroundColor: Colors.primary[50],
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.1)',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary[700],
  },
  contactText: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  privacyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  privacyText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary[600],
  },
});
