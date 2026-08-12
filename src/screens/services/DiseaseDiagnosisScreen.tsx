/**
 * Disease Diagnosis Screen — रोग निदान (पीक तपासणी)
 * Route: /disease-diagnosis
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

export const DiseaseDiagnosisScreen: React.FC<HomeScreenProps<'DiseaseDiagnosis'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t, selectedLanguage } = useLanguageContext();

  const [isScanning, setIsScanning] = useState(false);

  const commonDiseases = [
    {
      id: 'blight',
      name: t('leafBlight'),
      crop: t('blightCrop'),
      severity: t('severityHigh'),
      severityColor: '#DC2626',
      symptoms: t('blightSymptoms'),
      organicRemedy: t('blightOrganic'),
      chemicalRemedy: t('blightChemical'),
    },
    {
      id: 'rust',
      name: t('rustDisease'),
      crop: t('rustCrop'),
      severity: t('severityMed'),
      severityColor: '#EA580C',
      symptoms: t('rustSymptoms'),
      organicRemedy: t('rustOrganic'),
      chemicalRemedy: t('rustChemical'),
    },
  ];

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      navigation.navigate('VoiceAssistant');
    }, 1200);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
      {/* Top Navigation Bar */}
      <View style={[styles.topBar, { borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB' }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: themeColors.textPrimary }]}>{t('diseaseDiagnosis')}</Text>
        <TouchableOpacity style={styles.micAction} onPress={() => navigation.navigate('VoiceAssistant')}>
          <Ionicons name="mic" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Photo Upload Scanner Box */}
        <TouchableOpacity
          style={[
            styles.scanCard,
            {
              backgroundColor: isDarkMode ? '#1F2937' : '#FDF2F2',
              borderColor: isDarkMode ? '#7F1D1D' : '#FCA5A5',
            },
          ]}
          activeOpacity={0.85}
          onPress={handleSimulateScan}
        >
          <View style={styles.scanIconWrap}>
            <Ionicons name="camera-outline" size={36} color="#DC2626" />
          </View>
          <Text style={[styles.scanTitle, { color: isDarkMode ? '#F87171' : '#991B1B' }]}>
            {isScanning ? t('scanningInProgress') : t('uploadLeafPhoto')}
          </Text>

          <Text style={[styles.scanSub, { color: isDarkMode ? '#D1D5DB' : '#7F1D1D' }]}>
            {t('uploadLeafSub')}
          </Text>

          <View style={styles.scanBtn}>
            <Ionicons name="scan-outline" size={18} color="#FFF" />
            <Text style={styles.scanBtnText}>{t('scanNow')}</Text>
          </View>
        </TouchableOpacity>

        {/* Common Diseases List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('majorDiseasesTitle')}</Text>
          {commonDiseases.map((item) => (
            <View
              key={item.id}
              style={[
                styles.diseaseCard,
                {
                  backgroundColor: isDarkMode ? '#1F2937' : '#F7FCF8',
                  borderColor: isDarkMode ? '#374151' : '#C8E6C9',
                },
              ]}
            >
              <View style={styles.diseaseHeader}>
                <View>
                  <Text style={[styles.diseaseName, { color: themeColors.textPrimary }]}>{item.name}</Text>
                  <Text style={[styles.cropTarget, { color: themeColors.textSecondary }]}>{t('affectedCrops')} {item.crop}</Text>
                </View>
                <View style={[styles.severityBadge, { backgroundColor: item.severityColor }]}>
                  <Text style={styles.severityText}>{item.severity}</Text>
                </View>
              </View>

              <View style={styles.detailBlock}>
                <Text style={[styles.detailHeading, { color: themeColors.textPrimary }]}>{t('symptoms')}</Text>
                <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>{item.symptoms}</Text>
              </View>

              <View style={styles.detailBlock}>
                <Text style={[styles.detailHeading, { color: '#16A34A' }]}>{t('organicRemedy')}</Text>
                <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>{item.organicRemedy}</Text>
              </View>

              <View style={styles.detailBlock}>
                <Text style={[styles.detailHeading, { color: '#DC2626' }]}>{t('chemicalRemedy')}</Text>
                <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>{item.chemicalRemedy}</Text>
              </View>

              <TouchableOpacity
                style={styles.consultButton}
                onPress={() => navigation.navigate('VoiceAssistant')}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={16} color="#DC2626" />
                <Text style={styles.consultText}>{t('askAgriMitraDisease')}</Text>
              </TouchableOpacity>
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
    padding: 12,
    paddingBottom: 45,
  },
  scanCard: {
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  scanIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  scanTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  scanSub: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  scanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  scanBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  diseaseCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
  },
  diseaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '800',
  },
  cropTarget: {
    fontSize: 12,
    marginTop: 2,
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  detailBlock: {
    marginBottom: 8,
  },
  detailHeading: {
    fontSize: 12,
    fontWeight: '800',
  },
  detailText: {
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  consultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  consultText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '700',
  },
});
