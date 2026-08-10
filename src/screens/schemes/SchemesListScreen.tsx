/**
 * Schemes List Screen — Clean Green Farmer AI Theme with Global i18n & Back Button
 */

import React, { useState } from 'react';
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
import { Colors, Spacing, Typography } from '../../theme';
import { SearchBar } from '../../components/layout/SearchBar';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { SkeletonSchemeCard } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import { useSchemes, useSchemeCategories } from '../../hooks/useSchemes';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { getCategoryTranslation } from '../../utils/i18n';
import { SchemesScreenProps } from '../../navigation/types';
import { Scheme } from '../../types/api.types';

// Green Theme Constants
const PRIMARY_GREEN = '#16803A';
const DARK_GREEN = '#0B5D2A';
const LIGHT_GREEN_BG = '#EAF7EC';
const VERY_LIGHT_BG = '#F5FBF5';
const BORDER_GREEN = '#D1E7D6';

export const SchemesListScreen: React.FC<SchemesScreenProps<'SchemesList'>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { t, selectedLanguage } = useLanguageContext();
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

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('HomeTab' as any);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerBlock}>
      {/* Top Header Row with Back Button */}
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <TouchableOpacity style={styles.backCircle} onPress={handleBack} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={22} color={DARK_GREEN} />
          </TouchableOpacity>

          <View style={styles.brandIcon}>
            <Text style={styles.brandIconText}>म</Text>
          </View>
          <View>
            <Text style={styles.screenTitle}>{t('schemesPageTitle')}</Text>
            <Text style={styles.screenSubtitle}>{t('schemesPageSubtitle')}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.circleAction} activeOpacity={0.8}>
            <Ionicons name="globe-outline" size={20} color={DARK_GREEN} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleAction} activeOpacity={0.8}>
            <Ionicons name="notifications-outline" size={20} color={DARK_GREEN} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('searchPlaceholder')}
          iconColor={PRIMARY_GREEN}
          containerStyle={styles.searchContainerStyle}
        />
      </View>

      {/* Category Pills (Horizontal Scroll) */}
      <FlatList
        data={allCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        keyExtractor={(item) => item.id || item.name}
        renderItem={({ item }) => {
          const isActive = selectedCategory === item.name;
          const translatedCatName = item.name === 'All'
            ? t('allSchemes')
            : getCategoryTranslation(item.name, selectedLanguage.code);

          return (
            <TouchableOpacity
              style={[styles.categoryTab, isActive ? styles.categoryTabActive : styles.categoryTabInactive]}
              onPress={() => setSelectedCategory(item.name)}
              activeOpacity={0.85}
            >
              <Text style={[styles.categoryText, isActive ? styles.categoryTextActive : styles.categoryTextInactive]}>
                {translatedCatName}
              </Text>
              {item.count ? (
                <View style={[styles.countBadge, isActive ? styles.countBadgeActive : styles.countBadgeInactive]}>
                  <Text style={[styles.categoryCount, isActive ? styles.categoryCountActive : styles.categoryCountInactive]}>
                    {item.count}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        }}
      />

      {/* Scheme Count Label */}
      <Text style={styles.countText}>{t('schemesCount', { count: totalSchemes })}</Text>
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
            tintColor={PRIMARY_GREEN}
            colors={[PRIMARY_GREEN]}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <SchemeCard scheme={item} onPress={handleSchemePress} compact />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            icon="documents-outline"
            title={t('noSchemesFound')}
            message={t('noSchemesSub')}
          />
        }
        ListFooterComponent={
          schemesQuery.isFetchingNextPage ? (
            <View style={styles.loadingMore}>
              <Text style={styles.loadingText}>{t('loadingMore')}</Text>
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
    backgroundColor: VERY_LIGHT_BG,
  },
  headerBlock: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
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
    gap: Spacing.sm,
  },
  backCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: LIGHT_GREEN_BG,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BORDER_GREEN,
    marginRight: 2,
  },
  brandIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: DARK_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandIconText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: DARK_GREEN,
    lineHeight: 26,
  },
  screenSubtitle: {
    fontSize: 12,
    color: '#2D5A3B',
    marginTop: 2,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  circleAction: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: LIGHT_GREEN_BG,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BORDER_GREEN,
  },
  searchWrap: {
    marginBottom: Spacing.lg,
  },
  searchContainerStyle: {
    backgroundColor: Colors.white,
    borderColor: BORDER_GREEN,
    borderRadius: 16,
    height: 50,
  },
  categoryList: {
    gap: 8,
    paddingBottom: Spacing.md,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
  },
  categoryTabActive: {
    backgroundColor: DARK_GREEN,
    borderColor: DARK_GREEN,
  },
  categoryTabInactive: {
    backgroundColor: LIGHT_GREEN_BG,
    borderColor: BORDER_GREEN,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
  },
  categoryTextActive: {
    color: Colors.white,
  },
  categoryTextInactive: {
    color: DARK_GREEN,
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  countBadgeInactive: {
    backgroundColor: 'rgba(11, 93, 42, 0.1)',
  },
  categoryCount: {
    fontSize: 11,
    fontWeight: '800',
  },
  categoryCountActive: {
    color: Colors.white,
  },
  categoryCountInactive: {
    color: DARK_GREEN,
  },
  countText: {
    fontSize: 14,
    fontWeight: '800',
    color: DARK_GREEN,
    marginTop: Spacing.xs,
    marginBottom: 4,
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
    color: DARK_GREEN,
  },
});
