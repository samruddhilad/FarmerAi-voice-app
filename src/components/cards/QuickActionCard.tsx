/**
 * QuickActionCard Component
 * Icon + label, tappable card for "Ask" section
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';

interface QuickActionCardProps {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  icon = 'mic-outline',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={title}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color={Colors.primary[600]} />
      </View>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    minHeight: 140,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.mint[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.primary,
    textAlign: 'center',
    lineHeight: 19,
  },
});
