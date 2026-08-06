/**
 * Settings Screen
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { ProfileScreenProps } from '../../navigation/types';

export const SettingsScreen: React.FC<ProfileScreenProps<'Settings'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { selectedLanguage } = useLanguageContext();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <TouchableOpacity style={styles.settingItem}
          onPress={() => navigation.navigate('LanguageSelection')}>
          <Ionicons name="language-outline" size={20} color={Colors.primary[600]} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingValue}>{selectedLanguage.name}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.gray[400]} />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={20} color={Colors.primary[600]} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingValue}>Enabled</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: Spacing['2xl'] }]}>About</Text>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('About')}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.primary[600]} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>About Farmer AI</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.gray[400]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Ionicons name="shield-outline" size={20} color={Colors.primary[600]} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.gray[400]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('TermsConditions')}>
          <Ionicons name="document-text-outline" size={20} color={Colors.primary[600]} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Terms & Conditions</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.gray[400]} />
        </TouchableOpacity>
      </ScrollView>
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
  content: { padding: Spacing.xl },
  sectionTitle: { ...Typography.labelSm, color: Colors.text.tertiary, marginBottom: Spacing.md, textTransform: 'uppercase', letterSpacing: 1 },
  settingItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.lg,
    gap: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  settingContent: { flex: 1 },
  settingLabel: { ...Typography.label, color: Colors.text.primary },
  settingValue: { ...Typography.bodySm, color: Colors.text.tertiary, marginTop: 2 },
});
