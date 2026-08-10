/**
 * Notifications Screen — Notification list with mark-all-read and i18n
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { NotificationCard } from '../../components/cards/NotificationCard';
import { EmptyState } from '../../components/common/EmptyState';
import { SkeletonList } from '../../components/common/SkeletonLoader';
import { useNotifications, useMarkNotificationsRead } from '../../hooks/useNotifications';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { HomeScreenProps } from '../../navigation/types';
import { Notification as AppNotification } from '../../types/api.types';

export const NotificationsScreen: React.FC<HomeScreenProps<'Notifications'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { t, selectedLanguage } = useLanguageContext();
  const notificationsQuery = useNotifications();
  const markRead = useMarkNotificationsRead();
  const notifications = (notificationsQuery.data as any)?.data || [];

  if (notificationsQuery.isLoading) return <SkeletonList count={5} />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('notificationsTitle')}</Text>
        <TouchableOpacity onPress={() => markRead.mutate()}>
          <Text style={styles.markRead}>{selectedLanguage.code === 'en' ? 'Mark all read' : 'सर्व वाचेली करा'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item: AppNotification) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={notificationsQuery.isRefetching}
            onRefresh={() => notificationsQuery.refetch()}
            tintColor={Colors.primary[500]} colors={[Colors.primary[500]]} />
        }
        renderItem={({ item }) => (
          <NotificationCard notification={item} onPress={() => {}} />
        )}
        ListEmptyComponent={
          <EmptyState icon="notifications-off-outline" title={t('noNotifications')}
            message={selectedLanguage.code === 'en' ? "You'll see updates about schemes and announcements here." : "इथे तुम्हाला नवनवीन शासकीय योजना व अपडेट्स दिसतील."} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md, gap: Spacing.md,
  },
  headerTitle: { ...Typography.h5, color: Colors.text.primary, flex: 1 },
  markRead: { ...Typography.labelSm, color: Colors.primary[600] },
  list: { padding: Spacing.lg, paddingBottom: 100 },
});
