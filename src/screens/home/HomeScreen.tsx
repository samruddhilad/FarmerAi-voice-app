import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Layout } from '../../theme';
import { Header } from '../../components/layout/Header';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { QuickActionCard } from '../../components/cards/QuickActionCard';
import { useSchemes } from '../../hooks/useSchemes';
import { useNotifications } from '../../hooks/useNotifications';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { HomeScreenProps } from '../../navigation/types';
import { Scheme, Notification } from '../../types/api.types';

export const HomeScreen: React.FC<HomeScreenProps<'Home'>> = ({ navigation }) => {
  const { t } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const schemesQuery = useSchemes({ limit: 6 });
  const notificationsQuery = useNotifications();

  const [isListening, setIsListening] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1300,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1300,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease),
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseOpacity, {
            toValue: 0.25,
            duration: 1300,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.6,
            duration: 1300,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const handleMicPress = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      navigation.navigate('VoiceAssistant');
    }, 600);
  };

  const isRefreshing = schemesQuery.isRefetching || notificationsQuery.isRefetching;

  const handleRefresh = () => {
    schemesQuery.refetch();
    notificationsQuery.refetch();
  };

  // Extract schemes from Query data or fallback list
  const fetchedSchemes: Scheme[] =
    schemesQuery.data?.pages?.[0]?.data?.items || [
      {
        id: 's1',
        title: t('scheme1Title') || 'PM-Kisan Samman Nidhi',
        description: t('scheme1Desc') || 'Financial support of ₹6,000 per year for farmer families across India.',
        category: 'Direct Income Support',
        type: 'Central',
        amount: '₹6,000 / year',
        benefits: '3 equal installments of ₹2,000 directly transferred to bank account.',
      },
      {
        id: 's2',
        title: t('scheme2Title') || 'PM Fasal Bima Yojana',
        description: t('scheme2Desc') || 'Comprehensive crop insurance against natural calamities & pest attacks.',
        category: 'Crop Insurance',
        type: 'Central',
        amount: 'Up to 90% Subsidy',
        benefits: 'Low premium (1.5% - 2%) for seasonal food & oilseed crops.',
      },
      {
        id: 's3',
        title: t('scheme3Title') || 'Sub-Mission on Agricultural Mechanization',
        description: t('scheme3Desc') || 'Subsidy on purchase of modern farm machinery, tractors & implements.',
        category: 'Machinery Subsidy',
        type: 'Central',
        amount: '40% - 50% Subsidy',
        benefits: 'Financial assistance for modern machinery & custom hiring centers.',
      },
      {
        id: 's4',
        title: t('scheme4Title') || 'Soil Health Card Scheme',
        description: t('scheme4Desc') || 'Free soil testing & customized crop fertilizer recommendation card.',
        category: 'Soil Health',
        type: 'Central',
        amount: '100% Free Testing',
        benefits: 'Detailed nutrient status of soil & dosage advisory.',
      },
    ];

  // Extract notifications / updates data
  const fetchedUpdates: Notification[] =
    notificationsQuery.data?.data || [
      {
        id: 'n1',
        title: 'Application window open for Micro Drip Irrigation Scheme',
        body: 'State Agriculture Department is accepting subsidy applications for drip & sprinkler systems.',
        type: 'update',
        category: 'Irrigation',
        is_read: false,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'n2',
        title: 'Soil Health Card free testing camp in nearest KVK',
        body: 'Farmers can submit soil samples for free analysis till the end of this month.',
        type: 'update',
        category: 'Soil Health',
        is_read: false,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* HEADER */}
      <Header
        onNotificationPress={() => navigation.navigate('Notifications')}
        onProfilePress={() => navigation.navigate('ProfileTab', { screen: 'Profile' } as any)}
        notificationCount={notificationsQuery.data?.data?.filter((n) => !n.is_read).length || 2}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#187A3D"
            colors={['#187A3D']}
          />
        }
      >
        {/* 1. WELCOME / HERO SECTION (Matching Reference Image) */}
        <View style={styles.heroSectionWrapper}>
          <View
            style={[
              styles.heroCardContainer,
              {
                backgroundColor: isDarkMode ? '#1E2937' : '#F3FAF5',
                borderColor: isDarkMode ? '#374151' : '#DDE5E0',
              },
            ]}
          >
            {/* Top Live Badge */}
            <View style={[styles.liveBadgeRow, { backgroundColor: isDarkMode ? '#111827' : '#FFFFFF' }]}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>{t('liveBadge') || 'Live'}</Text>
            </View>

            {/* Main Greeting Heading */}
            <Text style={[styles.namasteText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              {t('namasteGreeting') || 'Namaste!'}
            </Text>
            <Text style={[styles.greetingTimeText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              {t(
                new Date().getHours() < 12
                  ? 'goodMorning'
                  : new Date().getHours() < 17
                  ? 'goodAfternoon'
                  : 'goodEvening'
              ) || 'Good Evening'}
            </Text>

            {/* Subtitle */}
            <Text style={[styles.heroSubText, { color: isDarkMode ? '#9CA3AF' : '#5F6B7A' }]}>
              {t('heroSubTitle') || 'Your AI assistant for government schemes & agri guidance.'}
            </Text>

            {/* Voice Callout Container */}
            <TouchableOpacity
              style={styles.voiceCalloutContainer}
              activeOpacity={0.9}
              onPress={handleMicPress}
            >
              {/* Large Circular Green Microphone Button */}
              <View style={styles.largeMicCircleWrap}>
                <Animated.View
                  style={[
                    styles.micPulseRing,
                    {
                      transform: [{ scale: pulseAnim }],
                      opacity: pulseOpacity,
                    },
                  ]}
                />
                <View style={[styles.largeMicCircle, isListening && { backgroundColor: '#126B35' }]}>
                  <Ionicons name="mic" size={32} color="#FFFFFF" />
                </View>
              </View>

              {/* Voice Callout Text & Soundwave */}
              <View style={styles.voiceCalloutTextCol}>
                <Text style={styles.tapToSpeakTitle}>
                  {isListening ? (t('listeningStatus') || 'Listening...') : (t('tapToSpeakTitle') || 'Tap to Speak')}
                </Text>
                <Text style={[styles.tapToSpeakSub, { color: isDarkMode ? '#9CA3AF' : '#5F6B7A' }]}>
                  {t('tapToSpeakSub') || 'Ask anything in your language. Available in 12 regional languages.'}
                </Text>

                {/* Audio Waveform Bars Visualizer */}
                <View style={styles.waveformContainer}>
                  <View style={[styles.waveBar, { height: 12 }]} />
                  <View style={[styles.waveBar, { height: 20 }]} />
                  <View style={[styles.waveBar, { height: 26 }]} />
                  <View style={[styles.waveBar, { height: 16 }]} />
                  <View style={[styles.waveBar, { height: 22 }]} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Bottom Feature Pills Row */}
            <View style={styles.pillsRow}>
              <View style={[styles.featurePill, { backgroundColor: isDarkMode ? '#111827' : '#FFFFFF' }]}>
                <Ionicons name="document-text-outline" size={15} color="#187A3D" />
                <Text style={[styles.pillText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
                  {t('pill12Languages') || '12 Languages'}
                </Text>
              </View>

              <View style={[styles.featurePill, { backgroundColor: isDarkMode ? '#111827' : '#FFFFFF' }]}>
                <Ionicons name="flash-outline" size={15} color="#187A3D" />
                <Text style={[styles.pillText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
                  {t('pillInstantReply') || 'Instant Reply'}
                </Text>
              </View>

              <View style={[styles.featurePill, { backgroundColor: isDarkMode ? '#111827' : '#FFFFFF' }]}>
                <Ionicons name="leaf-outline" size={15} color="#187A3D" />
                <Text style={[styles.pillText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
                  {t('pillFreeToUse') || 'Free to Use'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. QUICK ACTIONS SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              {t('quickActionsHeader') || 'Quick Actions'}
            </Text>
          </View>

          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              title={t('schemesService') || 'Government Schemes'}
              subtitle={t('schemesSub') || 'Subsidies & Claims'}
              icon="leaf"
              onPress={() => navigation.navigate('Schemes')}
            />
            <QuickActionCard
              title={t('askKrishiMitra') || 'Ask Krishi Mitra'}
              subtitle={t('aiSubtitle') || 'AI Assistant'}
              icon="hardware-chip-outline"
              onPress={() => navigation.navigate('VoiceAssistant')}
            />
            <QuickActionCard
              title={t('agriMitraTab') || 'Voice Assistant'}
              subtitle={t('tapToSpeak') || 'Voice Query'}
              icon="mic-outline"
              onPress={() => navigation.navigate('VoiceAssistant')}
            />
            <QuickActionCard
              title={t('cropSelection') || 'Farming Tips'}
              subtitle={t('cropSelectionSub') || 'Crop Guidance'}
              icon="leaf-outline"
              onPress={() => navigation.navigate('CropSelection')}
            />
          </View>
        </View>

        {/* 3. FEATURED SCHEMES CAROUSEL SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              ★ {t('featuredSchemesHeader') || 'Featured Schemes'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Schemes')} activeOpacity={0.7}>
              <Text style={styles.seeAllActionText}>{t('seeAll') || 'See all →'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalCarouselPadding}
            decelerationRate="fast"
            snapToInterval={324}
          >
            {fetchedSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onPress={() =>
                  navigation.navigate('SchemesTab', {
                    screen: 'SchemeDetails',
                    params: { schemeId: scheme.id },
                  } as any)
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* 4. RECENT UPDATES SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              📢 {t('recentUpdatesHeader') || 'Recent Updates'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} activeOpacity={0.7}>
              <Text style={styles.seeAllActionText}>{t('seeAll') || 'View all →'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.updatesListContainer}>
            {fetchedUpdates.map((update) => (
              <TouchableOpacity
                key={update.id}
                style={[
                  styles.updateCardItem,
                  {
                    backgroundColor: isDarkMode ? '#1E2937' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : '#DDE5E0',
                  },
                ]}
                activeOpacity={0.88}
                onPress={() => navigation.navigate('Notifications')}
              >
                {/* Left Accent Border */}
                <View style={styles.updateLeftAccentBar} />

                <View style={styles.updateCardContent}>
                  <View style={styles.updateTopRow}>
                    <View style={styles.newBadgeContainer}>
                      <Text style={styles.newBadgeText}>{t('newBadge') || 'NEW'}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#187A3D" />
                  </View>

                  <Text style={[styles.updateTitleText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]} numberOfLines={2}>
                    {update.title}
                  </Text>

                  <Text style={[styles.updateBodyText, { color: isDarkMode ? '#9CA3AF' : '#5F6B7A' }]} numberOfLines={2}>
                    {update.body}
                  </Text>

                  <View style={styles.updateMetaRow}>
                    <Ionicons name="time-outline" size={13} color="#5F6B7A" />
                    <Text style={styles.updateMetaText}>2 days ago</Text>
                    <Text style={styles.updateMetaDot}>•</Text>
                    <Text style={styles.updateMetaCategory}>{update.category || 'General'}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 5. TODAY'S FARMING ADVISORY SECTION */}
        <View style={[styles.sectionContainer, { marginBottom: 20 }]}>
          <View
            style={[
              styles.advisoryCardContainer,
              {
                backgroundColor: isDarkMode ? '#374151' : '#FFFDF0',
                borderColor: isDarkMode ? '#4B5563' : '#FEF08A',
              },
            ]}
          >
            <View style={styles.advisoryIconWrap}>
              <Ionicons name="sunny-outline" size={24} color="#D97706" />
            </View>
            <View style={styles.advisoryTextWrap}>
              <Text style={[styles.advisoryTitle, { color: isDarkMode ? '#F59E0B' : '#92400E' }]}>
                {t('todayTip') || "Today's Farming Advisory"}
              </Text>
              <Text style={[styles.advisoryBody, { color: isDarkMode ? '#E5E7EB' : '#4B5563' }]}>
                {t('tipText') || 'Drip irrigation today can save 40-60% water.'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90,
  },

  /* Section 1: Hero Welcome Section */
  heroSectionWrapper: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: 12,
    marginBottom: 6,
  },
  heroCardContainer: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#187A3D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDE5E0',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#187A3D',
  },
  liveBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#187A3D',
  },
  namasteText: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
  },
  greetingTimeText: {
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
    marginBottom: 6,
  },
  heroSubText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 18,
  },
  voiceCalloutContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  largeMicCircleWrap: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micPulseRing: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(24, 122, 61, 0.2)',
  },
  largeMicCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#187A3D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#187A3D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  voiceCalloutTextCol: {
    flex: 1,
    marginLeft: 14,
  },
  tapToSpeakTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#187A3D',
    lineHeight: 22,
    marginBottom: 4,
  },
  tapToSpeakSub: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 8,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  waveBar: {
    width: 4,
    backgroundColor: '#187A3D',
    borderRadius: 2,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDE5E0',
    elevation: 1,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
  },

  /* Global Section Layout */
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: Layout.screenPaddingH,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 24,
  },
  seeAllActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#187A3D',
  },

  /* Section 2: Quick Actions Grid */
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  /* Section 3: Schemes Carousel */
  horizontalCarouselPadding: {
    paddingRight: Layout.screenPaddingH,
  },

  /* Section 4: Recent Updates */
  updatesListContainer: {
    gap: 12,
  },
  updateCardItem: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#187A3D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  updateLeftAccentBar: {
    width: 5,
    backgroundColor: '#187A3D',
  },
  updateCardContent: {
    flex: 1,
    padding: 16,
  },
  updateTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  newBadgeContainer: {
    backgroundColor: '#EAF6EE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#187A3D',
    letterSpacing: 0.4,
  },
  updateTitleText: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 21,
    marginBottom: 4,
  },
  updateBodyText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  updateMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  updateMetaText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#5F6B7A',
  },
  updateMetaDot: {
    fontSize: 12,
    color: '#5F6B7A',
  },
  updateMetaCategory: {
    fontSize: 12,
    fontWeight: '700',
    color: '#187A3D',
  },

  /* Today's Advisory Card */
  advisoryCardContainer: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
  },
  advisoryIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  advisoryTextWrap: {
    flex: 1,
  },
  advisoryTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  advisoryBody: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
});
