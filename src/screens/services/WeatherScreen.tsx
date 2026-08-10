/**
 * Weather Screen — हवामान अंदाज (7 दिवसांचा अंदाज)
 * Route: /weather
 */

import React from 'react';
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

export const WeatherScreen: React.FC<HomeScreenProps<'Weather'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t, selectedLanguage } = useLanguageContext();

  const dailyForecast = [
    { day: `${t('dayToday')} (Monday)`, temp: '29°C / 21°C', icon: 'partly-sunny-outline', condition: t('condPartlyCloudy'), rain: '20%' },
    { day: `${t('dayTomorrow')} (Tuesday)`, temp: '31°C / 22°C', icon: 'sunny-outline', condition: t('condSunny'), rain: '0%' },
    { day: `${t('dayWed')} (Wednesday)`, temp: '28°C / 20°C', icon: 'rainy-outline', condition: t('condLightRain'), rain: '60%' },
    { day: `${t('dayThu')} (Thursday)`, temp: '27°C / 19°C', icon: 'thunderstorm-outline', condition: t('condThunderstorm'), rain: '80%' },
    { day: `${t('dayFri')} (Friday)`, temp: '30°C / 21°C', icon: 'cloudy-outline', condition: t('condCloudy'), rain: '30%' },
    { day: `${t('daySat')} (Saturday)`, temp: '32°C / 22°C', icon: 'sunny-outline', condition: t('condSunny'), rain: '10%' },
    { day: `${t('daySun')} (Sunday)`, temp: '31°C / 21°C', icon: 'partly-sunny-outline', condition: t('condPartlyCloudy'), rain: '15%' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
      {/* Top Navigation Bar */}
      <View style={[styles.topBar, { borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB' }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: themeColors.textPrimary }]}>{t('weather')}</Text>
        <TouchableOpacity style={styles.micAction} onPress={() => navigation.navigate('VoiceAssistant')}>
          <Ionicons name="mic" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Weather Hero Card */}
        <LinearGradient
          colors={isDarkMode ? ['#1E3A8A', '#172554'] : ['#2563EB', '#1D4ED8']}
          style={styles.heroCard}
        >
          <View style={styles.locationRow}>
            <View style={styles.locationTag}>
              <Ionicons name="location" size={16} color="#FFF" />
              <Text style={styles.locationText}>{selectedLanguage.code === 'en' ? 'Pune / Nashik, Maharashtra' : 'पुणे / नाशिक, महाराष्ट्र'}</Text>
            </View>
            <Text style={styles.updatedText}>{t('weatherUpdatedToday')}</Text>
          </View>

          <View style={styles.mainTempRow}>
            <View>
              <Text style={styles.mainTempText}>29°C</Text>
              <Text style={styles.conditionText}>{t('condPartlyCloudy')}</Text>
            </View>
            <Ionicons name="partly-sunny-outline" size={64} color="#FDE047" />
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricBox}>
              <Ionicons name="water-outline" size={18} color="#93C5FD" />
              <Text style={styles.metricLabel}>{t('humidity')}</Text>
              <Text style={styles.metricVal}>65%</Text>
            </View>
            <View style={styles.metricBox}>
              <Ionicons name="rainy-outline" size={18} color="#93C5FD" />
              <Text style={styles.metricLabel}>{t('rainProbability')}</Text>
              <Text style={styles.metricVal}>20%</Text>
            </View>
            <View style={styles.metricBox}>
              <Ionicons name="speedometer-outline" size={18} color="#93C5FD" />
              <Text style={styles.metricLabel}>{t('windSpeed')}</Text>
              <Text style={styles.metricVal}>14 km/h</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Farming Weather Advice */}
        <View style={[styles.adviceCard, { backgroundColor: isDarkMode ? '#1F2937' : '#EFF6FF', borderColor: isDarkMode ? '#1E40AF' : '#BFDBFE' }]}>
          <Ionicons name="information-circle-outline" size={22} color="#2563EB" />
          <View style={{ flex: 1 }}>
            <Text style={[styles.adviceTitle, { color: isDarkMode ? '#93C5FD' : '#1E40AF' }]}>{t('weatherAdvisoryTitle')}</Text>
            <Text style={[styles.adviceSub, { color: isDarkMode ? '#E5E7EB' : '#1E3A8A' }]}>
              {t('weatherAdvisorySub')}
            </Text>
          </View>
        </View>

        {/* 7 Day Forecast */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('sevenDayForecastTitle')}</Text>
          {dailyForecast.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.forecastRow,
                {
                  backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                },
              ]}
            >
              <View style={styles.dayCol}>
                <Text style={[styles.dayName, { color: themeColors.textPrimary }]}>{item.day}</Text>
                <Text style={[styles.dayCondition, { color: themeColors.textSecondary }]}>{item.condition}</Text>
              </View>

              <View style={styles.iconCol}>
                <Ionicons name={item.icon as any} size={24} color="#2563EB" />
              </View>

              <View style={styles.tempCol}>
                <Text style={[styles.tempText, { color: themeColors.textPrimary }]}>{item.temp}</Text>
                <Text style={styles.rainProbText}>💧 {item.rain}</Text>
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
  heroCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  updatedText: {
    color: '#93C5FD',
    fontSize: 11,
    fontWeight: '600',
  },
  mainTempRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTempText: {
    color: '#FFF',
    fontSize: 44,
    fontWeight: '900',
  },
  conditionText: {
    color: '#E0F2FE',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 12,
  },
  metricBox: {
    alignItems: 'center',
  },
  metricLabel: {
    color: '#E0F2FE',
    fontSize: 11,
    marginTop: 4,
  },
  metricVal: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  adviceCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  adviceTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  adviceSub: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 17,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
  },
  dayCol: {
    flex: 2,
  },
  dayName: {
    fontSize: 14,
    fontWeight: '700',
  },
  dayCondition: {
    fontSize: 12,
    marginTop: 2,
  },
  iconCol: {
    flex: 1,
    alignItems: 'center',
  },
  tempCol: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  tempText: {
    fontSize: 13,
    fontWeight: '800',
  },
  rainProbText: {
    fontSize: 11,
    color: '#2563EB',
    marginTop: 2,
    fontWeight: '600',
  },
});
