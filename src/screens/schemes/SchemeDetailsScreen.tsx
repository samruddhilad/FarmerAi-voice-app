/**
 * Scheme Details Screen — reference-style hero and action layout
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Share, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { getCategoryIcon } from '../../utils/category';
import { SkeletonList } from '../../components/common/SkeletonLoader';
import { ErrorState } from '../../components/common/ErrorState';
import { useScheme } from '../../hooks/useSchemes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'SchemeDetails'>;

const ACCENT = Colors.primary[600];
const ACCENT_LIGHT = Colors.mint[100];
const PAGE_BG = Colors.mint[50];

export const SchemeDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const schemeId = route.params?.schemeId || '';
  const schemeQuery = useScheme(schemeId);

  const scheme = (schemeQuery.data as any)?.data;

  if (schemeQuery.isLoading) return <SkeletonList count={4} />;
  if (schemeQuery.isError) {
    return <ErrorState onRetry={() => schemeQuery.refetch()} />;
  }
  if (!scheme) return <ErrorState title="Scheme not found" />;

  const openUrl = async () => {
    const targetUrl = scheme.application_url || 'https://mahadbt.maharashtra.gov.in';
    await Linking.openURL(targetUrl);
  };

  const shareScheme = async () => {
    await Share.share({ message: `${scheme.title}\n${scheme.description}` });
  };

  const openEligibility = () => {
    const parentNavigation = navigation.getParent() as any;
    parentNavigation?.navigate('EligibilityTab', { screen: 'EligibilityForm' });
  };

  const openVoiceAssistant = () => {
    const parentNavigation = navigation.getParent() as any;
    parentNavigation?.navigate('HomeTab', { screen: 'VoiceAssistant' });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: PAGE_BG }]}> 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.navBar}>
          <View style={styles.navBarLeft}>
            <View style={styles.navLogo}>
              <Ionicons name="leaf-outline" size={20} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.navTitle}>Farmer AI</Text>
              <Text style={styles.navSubtitle}>VOICE ASSISTANT</Text>
            </View>
          </View>

          <View style={styles.navBarActions}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navIconButton}>
              <Ionicons name="arrow-back" size={20} color={Colors.gray[700]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={shareScheme} style={styles.navIconButton}>
              <Ionicons name="share-social-outline" size={20} color={Colors.gray[700]} />
            </TouchableOpacity>
          </View>
        </View>

        <LinearGradient
          colors={[Colors.primary[700], Colors.primary[500]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroContent}>
            <View style={[styles.heroIcon, { backgroundColor: Colors.white }]}> 
              <Ionicons name={getCategoryIcon(scheme.category) as any} size={36} color={ACCENT} />
            </View>

            <View style={styles.heroTextWrap}>
              <Text style={styles.heroTitle}>{scheme.title}</Text>
              <Text style={styles.heroSubtitle}>{scheme.description}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.detailsCard}>
          {scheme.amount && (
            <View style={styles.amountBlock}>
              <Text style={styles.amountLabel}>BENEFIT</Text>
              <Text style={styles.amountText}>{scheme.amount}</Text>
            </View>
          )}

          <TouchableOpacity onPress={openVoiceAssistant} activeOpacity={0.86} style={styles.primaryActionWrapper}>
            <LinearGradient
              colors={[Colors.primary[700], Colors.primary[500]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryAction}
            >
              <Ionicons name="mic-outline" size={20} color={Colors.white} />
              <Text style={styles.primaryActionText}>Ask Yojna Mitra</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.buttonGrid}>
            <TouchableOpacity style={styles.filledAction} onPress={openUrl} activeOpacity={0.86}>
              <View>
                <Text style={styles.filledActionText}>Apply Online</Text>
              </View>
              <Ionicons name="open-outline" size={20} color={Colors.white} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.outlineAction} onPress={openEligibility} activeOpacity={0.86}>
              <Ionicons name="checkbox-outline" size={20} color={ACCENT} />
              <Text style={styles.outlineActionText}>Eligibility</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.viewAction} onPress={openUrl} activeOpacity={0.86}>
            <Ionicons name="document-text-outline" size={20} color={ACCENT} />
            <Text style={styles.viewActionText}>View GR</Text>
            <Ionicons name="open-outline" size={18} color={Colors.text.secondary} />
          </TouchableOpacity>

          {(scheme.about || scheme.description) && (
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>About</Text>
              <Text style={styles.infoText}>{scheme.about ?? scheme.description}</Text>
            </View>
          )}

          {scheme.eligibility_criteria && (
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Eligibility Criteria</Text>
              <Text style={styles.infoText}>{scheme.eligibility_criteria}</Text>
            </View>
          )}

          {scheme.benefits && (
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Benefits</Text>
              <Text style={styles.infoText}>{scheme.benefits}</Text>
            </View>
          )}

          {scheme.documents_required && scheme.documents_required.length > 0 && (
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Documents Required</Text>
              {scheme.documents_required.map((doc: string, idx: number) => (
                <View key={idx} style={styles.docItem}>
                  <Ionicons name="document-outline" size={16} color={ACCENT} />
                  <Text style={styles.docText}>{doc}</Text>
                </View>
              ))}
            </View>
          )}

          {scheme.deadline && (
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Deadline</Text>
              <View style={styles.deadlineRow}>
                <Ionicons name="calendar-outline" size={16} color={Colors.warning} />
                <Text style={styles.deadlineText}>{scheme.deadline}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing.md }]}>
        <TouchableOpacity style={styles.bottomOutline} onPress={openVoiceAssistant} activeOpacity={0.86}>
          <Ionicons name="mic-outline" size={20} color={ACCENT} />
          <Text style={styles.bottomOutlineText}>Ask Yojna Mitra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomFilled} onPress={openUrl} activeOpacity={0.86}>
          <Text style={styles.bottomFilledText}>Apply Online</Text>
          <Ionicons name="open-outline" size={18} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 130,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.mint[100],
  },
  navBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  navLogo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 24,
  },
  navSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.gray[400],
    letterSpacing: 1.2,
    marginTop: 1,
  },
  navBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  navIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  hero: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing['5xl'],
    minHeight: 220,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
    marginTop: Spacing.sm,
  },
  heroIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextWrap: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    color: Colors.white,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  heroSubtitle: {
    marginTop: Spacing.md,
    fontSize: 11,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  detailsCard: {
    backgroundColor: Colors.white,
    marginTop: -24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.lg,
  },
  amountBlock: {
    marginBottom: Spacing.lg,
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray[500],
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  amountText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
    color: Colors.primary[700],
  },
  primaryActionWrapper: {
    marginBottom: Spacing.md,
  },
  primaryAction: {
    height: 54,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  primaryActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.white,
  },
  buttonGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  filledAction: {
    flex: 1,
    minHeight: 62,
    borderRadius: 24,
    backgroundColor: Colors.primary[200],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filledActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary[800],
  },
  outlineAction: {
    flex: 1,
    minHeight: 62,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary[400],
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  outlineActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary[700],
  },
  viewAction: {
    minHeight: 52,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
  },
  viewActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text.primary,
  },
  infoSection: {
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    marginBottom: Spacing.lg,
  },
  infoTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  infoText: {
    ...Typography.body,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  docText: {
    ...Typography.body,
    color: Colors.text.secondary,
    flex: 1,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  deadlineText: {
    ...Typography.label,
    color: Colors.warning,
  },
  bottomBar: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: 0,
    flexDirection: 'row',
    gap: Spacing.md,
    backgroundColor: PAGE_BG,
    paddingTop: Spacing.md,
  },
  bottomOutline: {
    flex: 1,
    minHeight: 72,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary[300],
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  bottomOutlineText: {
    fontSize: 16,
    fontWeight: '800',
    color: ACCENT,
  },
  bottomFilled: {
    flex: 1,
    minHeight: 72,
    borderRadius: 24,
    backgroundColor: Colors.primary[700],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  bottomFilledText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
  },
});
