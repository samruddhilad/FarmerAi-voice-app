/**
 * Profile Screen — User info, menu items, logout
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Button } from '../../components/common/Button';
import { Dialog } from '../../components/common/Dialog';
import { useAuthContext } from '../../contexts/AuthContext';
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
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthContext();
  const logoutMutation = useLogout();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    setShowLogoutDialog(false);
    try { await logoutMutation.mutateAsync(); } catch {}
    await logout();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.md }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.screenTitle}>Profile</Text>

        {/* User card */}
        <View style={[styles.userCard, Shadows.card]}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={Colors.primary[500]} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Farmer'}</Text>
            <Text style={styles.userEmail}>{user?.email || user?.mobile || 'Not logged in'}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="create-outline" size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
        </View>

        {/* Menu items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen as any)}
              activeOpacity={0.6}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={20} color={Colors.primary[600]} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.badge && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={18} color={Colors.gray[400]} />
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

        <Text style={styles.version}>Version 1.0.0</Text>
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
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { padding: Spacing.xl, paddingBottom: 100 },
  screenTitle: { ...Typography.h3, color: Colors.text.primary, marginBottom: Spacing.xl },
  userCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl, padding: Spacing.xl, gap: Spacing.lg,
    borderWidth: 1, borderColor: Colors.gray[100], marginBottom: Spacing['2xl'],
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.primary[50],
    justifyContent: 'center', alignItems: 'center',
  },
  userInfo: { flex: 1 },
  userName: { ...Typography.h5, color: Colors.text.primary, marginBottom: 2 },
  userEmail: { ...Typography.bodySm, color: Colors.text.secondary },
  menuContainer: { gap: Spacing.xxs },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.lg,
    gap: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  menuIconContainer: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.primary[50],
    justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { ...Typography.label, color: Colors.text.primary, flex: 1 },
  menuBadge: {
    backgroundColor: Colors.primary[500], borderRadius: 10,
    paddingHorizontal: Spacing.sm, paddingVertical: 2,
  },
  menuBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.white },
  version: {
    ...Typography.caption, color: Colors.text.tertiary, textAlign: 'center',
    marginTop: Spacing['3xl'],
  },
});
