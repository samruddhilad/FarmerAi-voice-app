/**
 * Home Screen
 * Greeting, Voice Card, Feature Badges, Quick Actions, Featured Schemes, Recent Updates
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Header } from '../../components/layout/Header';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { QuickActionCard } from '../../components/cards/QuickActionCard';
import { NotificationCard } from '../../components/cards/NotificationCard';
import { FloatingActionButton } from '../../components/layout/FloatingActionButton';
import { SkeletonSchemeCard } from '../../components/common/SkeletonLoader';
import { useSchemes } from '../../hooks/useSchemes';
import { useQuickActions } from '../../hooks/useQuickActions';
import { useNotifications } from '../../hooks/useNotifications';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { HomeScreenProps } from '../../navigation/types';
import { Scheme, Notification as AppNotification } from '../../types/api.types';

const TOPICS = [
  { label: 'Horticulture', icon: 'leaf-outline' as const },
  { label: 'Irrigation', icon: 'water-outline' as const },
  { label: 'Mechanization', icon: 'construct-outline' as const },
  { label: 'Tribal Development', icon: 'people-outline' as const },
  { label: 'Crop Development', icon: 'flower-outline' as const },
];

const ASK_ITEMS = [
  { title: 'Which schemes am I eligible for?', icon: 'mic-outline' as const },
  { title: 'PM Kisan Status Check', icon: 'mic-outline' as const },
  { title: 'How to apply for crop insurance?', icon: 'mic-outline' as const },
];

export const HomeScreen: React.FC<HomeScreenProps<'Home'>> = ({ navigation }) => {
  const { user } = useAuthContext();
  const { selectedLanguage } = useLanguageContext();
  const schemesQuery = useSchemes({ limit: 5 });
  const notificationsQuery = useNotifications();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const schemes = schemesQuery.data?.pages?.[0]?.data?.items || [];
  const notifications = (notificationsQuery.data as any)?.data?.slice?.(0, 3) || [];
  const isRefreshing = schemesQuery.isRefetching;

  const handleRefresh = () => {
    schemesQuery.refetch();
    notificationsQuery.refetch();
  };

  const handleSchemePress = (scheme: Scheme) => {
    navigation.navigate('SchemeDetails', { schemeId: scheme.id });
  };

  const handleNotificationPress = (notif: AppNotification) => {
    navigation.navigate('Notifications');
  };

  return (
    <View style={styles.container}>
      <Header
        selectedLanguage={selectedLanguage.name}
        onLanguagePress={() => navigation.navigate('ProfileTab', { screen: 'LanguageSelection' } as any)}
        onNotificationPress={() => navigation.navigate('Notifications')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary[600]}
            colors={[Colors.primary[600]]}
          />
        }
      >
        {/* Main Pale Mint Hero Section Container */}
        <View style={styles.heroCard}>
          {/* Live Badge */}
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>

          {/* Greeting Titles */}
          <Text style={styles.greetingTitle}>
            Namaste! 🌱{'\n'}
            <Text style={styles.greetingBold}>{greeting}</Text>
          </Text>

          <Text style={styles.greetingSubtitle}>
            Your AI assistant for government schemes & agri guidance.
          </Text>

          {/* Voice Assistant Mic Section */}
          <TouchableOpacity
            style={styles.voiceSection}
            onPress={() => navigation.navigate('VoiceAssistant')}
            activeOpacity={0.85}
          >
            <View style={styles.voiceIconContainer}>
              <Ionicons name="mic-outline" size={36} color={Colors.white} />
            </View>

            <View style={styles.voiceRight}>
              <Text style={styles.voiceTitle}>Tap to Speak</Text>
              <Text style={styles.voiceSubtitle}>
                Ask anything in your language. Available in 12 regional languages.
              </Text>
              <View style={styles.voiceBars}>
                {[12, 18, 26, 20, 14].map((h, i) => (
                  <View key={i} style={[styles.voiceBar, { height: h }]} />
                ))}
              </View>
            </View>
          </TouchableOpacity>

          {/* Feature Badges Pills */}
          <View style={styles.heroBadges}>
            {[
              { icon: 'document-text-outline' as const, label: '12 Languages' },
              { icon: 'flash-outline' as const, label: 'Instant Reply' },
              { icon: 'leaf-outline' as const, label: 'Free to Use' },
            ].map((badge, idx) => (
              <View key={idx} style={styles.heroBadge}>
                <Ionicons name={badge.icon} size={15} color={Colors.primary[600]} />
                <Text style={styles.heroBadgeText}>{badge.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Ask Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="flash-outline" size={20} color={Colors.primary[600]} />
              <Text style={styles.sectionTitle}>Ask</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('VoiceAssistant')}>
              <Text style={styles.seeAll}>View all →</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={ASK_ITEMS}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <QuickActionCard
                title={item.title}
                icon={item.icon}
                onPress={() => navigation.navigate('VoiceAssistant')}
              />
            )}
          />
        </View>

        {/* More Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Topics</Text>
          <View style={styles.topicsGrid}>
            {TOPICS.map((topic, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.topicChip}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('SchemesTab', {
                    screen: 'SchemesList',
                    params: { category: topic.label },
                  } as any)
                }
              >
                <Ionicons name={topic.icon} size={16} color={Colors.primary[600]} />
                <Text style={styles.topicText}>{topic.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Schemes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="star-outline" size={20} color={Colors.primary[600]} />
              <Text style={styles.sectionTitle}>Featured Schemes</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('SchemesTab' as any)}
            >
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>

          {schemesQuery.isLoading ? (
            <FlatList
              data={[1, 2, 3]}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              keyExtractor={(_, i) => i.toString()}
              renderItem={() => <SkeletonSchemeCard />}
            />
          ) : (
            <FlatList
              data={schemes}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SchemeCard scheme={item} onPress={handleSchemePress} />
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No schemes available</Text>
              }
            />
          )}
        </View>

        {/* Recent Updates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="megaphone-outline" size={20} color={Colors.primary[600]} />
              <Text style={styles.sectionTitle}>Recent Updates</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <Text style={styles.seeAll}>View all →</Text>
            </TouchableOpacity>
          </View>

          {notifications.map((notif: AppNotification, idx: number) => (
            <NotificationCard
              key={notif.id || idx}
              notification={notif}
              onPress={handleNotificationPress}
            />
          ))}

          {notifications.length === 0 && !notificationsQuery.isLoading && (
            <Text style={styles.emptyText}>No recent updates</Text>
          )}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing['3xl'],
  },

  /* Pale Mint Hero Section Card */
  heroCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xs,
    backgroundColor: Colors.mint[100],
    borderRadius: 28,
    padding: Spacing.xl,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    gap: 6,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.primary[600],
  },
  liveText: {
    fontSize: 12,
    color: Colors.primary[600],
    fontWeight: '700',
  },
  greetingTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 34,
  },
  greetingBold: {
    fontWeight: '800',
    color: Colors.text.primary,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 6,
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },

  /* Voice Mic Section */
  voiceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  voiceIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  voiceRight: {
    flex: 1,
  },
  voiceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary[600],
    marginBottom: 2,
  },
  voiceSubtitle: {
    fontSize: 12,
    color: Colors.text.secondary,
    lineHeight: 17,
  },
  voiceBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    marginTop: 8,
  },
  voiceBar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary[600],
  },

  /* Hero Feature Badges */
  heroBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.primary,
  },

  /* Sections */
  section: {
    marginTop: Spacing['2xl'],
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary[600],
  },
  horizontalList: {
    paddingRight: Spacing.lg,
    gap: Spacing.md,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  topicText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.text.tertiary,
    textAlign: 'center',
    padding: Spacing.xl,
  },
});
