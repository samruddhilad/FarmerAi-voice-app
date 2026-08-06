/**
 * EligibilityCard Component
 * Displays scheme eligibility status
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { EligibilityResult } from '../../types/api.types';

interface EligibilityCardProps {
  result: EligibilityResult;
  onPress: (result: EligibilityResult) => void;
}

export const EligibilityCard: React.FC<EligibilityCardProps> = ({
  result,
  onPress,
}) => {
  const isEligible = result.is_eligible;

  return (
    <TouchableOpacity
      style={[styles.container, Shadows.card]}
      onPress={() => onPress(result)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.statusIcon,
            { backgroundColor: isEligible ? Colors.successBg : Colors.errorBg },
          ]}
        >
          <Ionicons
            name={isEligible ? 'checkmark-circle' : 'close-circle'}
            size={24}
            color={isEligible ? Colors.success : Colors.error}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.schemeName} numberOfLines={2}>
            {result.scheme.title}
          </Text>
          <Text
            style={[
              styles.status,
              { color: isEligible ? Colors.success : Colors.error },
            ]}
          >
            {isEligible ? 'Eligible' : 'Not Eligible'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
      </View>

      {result.match_percentage !== undefined && (
        <View style={styles.matchBar}>
          <View style={styles.matchTrack}>
            <View
              style={[
                styles.matchFill,
                {
                  width: `${result.match_percentage}%`,
                  backgroundColor: isEligible ? Colors.primary[500] : Colors.gray[300],
                },
              ]}
            />
          </View>
          <Text style={styles.matchText}>{result.match_percentage}% match</Text>
        </View>
      )}

      {result.reasons && result.reasons.length > 0 && (
        <View style={styles.reasons}>
          {result.reasons.slice(0, 2).map((reason, idx) => (
            <View key={idx} style={styles.reasonRow}>
              <Ionicons
                name={isEligible ? 'checkmark' : 'close'}
                size={14}
                color={isEligible ? Colors.success : Colors.error}
              />
              <Text style={styles.reasonText} numberOfLines={1}>
                {reason}
              </Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  schemeName: {
    ...Typography.label,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  status: {
    ...Typography.labelSm,
    fontWeight: '600',
  },
  matchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  matchTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.gray[100],
    borderRadius: 3,
    overflow: 'hidden',
  },
  matchFill: {
    height: '100%',
    borderRadius: 3,
  },
  matchText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    width: 70,
    textAlign: 'right',
  },
  reasons: {
    marginTop: Spacing.md,
    gap: Spacing.xs,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  reasonText: {
    ...Typography.bodySm,
    color: Colors.text.secondary,
    flex: 1,
  },
});
