import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../../theme';
import { Scheme } from '../../types/api.types';
import { getCategoryIcon } from '../../utils/category';
import { useLanguageContext } from '../../contexts/LanguageContext';

interface SchemeCardProps {
  scheme: Scheme;
  onPress: (scheme: Scheme) => void;
  compact?: boolean;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onPress, compact = false }) => {
  const { t } = useLanguageContext();
  const iconName = getCategoryIcon(scheme.category);
  const benefitText = scheme.amount || scheme.benefits || 'View details';
  const isCentral = scheme.type === 'Central';

  // Green Theme Palette
  const primaryGreen = '#16803A';
  const darkGreen = '#0B5D2A';
  const lightGreenBg = '#EAF7EC';

  return (
    <TouchableOpacity
      onPress={() => onPress(scheme)}
      activeOpacity={0.88}
      style={[styles.pressable, compact ? styles.compactWidth : styles.horizontalWidth]}
      accessibilityLabel={`Scheme: ${scheme.title}`}
    >
      <View style={styles.container}>
        {/* Top Row: Category Icon, Status Indicator Badge, Action Arrow */}
        <View style={styles.topRow}>
          <View style={styles.topLeft}>
            <View style={[styles.iconContainer, { backgroundColor: lightGreenBg }]}>
              <Ionicons name={iconName} size={20} color={primaryGreen} />
            </View>
            <View style={[styles.statusBadge, { backgroundColor: lightGreenBg }]}>
              <Text style={[styles.statusText, { color: darkGreen }]}>
                {isCentral ? t('centralType') : t('stateType')}
              </Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={18} color={primaryGreen} style={styles.arrowIcon} />
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={compact ? 2 : 1}>
          {scheme.title}
        </Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={compact ? 2 : 2}>
          {scheme.description}
        </Text>

        {/* Benefit Block */}
        <View style={styles.benefitContainer}>
          <View style={styles.divider} />
          <View style={styles.benefitRow}>
            <View style={styles.benefitLabelCol}>
              <Text style={styles.benefitLabel}>{t('benefitLabel')}</Text>
              <Text style={[styles.benefitText, { color: primaryGreen }]} numberOfLines={1}>
                {benefitText}
              </Text>
            </View>
            {compact && (
              <View style={[styles.quickMic, { backgroundColor: primaryGreen }]}>
                <Ionicons name="mic" size={15} color={Colors.white} />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginBottom: Spacing.md,
  },
  horizontalWidth: {
    width: 270,
    height: 200,
    marginRight: Spacing.md,
  },
  compactWidth: {
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2F1E5',
    justifyContent: 'space-between',
    shadowColor: '#16803A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  arrowIcon: {
    padding: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F291E',
    lineHeight: 20,
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 17,
    marginVertical: 4,
  },
  benefitContainer: {
    marginTop: 'auto',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 8,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  benefitLabelCol: {
    flex: 1,
  },
  benefitLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0B5D2A',
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  benefitText: {
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 17,
  },
  quickMic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#16803A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
