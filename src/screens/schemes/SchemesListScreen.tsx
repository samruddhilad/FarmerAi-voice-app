/**
 * Schemes List Screen — Clean Green Farmer AI Theme with Global i18n & ThemeContext
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
import { useThemeContext } from '../../contexts/ThemeContext';
import { Header } from '../../components/layout/Header';
import { getLocalizedScheme, getLocalizedCategoryName } from '../../utils/schemeLocalization';
import { SchemesScreenProps } from '../../navigation/types';
import { Scheme } from '../../types/api.types';

const PRIMARY_GREEN = '#187A3D';

export const SchemesListScreen: React.FC<SchemesScreenProps<'SchemesList'>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { t, selectedLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();

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
  const rawSchemes = schemesQuery.data?.pages?.flatMap((page) => page.data.items) || [];

  // Filter & Localize schemes
  const schemes = rawSchemes.map((s) => getLocalizedScheme(s, selectedLanguage.code)).filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.category && s.category.toLowerCase().includes(q))
    );
  });

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
      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('searchPlaceholder') || 'योजना किंवा विषय शोधा...'}
          iconColor={PRIMARY_GREEN}
          containerStyle={{
            ...styles.searchContainerStyle,
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
          }}
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
          const translatedCatName = getLocalizedCategoryName(item.name, selectedLanguage.code);

          return (
            <TouchableOpacity
              style={[
                styles.categoryTab,
                {
                  backgroundColor: isActive
                    ? PRIMARY_GREEN
                    : isDarkMode
                    ? themeColors.card
                    : '#EAF6EE',
                  borderColor: isActive ? PRIMARY_GREEN : themeColors.border,
                },
              ]}
              onPress={() => setSelectedCategory(item.name)}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: isActive
                      ? Colors.white
                      : themeColors.textPrimary,
                  },
                ]}
              >
                {translatedCatName}
              </Text>
              {item.count ? (
                <View
                  style={[
                    styles.countBadge,
                    {
                      backgroundColor: isActive
                        ? 'rgba(255, 255, 255, 0.25)'
                        : isDarkMode
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(24, 122, 61, 0.12)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryCount,
                      {
                        color: isActive
                          ? Colors.white
                          : isDarkMode
                          ? '#6EE7B7'
                          : PRIMARY_GREEN,
                      },
                    ]}
                  >
                    {item.count}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        }}
      />

      {/* Scheme Count Label */}
      <Text
        style={[
          styles.countText,
          { color: isDarkMode ? '#6EE7B7' : PRIMARY_GREEN },
        ]}
      >
        {t('schemesCount', { count: totalSchemes })}
      </Text>
    </View>
  );

  if (schemesQuery.isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top + Spacing.sm }]}>
        <Header
          title={t('schemesPageTitle') || 'शासकीय योजना'}
          subtitle={t('schemesPageSubtitle') || '२० निवडक कृषी योजना'}
          showLanguageSelector
          onNotificationPress={() => navigation.navigate('HomeTab', { screen: 'Notifications' } as any)}
          onProfilePress={() => navigation.navigate('ProfileTab', { screen: 'Profile' } as any)}
        />
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
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header
        title={t('schemesPageTitle') || 'शासकीय योजना'}
        subtitle={t('schemesPageSubtitle') || '२० निवडक कृषी योजना'}
        showLanguageSelector
        onNotificationPress={() => navigation.navigate('HomeTab', { screen: 'Notifications' } as any)}
        onProfilePress={() => navigation.navigate('ProfileTab', { screen: 'Profile' } as any)}
      />
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
              <Text style={[styles.loadingText, { color: themeColors.textSecondary }]}>
                {t('loadingMore')}
              </Text>
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
  },
  headerBlock: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  searchWrap: {
    marginBottom: Spacing.md,
  },
  searchContainerStyle: {
    borderRadius: 16,
    height: 50,
    borderWidth: 1,
  },
  categoryList: {
    gap: 8,
    paddingBottom: Spacing.sm,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 24,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryCount: {
    fontSize: 11,
    fontWeight: '800',
  },
  countText: {
    fontSize: 14,
    fontWeight: '800',
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
  },
});
