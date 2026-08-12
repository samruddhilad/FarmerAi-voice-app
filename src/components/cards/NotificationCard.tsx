/**
 * NotificationCard Component
 * NEW badge, title, timestamp, category tag
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { Notification } from '../../types/api.types';

interface NotificationCardProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  const timeAgo = (dateString: string): string => {
    if (!dateString) return '2 days ago';
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.badgeRow}>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {notification.title}
          </Text>
          <Ionicons name="chevron-forward" size={18} color={Colors.gray[400]} />
        </View>

        {notification.body ? (
          <Text style={styles.body} numberOfLines={2}>
            {notification.body}
          </Text>
        ) : null}

        <View style={styles.footer}>
          <Ionicons name="time-outline" size={13} color={Colors.gray[400]} />
          <Text style={styles.time}>{timeAgo(notification.created_at)}</Text>
          {notification.category && (
            <>
              <Text style={styles.dot}>·</Text>
              <Text style={styles.category}>{notification.category}</Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7FCF8',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary[600],
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#C8E6C9',
    borderRightColor: '#C8E6C9',
    borderBottomColor: '#C8E6C9',
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  content: {
    padding: 12,
  },
  badgeRow: {
    marginBottom: Spacing.xs,
  },
  newBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary[600],
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
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
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 22,
  },
  body: {
    fontSize: 13,
    color: Colors.text.secondary,
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
    color: Colors.gray[500],
  },
  dot: {
    fontSize: 12,
    color: Colors.gray[400],
  },
  category: {
    fontSize: 12,
    color: Colors.primary[600],
    fontWeight: '600',
  },
});
