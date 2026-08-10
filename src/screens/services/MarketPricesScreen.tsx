/**
 * Market Prices Screen — बाजार भाव (बाजार भाव आणि EMI)
 * Route: /market-prices
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
import { Colors } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { HomeScreenProps } from '../../navigation/types';

export const MarketPricesScreen: React.FC<HomeScreenProps<'MarketPrices'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t, selectedLanguage } = useLanguageContext();
  const [selectedMandi, setSelectedMandi] = useState('latur');

  const mandis = [
    { id: 'latur', name: selectedLanguage.code === 'en' ? 'Latur APMC' : 'लातूर APMC' },
    { id: 'akola', name: selectedLanguage.code === 'en' ? 'Akola APMC' : 'अकोला APMC' },
    { id: 'solapur', name: selectedLanguage.code === 'en' ? 'Solapur APMC' : 'सोलापूर APMC' },
    { id: 'nashik', name: selectedLanguage.code === 'en' ? 'Nashik APMC' : 'नाशिक APMC' },
  ];

  const commodities = [
    {
      id: 'cotton',
      name: selectedLanguage.code === 'en' ? 'Cotton (Medium Staple)' : 'कापूस (Medium Staple)',
      price: '₹7,850',
      unit: t('perQuintal'),
      trend: '+₹150',
      isUp: true,
      minMax: '₹7,400 - ₹8,100',
      quality: selectedLanguage.code === 'en' ? 'Medium-Good' : 'मध्यम ते उत्तम',
    },
    {
      id: 'soybean',
      name: selectedLanguage.code === 'en' ? 'Soybean (Yellow)' : 'सोयाबीन (Yellow Soybean)',
      price: '₹4,650',
      unit: t('perQuintal'),
      trend: '+₹80',
      isUp: true,
      minMax: '₹4,300 - ₹4,800',
      quality: selectedLanguage.code === 'en' ? 'Yellow Grade A' : 'पिवळा ग्रेड A',
    },
    {
      id: 'onion',
      name: selectedLanguage.code === 'en' ? 'Onion (Red)' : 'कांदा (Red Onion)',
      price: '₹2,200',
      unit: t('perQuintal'),
      trend: '-₹50',
      isUp: false,
      minMax: '₹1,800 - ₹2,500',
      quality: selectedLanguage.code === 'en' ? 'Red Medium' : 'लाल मध्यम',
    },
  ];

  // Simple EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(500000);
  const [months] = useState(60);
  const rate = 9.5;

  const r = rate / (12 * 100);
  const emi = Math.round((loanAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
      {/* Top Navigation Bar */}
      <View style={[styles.topBar, { borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB' }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: themeColors.textPrimary }]}>{t('marketPrices')}</Text>
        <TouchableOpacity style={styles.micAction} onPress={() => navigation.navigate('VoiceAssistant')}>
          <Ionicons name="mic" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Mandi Selector */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('selectMandiTitle')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalMandi}>
            {mandis.map((mandi) => {
              const active = selectedMandi === mandi.id;
              return (
                <TouchableOpacity
                  key={mandi.id}
                  style={[
                    styles.mandiTab,
                    {
                      backgroundColor: active ? '#EA580C' : isDarkMode ? '#1F2937' : '#FFF7ED',
                      borderColor: active ? '#EA580C' : isDarkMode ? '#374151' : '#FDBA74',
                    },
                  ]}
                  onPress={() => setSelectedMandi(mandi.id)}
                >
                  <Text style={[styles.mandiText, { color: active ? '#FFF' : isDarkMode ? '#FDBA74' : '#9A3412' }]}>
                    {mandi.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Commodity Prices Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('todayMarketPricesTitle')}</Text>
            <Text style={styles.dateBadge}>{t('todayRates')}</Text>
          </View>

          {commodities.map((item) => (
            <View
              key={item.id}
              style={[
                styles.priceCard,
                {
                  backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                },
              ]}
            >
              <View style={styles.cardTopRow}>
                <View>
                  <Text style={[styles.commodityName, { color: themeColors.textPrimary }]}>{item.name}</Text>
                  <Text style={[styles.qualityText, { color: themeColors.textSecondary }]}>{t('gradeQuality')} {item.quality}</Text>
                </View>
                <View style={styles.priceWrap}>
                  <Text style={[styles.priceValue, { color: themeColors.textPrimary }]}>{item.price}</Text>
                  <Text style={[styles.unitText, { color: themeColors.textSecondary }]}>{item.unit}</Text>
                </View>
              </View>

              <View style={styles.cardBottomRow}>
                <Text style={[styles.rangeText, { color: themeColors.textSecondary }]}>{t('minMaxRange')} {item.minMax}</Text>
                <View style={[styles.trendBadge, { backgroundColor: item.isUp ? '#DCFCE7' : '#FEE2E2' }]}>
                  <Ionicons name={item.isUp ? 'trending-up' : 'trending-down'} size={14} color={item.isUp ? '#15803D' : '#DC2626'} />
                  <Text style={[styles.trendText, { color: item.isUp ? '#15803D' : '#DC2626' }]}>{item.trend}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* EMI Calculator */}
        <View style={[styles.emiCard, { backgroundColor: isDarkMode ? '#1F2937' : '#FFF7ED', borderColor: isDarkMode ? '#7C2D12' : '#FFEDD5' }]}>
          <View style={styles.emiHeader}>
            <Ionicons name="calculator-outline" size={24} color="#EA580C" />
            <Text style={[styles.emiTitle, { color: isDarkMode ? '#FDBA74' : '#9A3412' }]}>{t('emiCalculatorTitle')}</Text>
          </View>

          <View style={styles.emiResultBox}>
            <Text style={styles.emiResultLabel}>{t('monthlyEmiLabel')}</Text>
            <Text style={styles.emiResultValue}>₹{emi.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.calculatorControls}>
            <Text style={[styles.controlLabel, { color: themeColors.textPrimary }]}>{t('selectLoanAmount')}</Text>
            <View style={styles.amountOptions}>
              {[300000, 500000, 700000, 1000000].map((amt) => (
                <TouchableOpacity
                  key={amt}
                  style={[styles.amtBtn, loanAmount === amt && styles.amtBtnActive]}
                  onPress={() => setLoanAmount(amt)}
                >
                  <Text style={[styles.amtBtnText, loanAmount === amt && styles.amtBtnTextActive]}>
                    ₹{amt / 100000}L
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.loanConsultBtn} onPress={() => navigation.navigate('VoiceAssistant')}>
            <Text style={styles.loanConsultText}>{t('consultLoanAgriMitra')}</Text>
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
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EA580C',
  },
  horizontalMandi: {
    gap: 10,
  },
  mandiTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  mandiText: {
    fontSize: 13,
    fontWeight: '700',
  },
  priceCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  commodityName: {
    fontSize: 16,
    fontWeight: '800',
  },
  qualityText: {
    fontSize: 12,
    marginTop: 2,
  },
  priceWrap: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  unitText: {
    fontSize: 11,
    marginTop: 1,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  rangeText: {
    fontSize: 12,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '800',
  },
  emiCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    marginBottom: 20,
  },
  emiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  emiTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  emiResultBox: {
    backgroundColor: '#EA580C',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  emiResultLabel: {
    color: '#FFEDD5',
    fontSize: 12,
    fontWeight: '600',
  },
  emiResultValue: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    marginVertical: 4,
  },
  calculatorControls: {
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  amountOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  amtBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  amtBtnActive: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  amtBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  amtBtnTextActive: {
    color: '#FFF',
  },
  loanConsultBtn: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EA580C',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  loanConsultText: {
    color: '#EA580C',
    fontSize: 13,
    fontWeight: '800',
  },
});
