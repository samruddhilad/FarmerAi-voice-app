/**
 * NotificationCard Component — Farmer AI
 * Theme-aware & Fully Localized across 5 languages (mr, en, hi, ahr, kok)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../../theme';
import { Notification } from '../../types/api.types';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getLocalizedNotification, getLocalizedTimeAgo } from '../../utils/notificationLocalization';

interface NotificationCardProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  const { t, selectedLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();

  const locNotification = getLocalizedNotification(notification, selectedLanguage.code);
  const timeLabel = getLocalizedTimeAgo(notification.created_at, selectedLanguage.code);
  const isRead = notification.is_read;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
          borderLeftColor: isRead ? (isDarkMode ? '#4B5563' : '#9CA3AF') : (isDarkMode ? '#10B981' : '#187A3D'),
        },
      ]}
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Status Badge Row */}
        <View style={styles.badgeRow}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: isRead
                  ? (isDarkMode ? '#374151' : '#E5E7EB')
                  : (isDarkMode ? '#065F46' : '#EAF6EE'),
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  color: isRead
                    ? (isDarkMode ? '#9CA3AF' : '#6B7280')
                    : (isDarkMode ? '#34D399' : '#187A3D'),
                },
              ]}
            >
              {isRead ? (t('readBadge') || 'READ') : (t('newBadge') || 'NEW')}
            </Text>
          </View>
        </View>

        {/* Title Row */}
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              {
                color: themeColors.textPrimary,
                fontWeight: isRead ? '600' : '800',
              },
            ]}
            numberOfLines={2}
          >
            {locNotification.title}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={themeColors.textSecondary}
          />
        </View>

        {/* Description Body */}
        {locNotification.body ? (
          <Text style={[styles.body, { color: themeColors.textSecondary }]} numberOfLines={2}>
            {locNotification.body}
          </Text>
        ) : null}

        {/* Footer with Timestamp & Category */}
        <View style={styles.footer}>
          <Ionicons name="time-outline" size={13} color={themeColors.textSecondary} />
          <Text style={[styles.time, { color: themeColors.textSecondary }]}>{timeLabel}</Text>
          {locNotification.category && (
            <>
              <Text style={[styles.dot, { color: themeColors.textSecondary }]}>·</Text>
              <Text
                style={[
                  styles.category,
                  { color: isDarkMode ? '#6EE7B7' : '#187A3D' },
                ]}
              >
                {locNotification.category}
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderLeftWidth: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  content: {
    padding: 14,
  },
  badgeRow: {
    marginBottom: Spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  title: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  body: {
    fontSize: 13,
    marginBottom: Spacing.sm,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  time: {
    fontSize: 12,
  },
  dot: {
    fontSize: 12,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
  },
});
