/**
 * Crop Selection Screen — पीक निवड (AI शिफारस)
 * Route: /crop-selection
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { HomeScreenProps } from '../../navigation/types';

export const CropSelectionScreen: React.FC<HomeScreenProps<'CropSelection'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t, selectedLanguage } = useLanguageContext();

  const [selectedSoil, setSelectedSoil] = useState('black');
  const [selectedSeason, setSelectedSeason] = useState('kharif');

  const soilTypes = [
    { id: 'black', label: t('soilBlack'), icon: 'earth-outline' },
    { id: 'red', label: t('soilRed'), icon: 'planet-outline' },
    { id: 'alluvial', label: t('soilAlluvial'), icon: 'water-outline' },
    { id: 'sandy', label: t('soilSandy'), icon: 'layers-outline' },
  ];

  const seasons = [
    { id: 'kharif', label: t('seasonKharif') },
    { id: 'rabi', label: t('seasonRabi') },
    { id: 'summer', label: t('seasonSummer') },
  ];

  const crops = [
    {
      id: 'cotton',
      name: selectedLanguage.code === 'en' ? 'Cotton' : 'कापूस',
      tag: selectedLanguage.code === 'en' ? 'High Profit' : 'उच्च नफा शिफारस',
      yield: selectedLanguage.code === 'en' ? '12 - 15 Qtl/Acre' : '१२ - १५ क्विंटल/एकड',
      water: selectedLanguage.code === 'en' ? 'Medium' : 'मध्यम',
      duration: selectedLanguage.code === 'en' ? '150-160 Days' : '१५०-१६० दिवस',
      profit: '₹60,000 - ₹80,000 /Acre',
      color: '#16A34A',
      bg: '#F0F9F1',
      icon: 'leaf-outline',
    },
    {
      id: 'soybean',
      name: selectedLanguage.code === 'en' ? 'Soybean' : 'सोयाबीन',
      tag: selectedLanguage.code === 'en' ? 'Low Water Needs' : 'कमती पाण्यात येणारे',
      yield: selectedLanguage.code === 'en' ? '10 - 12 Qtl/Acre' : '१० - १२ क्विंटल/एकड',
      water: selectedLanguage.code === 'en' ? 'Low-Medium' : 'कमी-मध्यम',
      duration: selectedLanguage.code === 'en' ? '90-100 Days' : '९०-१०० दिवस',
      profit: '₹40,000 - ₹50,000 /Acre',
      color: '#D97706',
      bg: '#FFFBEB',
      icon: 'nutrition-outline',
    },
    {
      id: 'sugarcane',
      name: selectedLanguage.code === 'en' ? 'Sugarcane' : 'ऊस',
      tag: selectedLanguage.code === 'en' ? 'Long-term High Return' : 'दीर्घकालीन उत्पन्न',
      yield: selectedLanguage.code === 'en' ? '50 - 60 Tons/Acre' : '५० - ६० टन/एकड',
      water: selectedLanguage.code === 'en' ? 'High' : 'जास्त',
      duration: selectedLanguage.code === 'en' ? '12 Months' : '१२ महिने',
      profit: '₹1,20,000+ /Acre',
      color: '#0284C7',
      bg: '#F0F9FF',
      icon: 'flask-outline',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
      {/* Top Navigation Bar */}
      <View style={[styles.topBar, { borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB' }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: themeColors.textPrimary }]}>{t('cropSelection')}</Text>
        <TouchableOpacity style={styles.micAction} onPress={() => navigation.navigate('VoiceAssistant')}>
          <Ionicons name="mic" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <LinearGradient
          colors={isDarkMode ? ['#064E3B', '#022C22'] : ['#DCFCE7', '#BBF7D0']}
          style={styles.banner}
        >
          <View style={styles.bannerHeaderRow}>
            <View style={styles.bannerIconBadge}>
              <Ionicons name="sparkles" size={20} color="#16A34A" />
            </View>
            <Text style={[styles.bannerTag, { color: isDarkMode ? '#A7F3D0' : '#15803D' }]}>{t('cropSelectionSub')}</Text>
          </View>
          <Text style={[styles.bannerTitle, { color: isDarkMode ? '#FFFFFF' : '#14532D' }]}>
            {t('aiCropBannerTitle')}
          </Text>
          <Text style={[styles.bannerSub, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
            {t('aiCropBannerSub')}
          </Text>
        </LinearGradient>

        {/* Soil Selector */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('soilTypeTitle')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalChips}>
            {soilTypes.map((soil) => {
              const active = selectedSoil === soil.id;
              return (
                <TouchableOpacity
                  key={soil.id}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: active ? '#16A34A' : isDarkMode ? '#1F2937' : '#F3F4F6',
                      borderColor: active ? '#16A34A' : isDarkMode ? '#374151' : '#E5E7EB',
                    },
                  ]}
                  onPress={() => setSelectedSoil(soil.id)}
                >
                  <Ionicons name={soil.icon as any} size={16} color={active ? '#FFF' : themeColors.textSecondary} />
                  <Text style={[styles.chipText, { color: active ? '#FFF' : themeColors.textPrimary }]}>
                    {soil.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Season Selector */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('seasonTitle')}</Text>
          <View style={styles.seasonRow}>
            {seasons.map((season) => {
              const active = selectedSeason === season.id;
              return (
                <TouchableOpacity
                  key={season.id}
                  style={[
                    styles.seasonTab,
                    {
                      backgroundColor: active ? (isDarkMode ? '#065F46' : '#DCFCE7') : isDarkMode ? '#1F2937' : '#F8FAFC',
                      borderColor: active ? '#16A34A' : isDarkMode ? '#374151' : '#E2E8F0',
                    },
                  ]}
                  onPress={() => setSelectedSeason(season.id)}
                >
                  <Text style={[styles.seasonText, { color: active ? '#15803D' : themeColors.textSecondary }]}>
                    {season.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recommended Crops */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('recommendedCropsTitle')}</Text>
          {crops.map((crop) => (
            <View
              key={crop.id}
              style={[
                styles.cropCard,
                {
                  backgroundColor: isDarkMode ? '#1F2937' : crop.bg,
                  borderColor: isDarkMode ? '#374151' : 'rgba(0,0,0,0.05)',
                },
              ]}
            >
              <View style={styles.cropCardHeader}>
                <View style={styles.cropTitleRow}>
                  <View style={[styles.cropIconBg, { backgroundColor: crop.color }]}>
                    <Ionicons name={crop.icon as any} size={20} color="#FFF" />
                  </View>
                  <View>
                    <Text style={[styles.cropName, { color: themeColors.textPrimary }]}>{crop.name}</Text>
                    <Text style={[styles.cropTagText, { color: crop.color }]}>{crop.tag}</Text>
                  </View>
                </View>
                <TouchableOpacity style={[styles.askAiBtn, { backgroundColor: crop.color }]} onPress={() => navigation.navigate('VoiceAssistant')}>
                  <Text style={styles.askAiText}>{t('getAdvice')}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.cropDetailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>{t('expectedYield')}</Text>
                  <Text style={[styles.detailValue, { color: themeColors.textPrimary }]}>{crop.yield}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>{t('duration')}</Text>
                  <Text style={[styles.detailValue, { color: themeColors.textPrimary }]}>{crop.duration}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>{t('waterNeed')}</Text>
                  <Text style={[styles.detailValue, { color: themeColors.textPrimary }]}>{crop.water}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>{t('estimatedProfit')}</Text>
                  <Text style={[styles.detailValue, { color: '#16A34A', fontWeight: '800' }]}>{crop.profit}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 6,
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  micAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  banner: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  bannerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  bannerIconBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTag: {
    fontSize: 12,
    fontWeight: '800',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  bannerSub: {
    fontSize: 13,
    lineHeight: 18,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  horizontalChips: {
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  seasonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  seasonTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
  },
  seasonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  cropCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
  },
  cropCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cropTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cropIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropName: {
    fontSize: 16,
    fontWeight: '800',
  },
  cropTagText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  askAiBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  askAiText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cropDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  detailItem: {
    width: '47%',
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
});
