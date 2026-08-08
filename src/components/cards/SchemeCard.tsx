import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Scheme } from '../../types/api.types';
import { getCategoryIcon, getCategoryColor } from '../../utils/category';

interface SchemeCardProps {
  scheme: Scheme;
  onPress: (scheme: Scheme) => void;
  compact?: boolean;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onPress, compact = false }) => {
  const iconName = getCategoryIcon(scheme.category);
  const benefitText = scheme.amount || scheme.benefits || 'View details';
  const isCentral = scheme.type === 'Central';

  // Soft agricultural gradients for backgrounds
  const cardGradients: [string, string] = isCentral
    ? ['#FFFFFF', '#F0FDF4'] // White to soft mint
    : ['#FFFFFF', '#FFF8F0']; // White to soft orange tint

  const accentColor = isCentral ? Colors.primary[600] : '#FF8A00';

  return (
    <TouchableOpacity
      onPress={() => onPress(scheme)}
      activeOpacity={0.88}
      style={[styles.pressable, compact ? styles.compactWidth : styles.horizontalWidth]}
      accessibilityLabel={`Scheme: ${scheme.title}`}
    >
      <LinearGradient
        colors={cardGradients}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, Shadows.card]}
      >
        {/* Top Row: Icon, Status Indicator, Action Arrow */}
        <View style={styles.topRow}>
          <View style={styles.topLeft}>
            <View style={[styles.iconContainer, { backgroundColor: isCentral ? Colors.primary[50] : '#FFF3E0' }]}>
              <Ionicons name={iconName} size={20} color={accentColor} />
            </View>
            <View style={[styles.statusBadge, { backgroundColor: isCentral ? '#E8F5E9' : '#FFF3E0' }]}>
              <Text style={[styles.statusText, { color: accentColor }]}>
                {isCentral ? 'Central' : 'State'}
              </Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={18} color={accentColor} style={styles.arrowIcon} />
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
              <Text style={styles.benefitLabel}>BENEFIT</Text>
              <Text style={[styles.benefitText, { color: accentColor }]} numberOfLines={1}>
                {benefitText}
              </Text>
            </View>
            {compact && (
              <View style={[styles.quickMic, { backgroundColor: accentColor }]}>
                <Ionicons name="mic-outline" size={16} color={Colors.white} />
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginBottom: Spacing.md,
  },
  horizontalWidth: {
    width: 270,
    height: 200, // Equal and compact card heights for dashboard
    marginRight: Spacing.md,
  },
  compactWidth: {
    width: '100%',
  },
  container: {
    flex: 1,
    borderRadius: 20, // 20px border radius
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  arrowIcon: {
    padding: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text.primary,
    lineHeight: 18,
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: Colors.text.secondary,
    lineHeight: 16,
    marginVertical: 2,
  },
  benefitContainer: {
    marginTop: 'auto',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginVertical: Spacing.xs,
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
    fontSize: 9,
    fontWeight: '700',
    color: Colors.text.secondary,
    letterSpacing: 0.5,
  },
  benefitText: {
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 15,
  },
  quickMic: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
