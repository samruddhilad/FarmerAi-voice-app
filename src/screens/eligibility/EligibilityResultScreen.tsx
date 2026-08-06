/**
 * Eligibility Result Screen — Shows eligible/ineligible schemes
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { getCategoryIcon, getCategoryColor } from '../../utils/category';
import { EmptyState } from '../../components/common/EmptyState';
import { EligibilityScreenProps } from '../../navigation/types';
import { EligibilityResult, Scheme } from '../../types/api.types';
import { SchemeCard } from '../../components/cards/SchemeCard';

export const EligibilityResultScreen: React.FC<EligibilityScreenProps<'EligibilityResult'>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { results } = route.params;

  const handleResultPress = (scheme: Scheme) => {
    navigation.navigate('SchemesTab' as any, {
      screen: 'SchemeDetails',
      params: { schemeId: scheme.id },
    });
  };

  const handleStartOver = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.headerTop, { paddingTop: insets.top + Spacing.lg }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Eligible Schemes</Text>
          <View style={styles.headerSpacer} />
        </View>
        <Text style={styles.matchCount}>{results.total_eligible} matches</Text>
      </View>

      <FlatList
        data={results.results}
        keyExtractor={(item, idx) => item.scheme.id || idx.toString()}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + Spacing['5xl'] }]}
        renderItem={({ item }) => (
          <SchemeCard scheme={item.scheme} onPress={handleResultPress} compact={true} />
        )}
        ItemSeparatorComponent={() => <View style={styles.cardSpacer} />}
        ListEmptyComponent={
          <EmptyState
            icon="checkmark-done-circle-outline"
            title="No results"
            message="We couldn't determine eligibility for any schemes."
          />
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.startOver} onPress={handleStartOver} activeOpacity={0.8}>
            <Ionicons name="refresh-outline" size={20} color={Colors.primary[600]} />
            <Text style={styles.startOverText}>Start Over</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.mint[100],
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerSpacer: {
    width: 24,
  },
  headerTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    flex: 1,
  },
  matchCount: {
    ...Typography.bodyLg,
    color: Colors.gray[500],
    marginLeft: 0,
  },
  list: {
    padding: Spacing.lg,
  },
  cardSpacer: {
    height: Spacing.md,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    padding: Spacing['2xl'],
  },
  category: {
    ...Typography.bodySm,
    color: Colors.gray[500],
    marginBottom: Spacing.sm,
  },
  schemeTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  schemeDescription: {
    ...Typography.bodyLg,
    color: Colors.gray[500],
    marginBottom: Spacing.lg,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  reasonText: {
    ...Typography.label,
    color: Colors.primary[600],
    flex: 1,
  },
  startOver: {
    alignSelf: 'center',
    marginTop: Spacing['4xl'],
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  startOverText: {
    ...Typography.h5,
    color: Colors.primary[600],
  },
});
