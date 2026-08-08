/**
 * Profile Screen — User info, menu items, logout with back navigation button
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { Dialog } from '../../components/common/Dialog';
import { useAuthContext } from '../../contexts/AuthContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLogout } from '../../hooks/useAuth';
import { ProfileScreenProps } from '../../navigation/types';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  screen: string;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { icon: 'settings-outline', label: 'Settings', screen: 'Settings' },
  { icon: 'language-outline', label: 'Language', screen: 'LanguageSelection' },
  { icon: 'bookmark-outline', label: 'Bookmarks', screen: 'Bookmarks' },
  { icon: 'chatbubbles-outline', label: 'Chat History', screen: 'ConversationHistory' },
  { icon: 'help-circle-outline', label: 'Help & Support', screen: 'Help' },
  { icon: 'information-circle-outline', label: 'About', screen: 'About' },
  { icon: 'shield-checkmark-outline', label: 'Privacy Policy', screen: 'PrivacyPolicy' },
  { icon: 'document-text-outline', label: 'Terms & Conditions', screen: 'TermsConditions' },
];

export const ProfileScreen: React.FC<ProfileScreenProps<'Profile'>> = ({ navigation }) => {
  const { user, logout } = useAuthContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const logoutMutation = useLogout();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    setShowLogoutDialog(false);
    try { await logoutMutation.mutateAsync(); } catch {}
    await logout();
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('HomeTab' as any);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header with BACK ARROW option */}
      <Header
        showBack
        onBackPress={handleBack}
        title="Profile"
        showLanguageSelector
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User card */}
        <View style={[styles.userCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }, Shadows.card]}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={Colors.primary[500]} />
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: themeColors.textPrimary }]}>{user?.name || 'Farmer'}</Text>
            <Text style={[styles.userEmail, { color: themeColors.textSecondary }]}>{user?.email || user?.mobile || 'Not logged in'}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="create-outline" size={20} color={themeColors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Menu items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, { borderBottomColor: themeColors.border }]}
              onPress={() => navigation.navigate(item.screen as any)}
              activeOpacity={0.6}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={20} color={Colors.primary[600]} />
              </View>
              <Text style={[styles.menuLabel, { color: themeColors.textPrimary }]}>{item.label}</Text>
              {item.badge && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={18} color={themeColors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <Button
          title="Logout"
          onPress={() => setShowLogoutDialog(true)}
          variant="danger"
          size="md"
          icon="log-out-outline"
          fullWidth
          style={{ marginTop: Spacing['2xl'] }}
        />

        <Text style={[styles.version, { color: themeColors.textSecondary }]}>Version 1.0.0</Text>
      </ScrollView>

      <Dialog
        visible={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        title="Logout"
        message="Are you sure you want to logout?"
        actions={[
          { label: 'Cancel', onPress: () => setShowLogoutDialog(false) },
          { label: 'Logout', onPress: handleLogout, variant: 'destructive' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: Spacing.xl, paddingBottom: 100 },
  userCard: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: BorderRadius.xl, padding: Spacing.xl, gap: Spacing.lg,
    borderWidth: 1, marginBottom: Spacing['2xl'],
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#DCFCE7',
    justifyContent: 'center', alignItems: 'center',
  },
  userInfo: { flex: 1 },
  userName: { ...Typography.h5, marginBottom: 2 },
  userEmail: { ...Typography.bodySm },
  menuContainer: { gap: Spacing.xxs },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.lg,
    gap: Spacing.md, borderBottomWidth: 1,
  },
  menuIconContainer: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#DCFCE7',
    justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { ...Typography.label, flex: 1 },
  menuBadge: {
    backgroundColor: Colors.primary[500], borderRadius: 10,
    paddingHorizontal: Spacing.sm, paddingVertical: 2,
  },
  menuBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.white },
  version: {
    ...Typography.caption, textAlign: 'center',
    marginTop: Spacing['3xl'],
  },
});
