/**
 * Schemes List Screen — reference-style header, category pills, and scheme cards
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { SearchBar } from '../../components/layout/SearchBar';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { SkeletonSchemeCard } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import { useSchemes, useSchemeCategories } from '../../hooks/useSchemes';
import { SchemesScreenProps } from '../../navigation/types';
import { Scheme } from '../../types/api.types';

const ACCENT = Colors.primary[600];
const ACCENT_LIGHT = Colors.mint[100];

export const SchemesListScreen: React.FC<SchemesScreenProps<'SchemesList'>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState(route.params?.category || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoriesQuery = useSchemeCategories();
  const schemesQuery = useSchemes({
    category: selectedCategory !== 'All' ? selectedCategory : undefined,
    search: searchQuery || undefined,
    limit: 10,
  });

  const categories = categoriesQuery.data || [];
  const totalSchemes = schemesQuery.data?.pages?.[0]?.data?.total || 0;
  const allCategories = [{ id: 'all', name: 'All', count: totalSchemes }, ...categories];
  const schemes = schemesQuery.data?.pages?.flatMap((page) => page.data.items) || [];

  const handleSchemePress = (scheme: Scheme) => {
    navigation.navigate('SchemeDetails', { schemeId: scheme.id });
  };

  const handleLoadMore = () => {
    if (schemesQuery.hasNextPage && !schemesQuery.isFetchingNextPage) {
      schemesQuery.fetchNextPage();
    }
  };

  const renderHeader = () => (
    <View style={styles.headerBlock}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <View style={styles.brandIcon}>
            <Text style={styles.brandIconText}>म</Text>
          </View>
          <View>
            <Text style={styles.screenTitle}>Schemes</Text>
            <Text style={styles.screenSubtitle}>20 curated agriculture schemes</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.circleAction} activeOpacity={0.8}>
            <Ionicons name="globe-outline" size={20} color="#5A3E2B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleAction} activeOpacity={0.8}>
            <Ionicons name="notifications-outline" size={20} color="#5A3E2B" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} placeholder="Search schemes..." />
      </View>

      <FlatList
        data={allCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        keyExtractor={(item) => item.id || item.name}
        renderItem={({ item }) => {
          const isActive = selectedCategory === item.name;

          return (
            <TouchableOpacity
              style={[styles.categoryTab, isActive && styles.categoryTabActive]}
              onPress={() => setSelectedCategory(item.name)}
              activeOpacity={0.85}
            >
              <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                {item.name}
              </Text>
              {item.count ? <Text style={[styles.categoryCount, isActive && styles.categoryCountActive]}>{item.count}</Text> : null}
            </TouchableOpacity>
          );
        }}
      />

      <Text style={styles.countText}>{totalSchemes} schemes</Text>
    </View>
  );

  if (schemesQuery.isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          {[1, 2].map((item) => (
            <View key={item} style={styles.skeletonWrap}>
              <SkeletonSchemeCard />
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
      <FlatList
        data={schemes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.schemesList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={schemesQuery.isRefetching}
            onRefresh={() => schemesQuery.refetch()}
            tintColor={ACCENT}
            colors={[ACCENT]}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <SchemeCard scheme={item} onPress={handleSchemePress} compact />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            icon="documents-outline"
            title="No schemes found"
            message="Try a different category or search term."
          />
        }
        ListFooterComponent={
          schemesQuery.isFetchingNextPage ? (
            <View style={styles.loadingMore}>
              <Text style={styles.loadingText}>Loading more...</Text>
            </View>
          ) : (
            <View style={{ height: Spacing['5xl'] }} />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mint[100],
  },
  headerBlock: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  brandIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandIconText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '800',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text.primary,
    lineHeight: 28,
  },
  screenSubtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  circleAction: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ACCENT_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrap: {
    marginBottom: Spacing.lg,
  },
  categoryList: {
    gap: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: ACCENT_LIGHT,
  },
  categoryTabActive: {
    backgroundColor: ACCENT,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary[700],
  },
  categoryTextActive: {
    color: Colors.white,
  },
  categoryCount: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary[700],
  },
  categoryCountActive: {
    color: Colors.white,
  },
  countText: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  schemesList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  loadingContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  skeletonWrap: {
    marginBottom: Spacing.lg,
  },
  loadingMore: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.bodySm,
    color: Colors.text.tertiary,
  },
});
