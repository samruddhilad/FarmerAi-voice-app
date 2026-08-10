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
        <View style={[styles.userCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }, Shadows.card]}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={Colors.primary[500]} />
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: themeColors.textPrimary }]}>{user?.name || (selectedLanguage.code === 'en' ? 'Farmer Friend' : 'शेतकरी मित्र')}</Text>
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
                <Ionicons name={item.icon} size={20} color={Colors.primary[600]} />
              </View>
              <Text style={[styles.menuLabel, { color: themeColors.textPrimary }]}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={themeColors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <Button
          title={selectedLanguage.code === 'en' ? 'Logout' : 'बाहेर पडा (Logout)'}
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
        title={selectedLanguage.code === 'en' ? 'Logout' : 'बाहेर पडा'}
        message={selectedLanguage.code === 'en' ? 'Are you sure you want to logout?' : 'तुम्हाला खरोखर बाहेर पडायचे आहे का?'}
        actions={[
          { label: t('cancel'), onPress: () => setShowLogoutDialog(false) },
          { label: selectedLanguage.code === 'en' ? 'Logout' : 'बाहेर पडा', onPress: handleLogout, variant: 'destructive' },
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
  version: {
    ...Typography.caption, textAlign: 'center',
    marginTop: Spacing['3xl'],
  },
});
