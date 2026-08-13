/**
 * Phase 1 — Scheme Details Screen (WCD Reference Structure & Krishi Mitra Green Theme)
 * 7 Dedicated Sections: Overview, Eligibility, How to Apply, Documents, FAQs, GR, Contact
 * Complete 5-Language Support (mr, en, hi, ahr, kok)
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { getCategoryIcon } from '../../utils/category';
import { SkeletonList } from '../../components/common/SkeletonLoader';
import { ErrorState } from '../../components/common/ErrorState';
import { useScheme } from '../../hooks/useSchemes';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '../../components/layout/Header';
import { getLocalizedScheme } from '../../utils/schemeLocalization';

type Props = NativeStackScreenProps<any, 'SchemeDetails'>;

type TabKey = 'overview' | 'eligibility' | 'howToApply' | 'documents' | 'faqs' | 'gr' | 'contact';

// Krishi Mitra Green Theme Palette
const PRIMARY_GREEN = '#16803A';
const DARK_GREEN = '#0B5D2A';
const LIGHT_GREEN_BG = '#EAF7EC';
const BORDER_GREEN = '#D1E7D6';
const CARD_BG = '#FFFFFF';

export const SchemeDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { t, selectedLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();

  const schemeId = route.params?.schemeId || '';
  const schemeQuery = useScheme(schemeId);

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = {
    overview: useRef<View>(null),
    eligibility: useRef<View>(null),
    howToApply: useRef<View>(null),
    documents: useRef<View>(null),
    faqs: useRef<View>(null),
    gr: useRef<View>(null),
    contact: useRef<View>(null),
  };

  const rawScheme = (schemeQuery.data as any)?.data;
  const scheme = rawScheme ? getLocalizedScheme(rawScheme, selectedLanguage.code) : null;

  if (schemeQuery.isLoading) return <SkeletonList count={4} />;
  if (schemeQuery.isError) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={DARK_GREEN} />
            <Text style={styles.backBtnText}>{t('backBtnText')}</Text>
          </TouchableOpacity>
        </View>
        <ErrorState
          title={t('fetchErrorMsg')}
          onRetry={() => schemeQuery.refetch()}
        />
      </View>
    );
  }
  if (!scheme) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={DARK_GREEN} />
            <Text style={styles.backBtnText}>{t('backBtnText')}</Text>
          </TouchableOpacity>
        </View>
        <ErrorState title={t('schemeNotFound')} />
      </View>
    );
  }

  const isCentral = scheme.type === 'Central';
  const iconName = getCategoryIcon(scheme.category);
  const officialUrl = scheme.application_url || 'https://mahadbt.maharashtra.gov.in';
  const grUrl = scheme.gr_url || scheme.document_url || officialUrl;

  const handleOpenUrl = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      console.warn('Could not open URL', url);
    }
  };

  const handleShare = async () => {
    await Share.share({ message: `${scheme.title}\n\n${scheme.description}\n${officialUrl}` });
  };

  const handleTabPress = (tab: TabKey) => {
    setActiveTab(tab);
    sectionRefs[tab].current?.measureLayout(
      scrollViewRef.current as any,
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y: y - 80, animated: true });
      },
      () => {}
    );
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'overview', label: t('overviewTab') },
    { key: 'eligibility', label: t('eligibilityTabName') },
    { key: 'howToApply', label: t('howToApplyTab') },
    { key: 'documents', label: t('documentsTab') },
    { key: 'faqs', label: t('faqsTab') },
    { key: 'gr', label: t('grTab') },
    { key: 'contact', label: t('contactTab') },
  ];

  const applySteps = [
    { title: t('step01Title'), desc: t('step01Desc') },
    { title: t('step02Title'), desc: t('step02Desc') },
    { title: t('step03Title'), desc: t('step03Desc') },
    { title: t('step04Title'), desc: t('step04Desc') },
    { title: t('step05Title'), desc: t('step05Desc') },
  ];

  const defaultDocs = [
    t('docAadhaar'),
    t('docLand'),
    t('docResidence'),
    t('docIncome'),
    t('docBank'),
    t('docMobile'),
  ];
  const requiredDocs =
    scheme.documents_required && scheme.documents_required.length > 0
      ? scheme.documents_required
      : defaultDocs;

  const faqs = [
    { q: t('faqQ1'), a: t('faqA1') },
    { q: t('faqQ2'), a: t('faqA2') },
    { q: t('faqQ3'), a: t('faqA3') },
    { q: t('faqQ4'), a: t('faqA4') },
    { q: t('faqQ5'), a: t('faqA5') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Top Header with Back Button & Language Selector */}
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('schemeDetailsTitle') || 'योजनेचा तपशील'}
        showLanguageSelector
      />

      {/* Sticky / Scrollable Horizontal Section Navigation Bar */}
      <View style={[styles.tabBarWrapper, { backgroundColor: themeColors.card, borderBottomColor: themeColors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
          {tabs.map((tItem) => {
            const isActive = activeTab === tItem.key;
            return (
              <TouchableOpacity
                key={tItem.key}
                onPress={() => handleTabPress(tItem.key)}
                style={[
                  styles.tabChip,
                  {
                    backgroundColor: isActive
                      ? (isDarkMode ? '#059669' : PRIMARY_GREEN)
                      : (isDarkMode ? themeColors.surface : LIGHT_GREEN_BG),
                    borderColor: isActive
                      ? (isDarkMode ? '#059669' : PRIMARY_GREEN)
                      : themeColors.border,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabChipText,
                    {
                      color: isActive
                        ? '#FFFFFF'
                        : themeColors.textPrimary,
                    },
                  ]}
                >
                  {tItem.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Content Scroll View */}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Scheme Hero Header Card */}
        <LinearGradient
          colors={isDarkMode ? ['#064E3B', '#022C22'] : ['#187A3D', '#126B35']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroHeaderRow}>
            <View style={styles.heroIconCircle}>
              <Ionicons name={iconName as any} size={28} color={PRIMARY_GREEN} />
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>
                {isCentral ? t('centralType') : t('stateType')}
              </Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>{scheme.title}</Text>
          <Text style={styles.heroSub}>{scheme.description}</Text>

          {scheme.amount && (
            <View style={styles.heroBenefitPill}>
              <Ionicons name="cash-outline" size={16} color="#FFFFFF" />
              <Text style={styles.heroBenefitText}>{t('benefitLabel')}: {scheme.amount}</Text>
            </View>
          )}
        </LinearGradient>

        {/* ─── SECTION 1: OVERVIEW (आढावा) ─────────────────────────── */}
        <View ref={sectionRefs.overview} style={[styles.sectionCard, { backgroundColor: isDarkMode ? themeColors.card : CARD_BG }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderIcon}>
              <Ionicons name="information-circle-outline" size={20} color={PRIMARY_GREEN} />
            </View>
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('overviewTab')}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>{t('schemeObjective')}</Text>
            <Text style={[styles.infoVal, { color: themeColors.textPrimary }]}>
              {scheme.about || scheme.description}
            </Text>
          </View>

          <View style={styles.infoRowGrid}>
            <View style={styles.infoGridCell}>
              <Text style={styles.infoLabel}>{t('intendedBeneficiary')}</Text>
              <Text style={[styles.infoValBold, { color: PRIMARY_GREEN }]}>
                {scheme.target_group || scheme.beneficiary_category || 'सर्व शेतकरी (All Farmers)'}
              </Text>
            </View>

            <View style={styles.infoGridCell}>
              <Text style={styles.infoLabel}>{t('benefitLabel')}</Text>
              <Text style={[styles.infoValBold, { color: DARK_GREEN }]}>
                {scheme.amount || scheme.benefits || 'शासकीय अर्थसहाय्य व अनुदान'}
              </Text>
            </View>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>{t('managingDepartment')}</Text>
            <Text style={[styles.infoVal, { color: themeColors.textSecondary }]}>
              {scheme.department || 'कृषी विभाग, महाराष्ट्र शासन (Department of Agriculture, Govt. of Maharashtra)'}
            </Text>
          </View>
        </View>

        {/* ─── SECTION 2: ELIGIBILITY (पात्रता) ─────────────────────────── */}
        <View ref={sectionRefs.eligibility} style={[styles.sectionCard, { backgroundColor: isDarkMode ? themeColors.card : CARD_BG }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderIcon}>
              <Ionicons name="checkmark-circle-outline" size={20} color={PRIMARY_GREEN} />
            </View>
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('eligibilityTabName')}</Text>
          </View>

          {scheme.eligibility_criteria ? (
            <View style={styles.eligibilityCard}>
              <Text style={[styles.infoVal, { color: themeColors.textPrimary }]}>{scheme.eligibility_criteria}</Text>
            </View>
          ) : (
            <View style={styles.eligibilityList}>
              {[
                { label: 'लाभार्थी वर्ग', val: scheme.beneficiary_category || 'अल्प व अल्पभूधारक शेतकरी' },
                { label: 'स्थान / रहिवासी', val: 'महाराष्ट्र राज्य रहिवासी (Maharashtra Resident)' },
                { label: 'आधार जोडणी', val: 'आधार कार्ड बँक खात्याशी जोडलेले असणे आवश्यक' },
                { label: 'जमीन धारणा', val: '७/१२ उतारा स्वतःच्या नावावर असणे आवश्यक' },
              ].map((item, idx) => (
                <View key={idx} style={styles.eligibilityRow}>
                  <Ionicons name="checkmark-circle" size={18} color={PRIMARY_GREEN} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eligibilityLabel}>{item.label}</Text>
                    <Text style={[styles.eligibilityVal, { color: themeColors.textPrimary }]}>{item.val}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ─── SECTION 3: HOW TO APPLY (अर्ज कसा करावा) ────────────────── */}
        <View ref={sectionRefs.howToApply} style={[styles.sectionCard, { backgroundColor: isDarkMode ? themeColors.card : CARD_BG }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderIcon}>
              <Ionicons name="create-outline" size={20} color={PRIMARY_GREEN} />
            </View>
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('howToApplyTab')}</Text>
          </View>

          <View style={styles.timelineList}>
            {applySteps.map((step, idx) => (
              <View key={idx} style={styles.timelineItem}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>0{idx + 1}</Text>
                </View>
                <View style={styles.timelineContent}>
                  <Text style={[styles.stepTitle, { color: themeColors.textPrimary }]}>{step.title}</Text>
                  <Text style={[styles.stepDesc, { color: themeColors.textSecondary }]}>{step.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Official Apply URL Button */}
          <TouchableOpacity
            style={styles.applyBtn}
            activeOpacity={0.86}
            onPress={() => handleOpenUrl(officialUrl)}
          >
            <Text style={styles.applyBtnText}>{t('applyOnOfficialPortal')}</Text>
            <Ionicons name="open-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* ─── SECTION 4: DOCUMENTS (कागदपत्रे) ────────────────────────── */}
        <View ref={sectionRefs.documents} style={[styles.sectionCard, { backgroundColor: isDarkMode ? themeColors.card : CARD_BG }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderIcon}>
              <Ionicons name="document-text-outline" size={20} color={PRIMARY_GREEN} />
            </View>
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('documentsChecklistTitle')}</Text>
          </View>

          <View style={styles.docList}>
            {requiredDocs.map((docItem: string, idx: number) => (
              <View key={idx} style={styles.docCheckRow}>
                <Ionicons name="checkbox" size={20} color={PRIMARY_GREEN} />
                <Text style={[styles.docCheckText, { color: themeColors.textPrimary }]}>{docItem}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ─── SECTION 5: FAQS (वारंवार विचारले जाणारे प्रश्न) ──────────── */}
        <View ref={sectionRefs.faqs} style={[styles.sectionCard, { backgroundColor: isDarkMode ? themeColors.card : CARD_BG }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderIcon}>
              <Ionicons name="help-circle-outline" size={20} color={PRIMARY_GREEN} />
            </View>
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('faqsSectionTitle')}</Text>
          </View>

          <View style={styles.accordionContainer}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <View key={idx} style={[styles.faqItem, { borderColor: isDarkMode ? themeColors.border : BORDER_GREEN }]}>
                  <TouchableOpacity
                    style={styles.faqQuestionRow}
                    activeOpacity={0.8}
                    onPress={() => toggleFaq(idx)}
                  >
                    <Text style={[styles.faqQuestionText, { color: themeColors.textPrimary }]}>{faq.q}</Text>
                    <Ionicons
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={PRIMARY_GREEN}
                    />
                  </TouchableOpacity>

                  {isOpen && (
                    <View style={styles.faqAnswerBox}>
                      <Text style={[styles.faqAnswerText, { color: themeColors.textSecondary }]}>{faq.a}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* ─── SECTION 6: GR — GOVERNMENT RESOLUTION (शासन निर्णय) ─────── */}
        <View ref={sectionRefs.gr} style={[styles.sectionCard, { backgroundColor: isDarkMode ? themeColors.card : CARD_BG }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderIcon}>
              <Ionicons name="ribbon-outline" size={20} color={PRIMARY_GREEN} />
            </View>
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('grSectionTitle')}</Text>
          </View>

          <View style={styles.grCardContent}>
            <View style={styles.grIconWrap}>
              <Ionicons name="document-attach-outline" size={28} color={PRIMARY_GREEN} />
            </View>

            <View style={styles.grTextWrap}>
              <Text style={[styles.grCardTitle, { color: themeColors.textPrimary }]}>
                {scheme.title} — {t('grSectionTitle')}
              </Text>
              <Text style={styles.grCardSub}>महाराष्ट्र शासन अधिकृत निर्णय व मार्गदर्शक सूचना</Text>
            </View>
          </View>

          <View style={styles.grBtnRow}>
            <TouchableOpacity
              style={styles.grBtnView}
              activeOpacity={0.8}
              onPress={() => handleOpenUrl(grUrl)}
            >
              <Ionicons name="eye-outline" size={18} color="#FFFFFF" />
              <Text style={styles.grBtnViewText}>{t('viewGR')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.grBtnDownload}
              activeOpacity={0.8}
              onPress={() => handleOpenUrl(grUrl)}
            >
              <Ionicons name="download-outline" size={18} color={PRIMARY_GREEN} />
              <Text style={styles.grBtnDownloadText}>{t('downloadGR')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── SECTION 7: CONTACT (संपर्क) ───────────────────────────── */}
        <View ref={sectionRefs.contact} style={[styles.sectionCard, { backgroundColor: isDarkMode ? themeColors.card : CARD_BG }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderIcon}>
              <Ionicons name="call-outline" size={20} color={PRIMARY_GREEN} />
            </View>
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('contactSectionTitle')}</Text>
          </View>

          <View style={styles.contactList}>
            {/* Department */}
            <View style={styles.contactRow}>
              <Ionicons name="business-outline" size={20} color={PRIMARY_GREEN} />
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>{t('managingDepartment')}</Text>
                <Text style={[styles.contactVal, { color: themeColors.textPrimary }]}>
                  {scheme.department || 'कृषी विभाग, महाराष्ट्र शासन'}
                </Text>
              </View>
            </View>

            {/* Helpline Phone */}
            <TouchableOpacity
              style={styles.contactRow}
              activeOpacity={0.8}
              onPress={() => handleOpenUrl('tel:18002334000')}
            >
              <Ionicons name="call" size={20} color={PRIMARY_GREEN} />
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>{t('helplineLabel')}</Text>
                <Text style={[styles.contactValLink, { color: PRIMARY_GREEN }]}>1800 233 4000 / 020-25537100</Text>
              </View>
            </TouchableOpacity>

            {/* Email */}
            <TouchableOpacity
              style={styles.contactRow}
              activeOpacity={0.8}
              onPress={() => handleOpenUrl('mailto:support@maharashtra.gov.in')}
            >
              <Ionicons name="mail" size={20} color={PRIMARY_GREEN} />
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>{t('emailLabel')}</Text>
                <Text style={[styles.contactValLink, { color: PRIMARY_GREEN }]}>support@maharashtra.gov.in</Text>
              </View>
            </TouchableOpacity>

            {/* Official Website */}
            <TouchableOpacity
              style={styles.contactRow}
              activeOpacity={0.8}
              onPress={() => handleOpenUrl(officialUrl)}
            >
              <Ionicons name="globe-outline" size={20} color={PRIMARY_GREEN} />
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>{t('websiteLabel')}</Text>
                <Text style={[styles.contactValLink, { color: PRIMARY_GREEN }]}>{officialUrl}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Quick Apply Action Bar */}
      <View
        style={[
          styles.bottomActionBar,
          {
            backgroundColor: themeColors.card,
            borderTopColor: themeColors.border,
            paddingBottom: insets.bottom + 12,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.bottomApplyBtn,
            { backgroundColor: isDarkMode ? '#059669' : PRIMARY_GREEN },
          ]}
          activeOpacity={0.88}
          onPress={() => handleOpenUrl(officialUrl)}
        >
          <Text style={styles.bottomApplyText}>{t('applyNow')} →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: LIGHT_GREEN_BG,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: DARK_GREEN,
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LIGHT_GREEN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Tab Navigation Bar */
  tabBarWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER_GREEN,
    elevation: 2,
  },
  tabScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  tabChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: LIGHT_GREEN_BG,
    borderWidth: 1,
    borderColor: BORDER_GREEN,
  },
  tabChipActive: {
    backgroundColor: PRIMARY_GREEN,
    borderColor: PRIMARY_GREEN,
  },
  tabChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: DARK_GREEN,
  },
  tabChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },

  /* Hero Card */
  heroCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#16803A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 26,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
    marginBottom: 12,
  },
  heroBenefitPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  heroBenefitText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Sections */
  sectionCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: BORDER_GREEN,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  sectionHeaderIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: LIGHT_GREEN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },

  /* Info Blocks */
  infoBlock: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoVal: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
  },
  infoRowGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  infoGridCell: {
    flex: 1,
    backgroundColor: LIGHT_GREEN_BG,
    padding: 10,
    borderRadius: 12,
  },
  infoValBold: {
    fontSize: 13,
    fontWeight: '800',
  },

  /* Eligibility */
  eligibilityCard: {
    backgroundColor: LIGHT_GREEN_BG,
    padding: 12,
    borderRadius: 12,
  },
  eligibilityList: {
    gap: 10,
  },
  eligibilityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  eligibilityLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gray[500],
  },
  eligibilityVal: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 1,
  },

  /* Steps Timeline */
  timelineList: {
    gap: 14,
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PRIMARY_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  timelineContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
  },
  applyBtn: {
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* Documents Checklist */
  docList: {
    gap: 10,
  },
  docCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: LIGHT_GREEN_BG,
    padding: 10,
    borderRadius: 12,
  },
  docCheckText: {
    fontSize: 13,
    fontWeight: '700',
  },

  /* FAQs Accordion */
  accordionContainer: {
    gap: 8,
  },
  faqItem: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: LIGHT_GREEN_BG,
  },
  faqQuestionText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    paddingRight: 8,
  },
  faqAnswerBox: {
    padding: 12,
  },
  faqAnswerText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },

  /* GR Card */
  grCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  grIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: LIGHT_GREEN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grTextWrap: {
    flex: 1,
  },
  grCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 17,
  },
  grCardSub: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.gray[500],
    marginTop: 2,
  },
  grBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  grBtnView: {
    flex: 1,
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  grBtnViewText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  grBtnDownload: {
    flex: 1,
    backgroundColor: LIGHT_GREEN_BG,
    borderWidth: 1,
    borderColor: BORDER_GREEN,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  grBtnDownloadText: {
    fontSize: 13,
    fontWeight: '700',
    color: PRIMARY_GREEN,
  },

  /* Contact List */
  contactList: {
    gap: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gray[500],
  },
  contactVal: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 1,
  },
  contactValLink: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 1,
    textDecorationLine: 'underline',
  },

  /* Bottom Floating Action Bar */
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: BORDER_GREEN,
    paddingHorizontal: 16,
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  bottomApplyBtn: {
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomApplyText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
