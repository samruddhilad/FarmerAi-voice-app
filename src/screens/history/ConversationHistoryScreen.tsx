/**
 * Conversation History Screen — Past conversations
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { EmptyState } from '../../components/common/EmptyState';
import { SkeletonList } from '../../components/common/SkeletonLoader';
import { useConversations } from '../../hooks/useHistory';
import { ProfileScreenProps } from '../../navigation/types';
import { Conversation } from '../../types/api.types';

export const ConversationHistoryScreen: React.FC<ProfileScreenProps<'ConversationHistory'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const conversationsQuery = useConversations();
  const conversations = (conversationsQuery.data as any)?.data || [];

  if (conversationsQuery.isLoading) return <SkeletonList count={5} />;

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity style={[styles.card, Shadows.sm]} activeOpacity={0.7}>
      <View style={styles.cardIcon}>
        <Ionicons name="chatbubbles-outline" size={20} color={Colors.primary[500]} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title || 'Conversation'}
        </Text>
        <Text style={styles.cardPreview} numberOfLines={1}>
          {item.preview || `${item.message_count} messages`}
        </Text>
        <Text style={styles.cardDate}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.gray[400]} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat History</Text>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyState icon="chatbubbles-outline" title="No conversations yet"
            message="Your voice and chat conversations will appear here." />
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
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg, padding: Spacing.lg, gap: Spacing.md,
    borderWidth: 1, borderColor: Colors.gray[100],
  },
  cardIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary[50],
    justifyContent: 'center', alignItems: 'center',
  },
  cardContent: { flex: 1 },
  cardTitle: { ...Typography.label, color: Colors.text.primary, marginBottom: 2 },
  cardPreview: { ...Typography.bodySm, color: Colors.text.secondary, marginBottom: 2 },
  cardDate: { ...Typography.caption, color: Colors.text.tertiary },
});
