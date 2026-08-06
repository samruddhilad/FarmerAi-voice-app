/**
 * Search Screen — Debounced search with results, recent searches, category filters
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { SearchBar } from '../../components/layout/SearchBar';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { SkeletonList } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import { useSchemeSearch } from '../../hooks/useSchemes';
import { HomeScreenProps } from '../../navigation/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SearchScreen: React.FC<HomeScreenProps<'Search'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useSchemeSearch(searchQuery);

  const results = (searchResults.data as any)?.data || [];

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            placeholder="Search schemes, topics..."
          />
        </View>
      </View>

      {searchQuery.length < 2 ? (
        <View style={styles.suggestions}>
          <Text style={styles.suggestionsTitle}>Popular Searches</Text>
          {['PM Kisan', 'Crop Insurance', 'Drip Irrigation', 'Soil Health Card', 'KCC Loan'].map(
            (term, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.suggestionItem}
                onPress={() => setSearchQuery(term)}
              >
                <Ionicons name="search-outline" size={16} color={Colors.gray[400]} />
                <Text style={styles.suggestionText}>{term}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      ) : searchResults.isLoading ? (
        <SkeletonList count={5} />
      ) : results.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title="No results found"
          message={`No schemes match "${searchQuery}". Try a different keyword.`}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.resultsList}
          renderItem={({ item }) => (
            <SchemeCard
              scheme={item}
              onPress={(s) => navigation.navigate('SchemeDetails', { schemeId: s.id })}
              compact
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  backBtn: { padding: Spacing.xs },
  searchBarContainer: { flex: 1 },
  suggestions: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg },
  suggestionsTitle: {
    ...Typography.label,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  suggestionText: { ...Typography.body, color: Colors.text.primary },
  resultsList: { padding: Spacing.lg, gap: Spacing.md },
});
