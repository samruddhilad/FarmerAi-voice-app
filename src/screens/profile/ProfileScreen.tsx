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
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useLogout } from '../../hooks/useAuth';
import { ProfileScreenProps } from '../../navigation/types';

export const ProfileScreen: React.FC<ProfileScreenProps<'Profile'>> = ({ navigation }) => {
  const { user, logout } = useAuthContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t, selectedLanguage } = useLanguageContext();
  const logoutMutation = useLogout();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuItems = [
    { icon: 'settings-outline' as const, label: t('settings'), screen: 'Settings' },
    { icon: 'language-outline' as const, label: t('language'), screen: 'LanguageSelection' },
    { icon: 'bookmark-outline' as const, label: t('bookmarks'), screen: 'Bookmarks' },
    { icon: 'chatbubbles-outline' as const, label: t('conversationHistory'), screen: 'ConversationHistory' },
    { icon: 'help-circle-outline' as const, label: t('helpSupport'), screen: 'Help' },
    { icon: 'shield-checkmark-outline' as const, label: t('privacyPolicy'), screen: 'PrivacyPolicy' },
    { icon: 'document-text-outline' as const, label: t('termsConditions'), screen: 'TermsConditions' },
  ];

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
      <Header
        showBack
        onBackPress={handleBack}
        title={t('profileTab')}
        showLanguageSelector
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User card */}
        <View style={[styles.userCard, { backgroundColor: isDarkMode ? themeColors.card : '#F7FCF8', borderColor: isDarkMode ? themeColors.border : '#C8E6C9' }, Shadows.card]}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={Colors.primary[500]} />
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: themeColors.textPrimary }]}>{user?.name || t('farmerFriend')}</Text>
            <Text style={[styles.userEmail, { color: themeColors.textSecondary }]}>{user?.email || user?.mobile || 'farmer@farmerai.org'}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="create-outline" size={20} color={themeColors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Menu items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, { borderBottomColor: themeColors.border }]}
              onPress={() => navigation.navigate(item.screen as any)}
              activeOpacity={0.6}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={18} color={Colors.primary[600]} />
              </View>
              <Text style={[styles.menuLabel, { color: themeColors.textPrimary }]}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={themeColors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <Button
          title={t('logout')}
          onPress={() => setShowLogoutDialog(true)}
          variant="danger"
          size="md"
          icon="log-out-outline"
          fullWidth
          style={{ marginTop: 14 }}
        />

        <Text style={[styles.version, { color: themeColors.textSecondary }]}>Version 1.0.0</Text>
      </ScrollView>

      <Dialog
        visible={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        title={t('logout')}
        message={t('logoutConfirm')}
        actions={[
          { label: t('cancel'), onPress: () => setShowLogoutDialog(false) },
          { label: t('logout'), onPress: handleLogout, variant: 'destructive' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 14, paddingBottom: 45 },
  userCard: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: BorderRadius.lg, padding: 12, gap: 12,
    borderWidth: 1, marginBottom: 12,
  },
  avatar: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: '#DCFCE7',
    justifyContent: 'center', alignItems: 'center',
  },
  userInfo: { flex: 1 },
  userName: { ...Typography.h5, marginBottom: 2 },
  userEmail: { ...Typography.bodySm },
  menuContainer: { gap: Spacing.xxs },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10,
    gap: 10, borderBottomWidth: 1,
  },
  menuIconContainer: {
    width: 32, height: 32, borderRadius: 8, backgroundColor: '#DCFCE7',
    justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { ...Typography.label, flex: 1 },
  version: {
    ...Typography.caption, textAlign: 'center',
    marginTop: 14,
  },
});
