import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../../theme';
import { Scheme } from '../../types/api.types';
import { getCategoryIcon } from '../../utils/category';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getLocalizedScheme } from '../../utils/schemeLocalization';

interface SchemeCardProps {
  scheme: Scheme;
  onPress: (scheme: Scheme) => void;
  compact?: boolean;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onPress, compact = false }) => {
  const { t, selectedLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const locScheme = getLocalizedScheme(scheme, selectedLanguage.code);

  const iconName = getCategoryIcon(scheme.category || locScheme.category);
  const benefitText = locScheme.amount || locScheme.benefits || '५०% पर्यंत अनुदान';
  const categoryLabel = locScheme.category
    ? locScheme.category
    : (locScheme.type === 'Central' ? t('centralType') : t('stateType'));

  // Theme-aware design tokens
  const primaryGreen = isDarkMode ? '#6EE7B7' : '#187A3D';
  const lightGreenBg = isDarkMode ? '#064E3B' : '#EAF6EE';
  const textDark = themeColors.textPrimary;
  const textGray = themeColors.textSecondary;

  return (
    <TouchableOpacity
      onPress={() => onPress(scheme)}
      activeOpacity={0.88}
      style={[styles.pressable, compact ? styles.compactWidth : styles.horizontalWidth]}
      accessibilityLabel={`Scheme: ${scheme.title}`}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
          },
        ]}
      >
        {/* Top Row: Green Icon Container & Green Category Pill */}
        <View style={styles.topRow}>
          <View style={[styles.iconContainer, { backgroundColor: lightGreenBg }]}>
            <Ionicons name={iconName} size={22} color={primaryGreen} />
          </View>
          <View style={[styles.categoryPill, { backgroundColor: lightGreenBg }]}>
            <Text style={[styles.categoryPillText, { color: primaryGreen }]}>
              {categoryLabel}
            </Text>
          </View>
        </View>

        {/* Scheme Title */}
        <Text style={[styles.title, { color: textDark }]} numberOfLines={2}>
          {locScheme.title}
        </Text>

        {/* Short Description */}
        <Text style={[styles.description, { color: textGray }]} numberOfLines={2}>
          {locScheme.description}
        </Text>

        {/* Benefit Block */}
        <View
          style={[
            styles.benefitBlock,
            { backgroundColor: isDarkMode ? '#1F2937' : '#F3FAF5' },
          ]}
        >
          <Text
            style={[
              styles.benefitLabel,
              { color: isDarkMode ? '#34D399' : '#126B35' },
            ]}
          >
            {t('benefitLabel') || 'BENEFIT'}
          </Text>
          <Text style={[styles.benefitText, { color: primaryGreen }]} numberOfLines={1}>
            {benefitText}
          </Text>
        </View>

        {/* Know More CTA Action */}
        <View style={styles.knowMoreRow}>
          <Text style={[styles.knowMoreText, { color: primaryGreen }]}>
            {t('knowMore') || 'Know More →'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginBottom: Spacing.sm,
  },
  horizontalWidth: {
    width: 310,
    height: 235,
    marginRight: 14,
  },
  compactWidth: {
    width: '100%',
    marginBottom: 12,
  },
  container: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    justifyContent: 'space-between',
    shadowColor: '#187A3D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryPill: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  categoryPillText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  benefitBlock: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 6,
  },
  benefitLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: '800',
  },
  knowMoreRow: {
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  knowMoreText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
