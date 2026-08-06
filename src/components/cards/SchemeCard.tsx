/**
 * SchemeCard Component
 * Displays scheme info: category badge, title, description, amount, CTA
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Scheme } from '../../types/api.types';
import { getCategoryIcon, getCategoryColor } from '../../utils/category';

interface SchemeCardProps {
  scheme: Scheme;
  onPress: (scheme: Scheme) => void;
  compact?: boolean;
}

const ACCENT = Colors.primary[600];
const ACCENT_LIGHT = Colors.mint[100];


export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onPress, compact = false }) => {
  const iconName = getCategoryIcon(scheme.category);
  const iconBg = getCategoryColor(scheme.category);
  const benefitText = scheme.amount || scheme.benefits || scheme.eligibility_criteria || 'View details';

  return (
    <TouchableOpacity
      style={[styles.container, compact ? styles.compactContainer : styles.horizontalContainer]}
      onPress={() => onPress(scheme)}
      activeOpacity={0.86}
      accessibilityLabel={`Scheme: ${scheme.title}`}
    >
      {/* Top Header Row with Icon and Badge */}
      <View style={styles.topRow}>
        <View style={[styles.iconContainer, { backgroundColor: ACCENT }]}> 
          <Ionicons name={iconName} size={22} color={Colors.white} />
        </View>

        {scheme.category && (
          <View style={[styles.badge, { backgroundColor: getCategoryColor(scheme.category) }]}> 
            <Text style={styles.badgeText}>{scheme.category}</Text>
          </View>
        )}
      </View>

      {/* Title */}
      <Text style={[styles.title, compact ? styles.compactTitle : styles.horizontalTitle]} numberOfLines={2}>
        {scheme.title}
      </Text>

      {/* Description */}
      {!compact && (
        <Text style={styles.description} numberOfLines={2}>
          {scheme.description}
        </Text>
      )}

      {/* Amount Badge / CTA */}
      {compact ? (
        <View style={styles.footerRowCompact}>
          <View style={styles.benefitBlockCompact}>
            <Text style={styles.benefitLabel}>BENEFIT</Text>
            <Text style={styles.benefitTextCompact} numberOfLines={1}>
              {benefitText}
            </Text>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.iconAction, styles.micAction]} onPress={() => onPress(scheme)}>
              <Ionicons name="mic-outline" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconAction, styles.arrowAction]} onPress={() => onPress(scheme)}>
              <Ionicons name="arrow-forward" size={22} color={ACCENT} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.benefitBlock}>
            <Text style={styles.benefitLabel}>BENEFIT</Text>
            <Text style={styles.benefitText} numberOfLines={2}>
              {benefitText}
            </Text>
          </View>
          <View style={styles.footerRow}>
            <View style={styles.cta}>
              <Text style={styles.ctaText}>Know More</Text>
              <Ionicons name="arrow-forward" size={15} color={ACCENT} />
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    width: 270,
    marginBottom: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  compactContainer: {
    width: '100%',
  },
  horizontalContainer: {
    width: 270,
    marginRight: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.mint[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.mint[100],
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.primary[600],
    fontWeight: '700',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    lineHeight: 22,
  },
  compactTitle: {
    fontSize: 20,
  },
  horizontalTitle: {
    fontSize: 16,
  },
  description: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
    lineHeight: 19,
  },
  benefitBlock: {
    marginBottom: Spacing.md,
  },
  benefitBlockCompact: {
    flex: 1,
    marginRight: Spacing.md,
  },
  benefitLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gray[500],
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  benefitText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary[600],
    lineHeight: 19,
  },
  benefitTextCompact: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primary[700],
    lineHeight: 20,
  },
  footerRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },
  iconAction: {
    width: 54,
    height: 54,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micAction: {
    backgroundColor: ACCENT,
  },
  arrowAction: {
    backgroundColor: ACCENT_LIGHT,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '700',
    color: ACCENT,
  },
});
