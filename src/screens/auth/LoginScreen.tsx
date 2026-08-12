/**
 * Login Screen — Krishi Mitra
 * Clean, mobile-first, card-based login inspired by reference image.
 * Features mobile input with +91 prefix, Send OTP, Google login,
 * language switcher dropdown, and pastel green design system.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { useGoogleLogin } from '../../hooks/useAuth';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { Language } from '../../types/api.types';
import { AuthScreenProps } from '../../navigation/types';

const LANGUAGES: Language[] = [
  { code: 'mr', name: 'मराठी' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ahr', name: 'अहिराणी' },
  { code: 'kok', name: 'कोंकणी' },
];

export const LoginScreen: React.FC<AuthScreenProps<'Login'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { login } = useAuthContext();
  const { t, selectedLanguage, setLanguage } = useLanguageContext();
  const googleLoginMutation = useGoogleLogin();

  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  const handleSendOTP = () => {
    const cleanNum = mobileNumber.replace(/\D/g, '');
    if (cleanNum.length < 10) {
      setErrorMsg(t('mobilePlaceholder'));
      return;
    }
    setErrorMsg('');
    navigation.navigate('OTPLogin', { mobile: cleanNum });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLoginMutation.mutateAsync({
        id_token: 'google_id_token_placeholder',
      });
      if (result.success) {
        await login(result.data.user, result.data.access_token, result.data.refresh_token);
      }
    } catch {
      // API mutation fallback demo login
      await login(
        { id: '1', name: 'Shri Farmer', email: 'farmer@farmerai.org', mobile: '9876543210', preferred_language: selectedLanguage.code },
        'demo_token',
        'demo_refresh'
      );
    }
  };

  return (
    <LinearGradient
      colors={['#F8FFFA', '#EBF7EE', '#DCFCE7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      {/* Background Decorative Soft Blobs */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Top Header with Language Dropdown Switcher */}
      <View style={styles.topHeader}>
        <View style={styles.brandTag}>
          <Ionicons name="leaf" size={16} color="#15803D" />
          <Text style={styles.brandTagText}>{t('krishiMitra')}</Text>
        </View>

        <View style={styles.langWrapper}>
          <TouchableOpacity
            style={styles.langSelectorBtn}
            onPress={() => setDropdownOpen(!dropdownOpen)}
            activeOpacity={0.85}
          >
            <Ionicons name="globe-outline" size={15} color="#16A34A" />
            <Text style={styles.langSelectorText}>{selectedLanguage.name}</Text>
            <Ionicons name="chevron-down" size={13} color="#64748B" />
          </TouchableOpacity>

          {/* Anchored Floating Dropdown */}
          {dropdownOpen && (
            <>
              <TouchableOpacity
                style={styles.backdropOverlay}
                activeOpacity={1}
                onPress={() => setDropdownOpen(false)}
              />
              <View style={styles.dropdownCard}>
                <ScrollView nestedScrollEnabled style={{ maxHeight: 240 }}>
                  {LANGUAGES.map((lang, index) => {
                    const isSelected = selectedLanguage.code === lang.code;
                    return (
                      <TouchableOpacity
                        key={lang.code}
                        style={[
                          styles.dropdownRow,
                          index < LANGUAGES.length - 1 && styles.dropdownRowBorder,
                          isSelected && styles.dropdownRowSelected,
                        ]}
                        onPress={() => handleSelectLanguage(lang)}
                      >
                        <Text
                          style={[
                            styles.dropdownRowText,
                            isSelected && styles.dropdownRowTextSelected,
                          ]}
                        >
                          {lang.name}
                        </Text>
                        {isSelected && <Ionicons name="checkmark" size={16} color="#16A34A" />}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </>
          )}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.centerCardContainer}>
            {/* Main Login Card */}
            <View style={styles.card}>
              {/* Top Crop Emblem */}
              <View style={styles.emblemContainer}>
                <View style={styles.emblemSquare}>
                  <View style={styles.cropIconRow}>
                    <Ionicons name="nutrition" size={26} color="#D97706" style={styles.wheatIcon} />
                    <Ionicons name="leaf" size={28} color="#16A34A" style={styles.leafIcon} />
                  </View>
                </View>
              </View>

              {/* Headings */}
              <Text style={styles.welcomeHeading}>{t('welcomeFarmer')}</Text>
              <Text style={styles.loginSubtitle}>{t('loginSubtitle')}</Text>

              {/* Form Input Section */}
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>{t('mobileNumberLabel')}</Text>

                <View
                  style={[
                    styles.inputContainer,
                    isFocused && styles.inputContainerFocused,
                    errorMsg ? styles.inputContainerError : null,
                  ]}
                >
                  <Text style={styles.countryCode}>+91</Text>
                  <View style={styles.verticalDivider} />
                  <TextInput
                    style={styles.textInput}
                    value={mobileNumber}
                    onChangeText={(text) => {
                      setMobileNumber(text);
                      if (errorMsg) setErrorMsg('');
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    maxLength={10}
                    accessibilityLabel="Mobile Number Input"
                  />
                </View>
                {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
              </View>

              {/* Primary Send OTP Button */}
              <TouchableOpacity
                style={styles.sendOtpBtn}
                onPress={handleSendOTP}
                activeOpacity={0.88}
              >
                <Text style={styles.sendOtpBtnText}>{t('sendOtp')}</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Divider Line */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>{t('orDivider')}</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Google Button */}
              <TouchableOpacity
                style={styles.googleBtn}
                onPress={handleGoogleLogin}
                activeOpacity={0.88}
              >
                <View style={styles.googleIconCircle}>
                  <Ionicons name="logo-google" size={18} color="#4285F4" />
                </View>
                <Text style={styles.googleBtnText}>{t('continueWithGoogle')}</Text>
              </TouchableOpacity>

              {/* Bottom Terms & Privacy Policy Text */}
              <Text style={styles.termsText}>{t('termsPolicyAgreement')}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgCircle1: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(220, 252, 231, 0.5)',
  },
  bgCircle2: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(240, 253, 244, 0.7)',
  },

  /* Top Bar Header */
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    zIndex: 100,
  },
  brandTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDE5E0',
  },
  brandTagText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#15803D',
  },
  langWrapper: {
    position: 'relative',
    zIndex: 1000,
  },
  langSelectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDE5E0',
  },
  langSelectorText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#172033',
  },

  /* Popover Dropdown */
  backdropOverlay: {
    position: 'absolute',
    top: -500,
    left: -500,
    right: -500,
    bottom: -1000,
    width: 2000,
    height: 2000,
    zIndex: 999,
  },
  dropdownCard: {
    position: 'absolute',
    top: 40,
    right: 0,
    width: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#DDE5E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  dropdownRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownRowSelected: {
    backgroundColor: '#F0FDF4',
  },
  dropdownRowText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  dropdownRowTextSelected: {
    fontWeight: '800',
    color: '#16A34A',
  },

  /* Main Layout Scroll & Card */
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  centerCardContainer: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 26,
    borderWidth: 1.5,
    borderColor: '#DDE5E0',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    alignItems: 'center',
  },

  /* Top Emblem */
  emblemContainer: {
    marginBottom: 16,
  },
  emblemSquare: {
    width: 66,
    height: 66,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheatIcon: {
    marginRight: -8,
    transform: [{ rotate: '-12deg' }],
  },
  leafIcon: {
    transform: [{ rotate: '12deg' }],
  },

  /* Card Headings */
  welcomeHeading: {
    fontSize: 24,
    fontWeight: '900',
    color: '#172033',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  loginSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 24,
    paddingHorizontal: 8,
  },

  /* Input Form */
  formGroup: {
    width: '100%',
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
  },
  inputContainerFocused: {
    borderColor: '#16A34A',
    backgroundColor: '#F0FDF4',
  },
  inputContainerError: {
    borderColor: '#EF4444',
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '800',
    color: '#172033',
    paddingRight: 10,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    height: 52,
    fontSize: 17,
    fontWeight: '700',
    color: '#172033',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    marginTop: 4,
  },

  /* Buttons */
  sendOtpBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#16A34A',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  sendOtpBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    paddingHorizontal: 12,
  },
  googleBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#DDE5E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  googleIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#172033',
  },

  /* Terms Footer */
  termsText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 12,
  },
});
