/**
 * Home Screen — Farmer AI
 * Uses the exact farm landscape background image (assets/farm_banner.png) for the hero card
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '../../theme';
import { Header } from '../../components/layout/Header';
import { useSchemes } from '../../hooks/useSchemes';
import { useNotifications } from '../../hooks/useNotifications';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { HomeScreenProps, HomeStackParamList } from '../../navigation/types';

export const HomeScreen: React.FC<HomeScreenProps<'Home'>> = ({ navigation }) => {
  const { t } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const schemesQuery = useSchemes({ limit: 5 });
  const notificationsQuery = useNotifications();

  const serviceItems = [
    {
      route: 'CropSelection' as const,
      title: t('cropSelection'),
      subtitle: t('cropSelectionSub'),
      icon: 'leaf' as const,
      bg: '#F0F9F1',
      circleBg: '#86EFAC',
      iconColor: '#14532D',
      arrowColor: '#15803D',
    },
    {
      route: 'DiseaseDiagnosis' as const,
      title: t('diseaseDiagnosis'),
      subtitle: t('diseaseDiagnosisSub'),
      icon: 'bug' as const,
      bg: '#FDF2F2',
      circleBg: '#FCA5A5',
      iconColor: '#7F1D1D',
      arrowColor: '#DC2626',
    },
    {
      route: 'Weather' as const,
      title: t('weather'),
      subtitle: t('weatherSub'),
      icon: 'cloud' as const,
      bg: '#F0F7FF',
      circleBg: '#93C5FD',
      iconColor: '#1E3A8A',
      arrowColor: '#2563EB',
    },
    {
      route: 'Schemes' as const,
      title: t('schemesService'),
      subtitle: t('schemesSub'),
      icon: 'person' as const,
      bg: '#F5F3FF',
      circleBg: '#C4B5FD',
      iconColor: '#4C1D95',
      arrowColor: '#7C3AED',
    },
    {
      route: 'MarketPrices' as const,
      title: t('marketPrices'),
      subtitle: t('marketPricesSub'),
      icon: 'storefront' as const,
      bg: '#FFF7ED',
      circleBg: '#FDBA74',
      iconColor: '#7C2D12',
      arrowColor: '#EA580C',
    },
    {
      route: 'FertilizerAdvice' as const,
      title: t('fertilizerAdvice'),
      subtitle: t('fertilizerAdviceSub'),
      icon: 'flask' as const,
      bg: '#ECFDF5',
      circleBg: '#6EE7B7',
      iconColor: '#064E3B',
      arrowColor: '#059669',
    },
  ];

  const isRefreshing = schemesQuery.isRefetching;

  const handleRefresh = () => {
    schemesQuery.refetch();
    notificationsQuery.refetch();
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header with anchored language dropdown popover, theme toggle, and profile icon */}
      <Header
        onNotificationPress={() => navigation.navigate('Notifications')}
        onProfilePress={() => navigation.navigate('ProfileTab', { screen: 'Profile' } as any)}
        notificationCount={3}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary[600]}
            colors={[Colors.primary[600]]}
          />
        }
      >
        {/* Top Hero Banner using the provided farm landscape background image */}
        <View style={styles.bannerWrapper}>
          <ImageBackground
            source={require('../../../assets/farm_banner.png')}
            resizeMode="cover"
            style={[styles.heroImageBackground, { borderColor: isDarkMode ? '#065F46' : '#DCFCE7' }]}
            imageStyle={styles.heroImageStyle}
          >
            <LinearGradient
              colors={
                isDarkMode
                  ? ['rgba(17, 24, 39, 0.92)', 'rgba(17, 24, 39, 0.55)', 'rgba(17, 24, 39, 0.05)']
                  : ['rgba(232, 245, 233, 0.95)', 'rgba(232, 245, 233, 0.65)', 'rgba(232, 245, 233, 0.05)']
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.heroGradientMask}
            >
              <View style={styles.bannerContent}>
                <Text style={[styles.bannerGreeting, { color: isDarkMode ? '#6EE7B7' : '#15803D' }]}>
                  {t('greeting')}
                </Text>
                <Text style={[styles.bannerTitle, { color: isDarkMode ? '#F9FAFB' : '#14532D' }]}>
                  {t('todayFarmingInfo')}
                </Text>
                <Text style={[styles.bannerSubtitle, { color: isDarkMode ? '#D1D5DB' : '#334155' }]}>
                  {t('aiSubtitle')}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Quick Services Section ("झटपट सेवा") */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('quickServices')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Schemes')}>
              <Text style={[styles.seeAllText, { color: themeColors.textSecondary }]}>{t('seeAll')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.serviceGrid}>
            {serviceItems.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.serviceCard,
                  { backgroundColor: isDarkMode ? themeColors.card : item.bg, borderColor: isDarkMode ? themeColors.border : 'rgba(0,0,0,0.04)' },
                ]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(item.route as any)}
              >
                <View style={styles.cardHeaderRow}>
                  {/* Circular Logo Icon Container */}
                  <View style={[styles.serviceIconCircle, { backgroundColor: item.circleBg }]}>
                    <Ionicons name={item.icon} size={22} color={item.iconColor} />
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={isDarkMode ? themeColors.textSecondary : item.arrowColor} />
                </View>

                <Text style={[styles.serviceTitle, { color: themeColors.textPrimary }]}>{item.title}</Text>
                <Text style={[styles.serviceSubtitle, { color: themeColors.textSecondary }]}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Farming Tip ("आजचा शेती सल्ला") */}
        <View style={styles.section}>
          <View style={[styles.tipCard, { backgroundColor: isDarkMode ? '#374151' : '#FFFDF0', borderColor: isDarkMode ? '#4B5563' : '#FEF08A' }]}>
            <View style={styles.tipIconWrap}>
              <Ionicons name="sunny-outline" size={24} color="#D97706" />
            </View>
            <View style={styles.tipTextWrap}>
              <Text style={[styles.tipTitle, { color: isDarkMode ? '#F59E0B' : '#92400E' }]}>{t('todayTip')}</Text>
              <Text style={[styles.tipSubtitle, { color: isDarkMode ? '#E5E7EB' : '#4B5563' }]}>
                {t('tipText')}
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
    paddingBottom: 100,
  },

  /* Hero Image Background Banner */
  bannerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  heroImageBackground: {
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    minHeight: 140,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  heroImageStyle: {
    borderRadius: 22,
  },
  heroGradientMask: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    borderRadius: 22,
  },
  bannerContent: {
    maxWidth: '62%',
  },
  bannerGreeting: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 23,
    fontWeight: '800',
    lineHeight: 29,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },

  /* Sections */
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },

  /* Quick Services Grid */
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  serviceCard: {
    width: '48%',
    borderRadius: 20,
    padding: 14,
    minHeight: 105,
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  serviceSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },

  /* Farming Tip Card */
  tipCard: {
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
  },
  tipIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTextWrap: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  tipSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
    lineHeight: 17,
  },
});
