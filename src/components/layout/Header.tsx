/**
 * Header Component
 * App header with logo, title, language selector, notification bell
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography, Layout } from '../../theme';

interface HeaderProps {
  showLanguageSelector?: boolean;
  onLanguagePress?: () => void;
  onNotificationPress?: () => void;
  selectedLanguage?: string;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  showLanguageSelector = true,
  onLanguagePress,
  onNotificationPress,
  selectedLanguage = 'English',
  notificationCount = 0,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
      {/* Logo & Title */}
      <View style={styles.left}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf-outline" size={22} color={Colors.white} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Farmer AI</Text>
          <Text style={styles.subtitle}>VOICE ASSISTANT</Text>
        </View>
      </View>

      {/* Right actions */}
      <View style={styles.right}>
        {showLanguageSelector && (
          <TouchableOpacity
            style={styles.languageButton}
            onPress={onLanguagePress}
            activeOpacity={0.8}
            accessibilityLabel="Select language"
          >
            <Ionicons name="globe-outline" size={18} color="#0284C7" />
            <Text style={styles.languageText}>{selectedLanguage}</Text>
            <Ionicons name="chevron-down" size={14} color={Colors.gray[500]} />
          </TouchableOpacity>
        )}

        {onNotificationPress && (
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={onNotificationPress}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={22} color={Colors.gray[700]} />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.mint[100],
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.gray[400],
    letterSpacing: 1.2,
    marginTop: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  notificationButton: {
    padding: Spacing.sm,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.white,
  },
});
