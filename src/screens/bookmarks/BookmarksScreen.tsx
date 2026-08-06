/**
 * Bookmarks Screen — Saved schemes list with remove action
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { EmptyState } from '../../components/common/EmptyState';
import { SkeletonList } from '../../components/common/SkeletonLoader';
import { useBookmarks } from '../../hooks/useBookmarks';
import { ProfileScreenProps } from '../../navigation/types';

export const BookmarksScreen: React.FC<ProfileScreenProps<'Bookmarks'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const bookmarksQuery = useBookmarks();
  const bookmarks = (bookmarksQuery.data as any)?.data || [];

  if (bookmarksQuery.isLoading) return <SkeletonList count={4} />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>

      <FlatList
        data={bookmarks}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: any }) => (
          <SchemeCard
            scheme={item.scheme}
            onPress={(s) => navigation.navigate('Profile' as any)}
            compact
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="bookmark-outline"
            title="No bookmarks yet"
            message="Save schemes you're interested in for quick access."
            actionLabel="Browse Schemes"
            onAction={() => navigation.navigate('SchemesTab' as any)}
          />
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
  headerTitle: { ...Typography.h5, color: Colors.text.primary },
  list: { padding: Spacing.lg, gap: Spacing.md, paddingBottom: 100 },
});
