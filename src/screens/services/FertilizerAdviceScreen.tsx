/**
 * Fertilizer Advice Screen — खत सल्ला (NPK शिफारस)
 * Route: /fertilizer-advice
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

export const FertilizerAdviceScreen: React.FC<HomeScreenProps<'FertilizerAdvice'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t, selectedLanguage } = useLanguageContext();
  const [selectedCrop, setSelectedCrop] = useState('cotton');

  const crops = [
    { id: 'cotton', name: t('cotton'), npk: '100 : 50 : 50', dose: t('doses3Split') },
    { id: 'soybean', name: t('soybean'), npk: '20 : 60 : 40', dose: t('atSowing') },
    { id: 'sugarcane', name: t('sugarcane'), npk: '250 : 115 : 115', dose: t('doses4Split') },
    { id: 'wheat', name: t('wheat'), npk: '120 : 60 : 40', dose: t('doses2Split') },
  ];

  const fertilizerSchedule = [
    {
      stage: t('stage1Sowing'),
      fertilizers: t('fertDapMop'),
      purpose: t('purposeRoots'),
      color: '#059669',
    },
    {
      stage: t('stage2Vegetative'),
      fertilizers: t('fertUreaZinc'),
      purpose: t('purposeLeaves'),
      color: '#0284C7',
    },
  ];

  const currentCrop = crops.find((c) => c.id === selectedCrop) || crops[0];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
      {/* Top Navigation Bar */}
      <View style={[styles.topBar, { borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB' }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: themeColors.textPrimary }]}>{t('fertilizerAdvice')}</Text>
        <TouchableOpacity style={styles.micAction} onPress={() => navigation.navigate('VoiceAssistant')}>
          <Ionicons name="mic" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Crop Selector Chips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('selectCropForFertilizer')}</Text>
          <View style={styles.cropChipRow}>
            {crops.map((crop) => {
              const active = selectedCrop === crop.id;
              return (
                <TouchableOpacity
                  key={crop.id}
                  style={[
                    styles.cropChip,
                    {
                      backgroundColor: active ? '#059669' : isDarkMode ? '#1F2937' : '#ECFDF5',
                      borderColor: active ? '#059669' : isDarkMode ? '#374151' : '#A7F3D0',
                    },
                  ]}
                  onPress={() => setSelectedCrop(crop.id)}
                >
                  <Text style={[styles.cropChipText, { color: active ? '#FFF' : isDarkMode ? '#A7F3D0' : '#047857' }]}>
                    {crop.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recommended NPK Ratio Card */}
        <LinearGradient
          colors={isDarkMode ? ['#064E3B', '#022C22'] : ['#059669', '#047857']}
          style={styles.npkCard}
        >
          <View style={styles.npkHeader}>
            <View style={styles.npkBadge}>
              <Ionicons name="flask-outline" size={18} color="#FFF" />
              <Text style={styles.npkBadgeText}>{t('fertilizerAdviceSub')}</Text>
            </View>
            <Text style={styles.cropTitleText}>{currentCrop.name}</Text>
          </View>

          <View style={styles.npkDisplayBox}>
            <Text style={styles.npkLabel}>{t('recommendedNpkRatio')}</Text>
            <Text style={styles.npkValue}>{currentCrop.npk}</Text>
            <Text style={styles.npkSub}>{t('npkDoseSchedule')} {currentCrop.dose}</Text>
          </View>

          <View style={styles.npkBreakdownGrid}>
            <View style={styles.npkElement}>
              <Text style={styles.elementLetter}>N</Text>
              <Text style={styles.elementName}>{t('nitrogen')}</Text>
            </View>
            <View style={styles.npkElement}>
              <Text style={styles.elementLetter}>P</Text>
              <Text style={styles.elementName}>{t('phosphorus')}</Text>
            </View>
            <View style={styles.npkElement}>
              <Text style={styles.elementLetter}>K</Text>
              <Text style={styles.elementName}>{t('potassium')}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Fertilizer Dose Schedule */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('fertilizerScheduleTitle')}</Text>
          {fertilizerSchedule.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.scheduleCard,
                {
                  backgroundColor: isDarkMode ? '#1F2937' : '#F7FCF8',
                  borderColor: isDarkMode ? '#374151' : '#C8E6C9',
                },
              ]}
            >
              <View style={[styles.stageHeader, { borderLeftColor: item.color }]}>
                <Text style={[styles.stageTitle, { color: themeColors.textPrimary }]}>{item.stage}</Text>
              </View>

              <Text style={[styles.fertText, { color: item.color }]}>{item.fertilizers}</Text>
              <Text style={[styles.purposeText, { color: themeColors.textSecondary }]}>{item.purpose}</Text>
            </View>
          ))}
        </View>

        {/* Organic Fertilizer Section */}
        <View style={[styles.organicCard, { backgroundColor: isDarkMode ? '#1F2937' : '#F0FDF4', borderColor: isDarkMode ? '#166534' : '#BBF7D0' }]}>
          <View style={styles.organicHeader}>
            <Ionicons name="leaf-outline" size={22} color="#16A34A" />
            <Text style={[styles.organicTitle, { color: isDarkMode ? '#86EFAC' : '#15803D' }]}>{t('organicFertilizerTitle')}</Text>
          </View>

          <TouchableOpacity style={styles.consultFertBtn} onPress={() => navigation.navigate('VoiceAssistant')}>
            <Ionicons name="mic-outline" size={16} color="#FFF" />
            <Text style={styles.consultFertText}>{t('customSoilAdviceBtn')}</Text>
          </TouchableOpacity>
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
    padding: 12,
    paddingBottom: 45,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  cropChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cropChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  cropChipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  npkCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
  },
  npkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  npkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  npkBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cropTitleText: {
    color: '#A7F3D0',
    fontSize: 13,
    fontWeight: '700',
  },
  npkDisplayBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  npkLabel: {
    color: '#D1D5DB',
    fontSize: 12,
  },
  npkValue: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '900',
    marginVertical: 4,
  },
  npkSub: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '600',
  },
  npkBreakdownGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  npkElement: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  elementLetter: {
    color: '#6EE7B7',
    fontSize: 18,
    fontWeight: '900',
  },
  elementName: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },
  scheduleCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
  },
  stageHeader: {
    borderLeftWidth: 4,
    paddingLeft: 8,
    marginBottom: 6,
  },
  stageTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  fertText: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  purposeText: {
    fontSize: 12,
    marginTop: 4,
  },
  organicCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    marginBottom: 20,
  },
  organicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  organicTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  consultFertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 14,
  },
  consultFertText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
