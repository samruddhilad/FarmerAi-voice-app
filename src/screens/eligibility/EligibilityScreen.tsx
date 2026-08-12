/**
 * Eligibility Screen — पात्रता तपासा (Check Eligibility)
 * Clean Green Farmer AI Theme, Step-by-step Scheme Matching Flow & i18n
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { Header } from '../../components/layout/Header';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { MOCK_SCHEMES } from '../../services/schemeService';
import { EligibilityScreenProps } from '../../navigation/types';
import { Scheme } from '../../types/api.types';

// Green Theme Tokens
const PRIMARY_GREEN = '#16803A';
const DARK_GREEN = '#0B5D2A';
const LIGHT_GREEN_BG = '#EAF7EC';
const VERY_LIGHT_BG = '#F5FBF5';
const BORDER_GREEN = '#D1E7D6';

export const EligibilityScreen: React.FC<EligibilityScreenProps<'EligibilityForm'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t, selectedLanguage } = useLanguageContext();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State (Preserved across language switching)
  const [age, setAge] = useState('35');
  const [gender, setGender] = useState('male');
  const [category, setCategory] = useState('general');
  const [farmerType, setFarmerType] = useState('small');
  const [landHolding, setLandHolding] = useState('1to2');
  const [cropType, setCropType] = useState('cotton');
  const [annualIncome, setAnnualIncome] = useState('1to2_5L');
  const [district, setDistrict] = useState('pune');
  const [taluka, setTaluka] = useState('haveli');

  // Results calculation
  const getMatchingSchemes = (): Scheme[] => {
    return MOCK_SCHEMES.filter((scheme) => {
      // Category specific filter
      if (category === 'st' && scheme.category === 'Tribal Development') return true;
      if (category === 'sc' && scheme.id.includes('ambedkar')) return true;

      // Crop specific filter
      if (cropType === 'cotton' && (scheme.id.includes('cotton') || scheme.category === 'Irrigation')) return true;
      if (cropType === 'sugarcane' && (scheme.id.includes('sugarcane') || scheme.category === 'Mechanization')) return true;

      // Land & Farmer type filter
      if ((farmerType === 'marginal' || farmerType === 'small') && scheme.type === 'State') return true;

      // General fallback
      return scheme.is_featured || scheme.category === 'Irrigation' || scheme.category === 'Farmer Welfare';
    });
  };

  const matchingSchemes = getMatchingSchemes();

  const handleSchemePress = (scheme: Scheme) => {
    navigation.navigate('HomeTab', {
      screen: 'SchemeDetails',
      params: { schemeId: scheme.id },
    } as any);
  };

  const renderStepIndicator = () => (
    <View style={styles.stepProgressContainer}>
      <View style={styles.stepHeaderRow}>
        <Text style={styles.stepHeaderTitle}>
          {step === 1 && t('step1')}
          {step === 2 && t('step2')}
          {step === 3 && t('step3')}
          {step === 4 && t('step4')}
        </Text>
        <Text style={styles.stepCountText}>{step} / 4</Text>
      </View>

      <View style={styles.stepsBarTrack}>
        {[1, 2, 3, 4].map((s) => {
          const isDone = s < step;
          const isCurrent = s === step;
          return (
            <View key={s} style={styles.stepSegmentWrap}>
              <View
                style={[
                  styles.stepSegment,
                  isDone && styles.stepSegmentDone,
                  isCurrent && styles.stepSegmentCurrent,
                ]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? themeColors.background : VERY_LIGHT_BG }]}>
      {/* Header */}
      <Header
        title={t('appName')}
        subtitle={t('appSubtitle')}
        onNotificationPress={() => navigation.navigate('HomeTab', { screen: 'Notifications' } as any)}
        onProfilePress={() => navigation.navigate('ProfileTab', { screen: 'Profile' } as any)}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title & Green Profile Icon Header */}
        <View style={styles.pageTitleHeader}>
          <View style={styles.headerIconCircle}>
            <Ionicons name="checkmark-circle" size={26} color="#FFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.pageTitleText, { color: isDarkMode ? '#F9FAFB' : DARK_GREEN }]}>
              {t('checkEligibility')}
            </Text>
            <Text style={[styles.pageSubtitleText, { color: isDarkMode ? '#9CA3AF' : '#2D5A3B' }]}>
              {t('eligibilitySubtitle')}
            </Text>
          </View>
        </View>

        {/* Intro Card */}
        <View style={[styles.introCard, { backgroundColor: isDarkMode ? '#1F2937' : LIGHT_GREEN_BG, borderColor: isDarkMode ? '#065F46' : BORDER_GREEN }]}>
          <View style={styles.introIconBox}>
            <Ionicons name="sparkles-outline" size={22} color={PRIMARY_GREEN} />
          </View>
          <Text style={[styles.introText, { color: isDarkMode ? '#E5E7EB' : DARK_GREEN }]}>
            {t('introCardText')}
          </Text>
        </View>

        {/* Step Tracker */}
        {renderStepIndicator()}

        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <View style={[styles.formCard, { backgroundColor: isDarkMode ? '#1F2937' : '#F7FCF8', borderColor: isDarkMode ? '#374151' : BORDER_GREEN }]}>
            <Text style={[styles.formCardTitle, { color: isDarkMode ? '#F9FAFB' : DARK_GREEN }]}>
              {t('step1Title')}
            </Text>

            {/* Age Input */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
                1. {t('age')}
              </Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB', borderColor: isDarkMode ? '#374151' : BORDER_GREEN, color: isDarkMode ? '#FFF' : '#000' }]}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholder="35"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Gender Select */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
                2. {t('gender')}
              </Text>
              <View style={styles.pillsRow}>
                {[
                  { id: 'male', label: t('male') },
                  { id: 'female', label: t('female') },
                  { id: 'other', label: t('other') },
                ].map((g) => (
                  <TouchableOpacity
                    key={g.id}
                    style={[styles.pill, gender === g.id && styles.pillActive]}
                    onPress={() => setGender(g.id)}
                  >
                    <Text style={[styles.pillText, gender === g.id && styles.pillTextActive]}>{g.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Social Category Select */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
                3. {t('category')}
              </Text>
              <View style={styles.pillsWrap}>
                {[
                  { id: 'general', label: t('general') },
                  { id: 'sc', label: t('sc') },
                  { id: 'st', label: t('st') },
                  { id: 'obc', label: t('obc') },
                ].map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    style={[styles.pill, category === c.id && styles.pillActive]}
                    onPress={() => setCategory(c.id)}
                  >
                    <Text style={[styles.pillText, category === c.id && styles.pillTextActive]}>{c.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(2)} activeOpacity={0.85}>
              <Text style={styles.primaryBtnText}>{t('continueBtn')}</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 2: Farm Details */}
        {step === 2 && (
          <View style={[styles.formCard, { backgroundColor: isDarkMode ? '#1F2937' : '#F7FCF8', borderColor: isDarkMode ? '#374151' : BORDER_GREEN }]}>
            <Text style={[styles.formCardTitle, { color: isDarkMode ? '#F9FAFB' : DARK_GREEN }]}>
              {t('step2Title')}
            </Text>

            {/* Farmer Type */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
                1. {t('farmerType')}
              </Text>
              <View style={styles.pillsWrap}>
                {[
                  { id: 'marginal', label: t('marginal') },
                  { id: 'small', label: t('small') },
                  { id: 'medium', label: t('medium') },
                  { id: 'large', label: t('large') },
                ].map((f) => (
                  <TouchableOpacity
                    key={f.id}
                    style={[styles.pill, farmerType === f.id && styles.pillActive]}
                    onPress={() => setFarmerType(f.id)}
                  >
                    <Text style={[styles.pillText, farmerType === f.id && styles.pillTextActive]}>{f.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Land Holding */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
                2. {t('landHolding')}
              </Text>
              <View style={styles.pillsWrap}>
                {[
                  { id: 'under1', label: t('landUnder1') },
                  { id: '1to2', label: t('land1to2') },
                  { id: '2to5', label: t('land2to5') },
                  { id: 'above5', label: t('landAbove5') },
                ].map((l) => (
                  <TouchableOpacity
                    key={l.id}
                    style={[styles.pill, landHolding === l.id && styles.pillActive]}
                    onPress={() => setLandHolding(l.id)}
                  >
                    <Text style={[styles.pillText, landHolding === l.id && styles.pillTextActive]}>{l.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Crop Type */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
                3. {t('cropType')}
              </Text>
              <View style={styles.pillsWrap}>
                {[
                  { id: 'cotton', label: t('cotton') },
                  { id: 'soybean', label: t('soybean') },
                  { id: 'sugarcane', label: t('sugarcane') },
                  { id: 'wheat', label: t('wheat') },
                  { id: 'onion', label: t('onion') },
                  { id: 'vegetables', label: t('vegetables') },
                ].map((cr) => (
                  <TouchableOpacity
                    key={cr.id}
                    style={[styles.pill, cropType === cr.id && styles.pillActive]}
                    onPress={() => setCropType(cr.id)}
                  >
                    <Text style={[styles.pillText, cropType === cr.id && styles.pillTextActive]}>{cr.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Annual Income */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
                4. {t('annualIncome')}
              </Text>
              <View style={styles.pillsWrap}>
                {[
                  { id: 'under1L', label: t('incomeUnder1L') },
                  { id: '1to2_5L', label: t('income1to2_5L') },
                  { id: '2_5to5L', label: t('income2_5to5L') },
                  { id: 'above5L', label: t('incomeAbove5L') },
                ].map((inc) => (
                  <TouchableOpacity
                    key={inc.id}
                    style={[styles.pill, annualIncome === inc.id && styles.pillActive]}
                    onPress={() => setAnnualIncome(inc.id)}
                  >
                    <Text style={[styles.pillText, annualIncome === inc.id && styles.pillTextActive]}>{inc.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStep(1)}>
                <Text style={styles.secondaryBtnText}>{t('backBtn')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={() => setStep(3)}>
                <Text style={styles.primaryBtnText}>{t('continueBtn')}</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 3: Location Details */}
        {step === 3 && (
          <View style={[styles.formCard, { backgroundColor: isDarkMode ? '#1F2937' : '#F7FCF8', borderColor: isDarkMode ? '#374151' : BORDER_GREEN }]}>
            <Text style={[styles.formCardTitle, { color: isDarkMode ? '#F9FAFB' : DARK_GREEN }]}>
              {t('step3Title')}
            </Text>

            {/* District Selector */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
                1. {t('district')}
              </Text>
              <View style={styles.pillsWrap}>
                {[
                  { id: 'pune', label: selectedLanguage.code === 'en' ? 'Pune' : 'पुणे' },
                  { id: 'nashik', label: selectedLanguage.code === 'en' ? 'Nashik' : 'नाशिक' },
                  { id: 'latur', label: selectedLanguage.code === 'en' ? 'Latur' : 'लातूर' },
                  { id: 'akola', label: selectedLanguage.code === 'en' ? 'Akola' : 'अकोला' },
                  { id: 'solapur', label: selectedLanguage.code === 'en' ? 'Solapur' : 'सोलापूर' },
                  { id: 'nagpur', label: selectedLanguage.code === 'en' ? 'Nagpur' : 'नागपूर' },
                ].map((d) => (
                  <TouchableOpacity
                    key={d.id}
                    style={[styles.pill, district === d.id && styles.pillActive]}
                    onPress={() => setDistrict(d.id)}
                  >
                    <Text style={[styles.pillText, district === d.id && styles.pillTextActive]}>{d.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Taluka Selector */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
                2. {t('taluka')}
              </Text>
              <View style={styles.pillsWrap}>
                {[
                  { id: 'haveli', label: selectedLanguage.code === 'en' ? 'Haveli' : 'हवेली' },
                  { id: 'baramati', label: selectedLanguage.code === 'en' ? 'Baramati' : 'बारामती' },
                  { id: 'dindori', label: selectedLanguage.code === 'en' ? 'Dindori' : 'दिंडोरी' },
                  { id: 'udgir', label: selectedLanguage.code === 'en' ? 'Udgir' : 'उदगीर' },
                ].map((tItem) => (
                  <TouchableOpacity
                    key={tItem.id}
                    style={[styles.pill, taluka === tItem.id && styles.pillActive]}
                    onPress={() => setTaluka(tItem.id)}
                  >
                    <Text style={[styles.pillText, taluka === tItem.id && styles.pillTextActive]}>{tItem.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStep(2)}>
                <Text style={styles.secondaryBtnText}>{t('backBtn')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={() => setStep(4)}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />
                <Text style={styles.primaryBtnText}>{t('checkEligibilityBtn')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 4: Results */}
        {step === 4 && (
          <View style={styles.resultsContainer}>
            {matchingSchemes.length > 0 ? (
              <>
                <View style={styles.resultsBadgeHeader}>
                  <Ionicons name="sparkles" size={20} color={PRIMARY_GREEN} />
                  <Text style={styles.resultsBadgeText}>
                    {t('resultsFound', { count: matchingSchemes.length })}
                  </Text>
                </View>

                {matchingSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    onPress={handleSchemePress}
                    compact
                  />
                ))}

                <TouchableOpacity style={styles.modifyBtn} onPress={() => setStep(1)}>
                  <Ionicons name="create-outline" size={18} color={PRIMARY_GREEN} />
                  <Text style={styles.modifyBtnText}>{t('modifyDetailsBtn')}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.emptyStateCard}>
                <Ionicons name="alert-circle-outline" size={48} color="#D97706" />
                <Text style={styles.emptyTitle}>{t('noMatchTitle')}</Text>
                <Text style={styles.emptySub}>{t('noMatchSub')}</Text>

                <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(1)}>
                  <Text style={styles.primaryBtnText}>{t('modifyDetailsBtn')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 45,
  },

  /* Page Header Title Block */
  pageTitleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  headerIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DARK_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitleText: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 24,
  },
  pageSubtitleText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },

  /* Intro Banner Card */
  introCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  introIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },

  /* Step Progress Tracker */
  stepProgressContainer: {
    marginBottom: 12,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepHeaderTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: DARK_GREEN,
  },
  stepCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: PRIMARY_GREEN,
  },
  stepsBarTrack: {
    flexDirection: 'row',
    gap: 6,
  },
  stepSegmentWrap: {
    flex: 1,
  },
  stepSegment: {
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  stepSegmentDone: {
    backgroundColor: PRIMARY_GREEN,
  },
  stepSegmentCurrent: {
    backgroundColor: DARK_GREEN,
  },

  /* Form Cards */
  formCard: {
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  formCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  textInput: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: '600',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pillActive: {
    backgroundColor: PRIMARY_GREEN,
    borderColor: PRIMARY_GREEN,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: PRIMARY_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: PRIMARY_GREEN,
    fontSize: 14,
    fontWeight: '800',
  },

  /* Results Section */
  resultsContainer: {
    gap: 12,
  },
  resultsBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: LIGHT_GREEN_BG,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER_GREEN,
    marginBottom: 8,
  },
  resultsBadgeText: {
    fontSize: 15,
    fontWeight: '800',
    color: DARK_GREEN,
  },
  modifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: PRIMARY_GREEN,
    borderRadius: 16,
    marginTop: 8,
  },
  modifyBtnText: {
    color: PRIMARY_GREEN,
    fontSize: 14,
    fontWeight: '800',
  },
  emptyStateCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#92400E',
    marginTop: 12,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'center',
    marginBottom: 16,
  },
});
