/**
 * Notifications Screen — Farmer AI
 * Fully localized across 5 languages (mr, en, hi, ahr, kok) & theme-aware.
 * Header with global language selector & theme toggle.
 * Detail modal with "Mark as read" functionality.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { NotificationCard } from '../../components/cards/NotificationCard';
import { EmptyState } from '../../components/common/EmptyState';
import { SkeletonList } from '../../components/common/SkeletonLoader';
import { Header } from '../../components/layout/Header';
import { useNotifications, useMarkNotificationsRead } from '../../hooks/useNotifications';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { HomeScreenProps } from '../../navigation/types';
import { Notification as AppNotification } from '../../types/api.types';
import {
  getLocalizedNotification,
  getLocalizedTimeAgo,
  NOTIFICATION_TRANSLATIONS,
} from '../../utils/notificationLocalization';

export const NotificationsScreen: React.FC<HomeScreenProps<'Notifications'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { t, selectedLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();

  const notificationsQuery = useNotifications();
  const markReadMutation = useMarkNotificationsRead();

  const [selectedNotification, setSelectedNotification] = useState<AppNotification | null>(null);
  const [localReadIds, setLocalReadIds] = useState<Set<string>>(new Set());

  const rawNotifications: AppNotification[] = (notificationsQuery.data as any)?.data || [
    {
      id: 'n1',
      title: 'Application window open for Micro Drip Irrigation Scheme',
      body: 'State Agriculture Department is accepting subsidy applications for drip & sprinkler systems.',
      type: 'update',
      category: 'Irrigation',
      is_read: false,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'n2',
      title: 'Soil Health Card free testing camp in nearest KVK',
      body: 'Farmers can submit soil samples for free analysis till the end of this month.',
      type: 'update',
      category: 'Soil Health',
      is_read: false,
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'n3',
      title: 'PM-Kisan 17th Installment Credited',
      body: '₹2,000 financial assistance directly transferred to eligible farmers bank accounts.',
      type: 'update',
      category: 'PM-Kisan',
      is_read: true,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'n4',
      title: 'PM Fasal Bima Yojana crop loss registration extended',
      body: 'Farmers can register crop loss within 72 hours through the Crop Insurance app or helpline.',
      type: 'update',
      category: 'Crop Insurance',
      is_read: true,
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Map notifications with local read state override & localization
  const notifications = rawNotifications.map((n) => {
    const isRead = n.is_read || localReadIds.has(n.id);
    return getLocalizedNotification({ ...n, is_read: isRead }, selectedLanguage.code);
  });

  const handleMarkAllRead = () => {
    const allIds = new Set(notifications.map((n) => n.id));
    setLocalReadIds(allIds);
    markReadMutation.mutate();
  };

  const handleNotificationPress = (notification: AppNotification) => {
    setSelectedNotification(notification);
  };

  const handleMarkSingleRead = (id: string) => {
    setLocalReadIds((prev) => new Set([...prev, id]));
    if (selectedNotification && selectedNotification.id === id) {
      setSelectedNotification({ ...selectedNotification, is_read: true });
    }
  };

  if (notificationsQuery.isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
        <Header
          showBack
          onBackPress={() => navigation.goBack()}
          title={t('notificationsTitle') || 'सूचना'}
          showLanguageSelector
        />
        <View style={styles.loadingContainer}>
          <SkeletonList count={4} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Global Theme & Language Header */}
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('notificationsTitle') || 'सूचना'}
        showLanguageSelector
      />

      {/* Action Bar: Notification count & Mark all as read */}
      <View
        style={[
          styles.actionBar,
          { backgroundColor: themeColors.card, borderBottomColor: themeColors.border },
        ]}
      >
        <Text style={[styles.unreadCountText, { color: themeColors.textSecondary }]}>
          {t('notificationsTitle')} ({notifications.filter((n) => !n.is_read).length})
        </Text>

        <TouchableOpacity
          style={[styles.markAllBtn, { backgroundColor: isDarkMode ? '#064E3B' : '#EAF6EE' }]}
          onPress={handleMarkAllRead}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-done-outline" size={16} color={isDarkMode ? '#6EE7B7' : '#187A3D'} />
          <Text style={[styles.markAllText, { color: isDarkMode ? '#6EE7B7' : '#187A3D' }]}>
            {t('markAllRead')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={notificationsQuery.isRefetching}
            onRefresh={() => notificationsQuery.refetch()}
            tintColor={isDarkMode ? '#10B981' : Colors.primary[500]}
            colors={[isDarkMode ? '#10B981' : Colors.primary[500]]}
          />
        }
        renderItem={({ item }) => (
          <NotificationCard notification={item} onPress={handleNotificationPress} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="notifications-off-outline"
            title={t('noNotifications')}
            message={t('notificationsEmptySub')}
          />
        }
      />

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <Modal
          visible={!!selectedNotification}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedNotification(null)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalCard,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}
            >
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={[styles.modalHeaderTitle, { color: themeColors.textPrimary }]}>
                  {t('notificationDetailsTitle')}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedNotification(null)}
                  style={styles.closeBtn}
                >
                  <Ionicons name="close" size={22} color={themeColors.textSecondary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                {/* Category & Status Pill */}
                <View style={styles.modalMetaRow}>
                  {selectedNotification.category && (
                    <View
                      style={[
                        styles.categoryPill,
                        { backgroundColor: isDarkMode ? '#064E3B' : '#EAF6EE' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryPillText,
                          { color: isDarkMode ? '#6EE7B7' : '#187A3D' },
                        ]}
                      >
                        {selectedNotification.category}
                      </Text>
                    </View>
                  )}

                  <View
                    style={[
                      styles.statusPill,
                      {
                        backgroundColor: selectedNotification.is_read
                          ? (isDarkMode ? '#374151' : '#F3F4F6')
                          : (isDarkMode ? '#065F46' : '#EAF6EE'),
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        {
                          color: selectedNotification.is_read
                            ? (isDarkMode ? '#9CA3AF' : '#6B7280')
                            : (isDarkMode ? '#34D399' : '#187A3D'),
                        },
                      ]}
                    >
                      {selectedNotification.is_read
                        ? (t('readBadge') || 'READ')
                        : (t('newBadge') || 'NEW')}
                    </Text>
                  </View>
                </View>

                {/* Title */}
                <Text style={[styles.modalTitleText, { color: themeColors.textPrimary }]}>
                  {selectedNotification.title}
                </Text>

                {/* Date / Time */}
                <View style={styles.timeRow}>
                  <Ionicons name="time-outline" size={14} color={themeColors.textSecondary} />
                  <Text style={[styles.timeText, { color: themeColors.textSecondary }]}>
                    {getLocalizedTimeAgo(selectedNotification.created_at, selectedLanguage.code)}
                  </Text>
                </View>

                {/* Description Body */}
                <Text style={[styles.modalBodyText, { color: themeColors.textSecondary }]}>
                  {selectedNotification.body}
                </Text>
              </ScrollView>

              {/* Modal Actions */}
              <View style={styles.modalFooter}>
                {!selectedNotification.is_read && (
                  <TouchableOpacity
                    style={styles.markSingleBtn}
                    onPress={() => handleMarkSingleRead(selectedNotification.id)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
                    <Text style={styles.markSingleText}>{t('markAsRead')}</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[
                    styles.closeModalBtn,
                    { backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' },
                  ]}
                  onPress={() => setSelectedNotification(null)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.closeModalText, { color: themeColors.textPrimary }]}>
                    {t('close')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    padding: Spacing.lg,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  unreadCountText: {
    fontSize: 13,
    fontWeight: '700',
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  markAllText: {
    fontSize: 12,
    fontWeight: '800',
  },
  list: {
    padding: Spacing.lg,
    paddingBottom: 60,
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
    paddingBottom: 10,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 4,
  },
  modalBody: {
    marginVertical: 4,
  },
  modalMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  categoryPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  categoryPillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalBodyText: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  markSingleBtn: {
    flex: 1,
    backgroundColor: '#187A3D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 14,
  },
  markSingleText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  closeModalBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
  },
  closeModalText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
