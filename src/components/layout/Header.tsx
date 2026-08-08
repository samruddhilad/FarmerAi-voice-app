/**
 * Header Component — Farmer AI
 * Header with logo, title, theme toggle, notification, light green profile icon,
 * and anchored floating language dropdown directly under language button (🌐 मराठी ▼).
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { Language } from '../../types/api.types';

const LANGUAGES: Language[] = [
  { code: 'mr', name: 'मराठी' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'as', name: 'असमीया' },
  { code: 'ahr', name: 'अहिराणी' },
  { code: 'kok', name: 'कोंकणी' },
];

interface HeaderProps {
  showLanguageSelector?: boolean;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  onBackPress?: () => void;
  showBack?: boolean;
  title?: string;
  subtitle?: string;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  showLanguageSelector = true,
  onNotificationPress,
  onProfilePress,
  onBackPress,
  showBack = false,
  title,
  subtitle,
  notificationCount = 3,
}) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, toggleTheme, colors: themeColors } = useThemeContext();
  const { selectedLanguage, setLanguage } = useLanguageContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.xs, backgroundColor: themeColors.headerBg, borderBottomColor: themeColors.border }]}>
      {/* Left section: Back button OR Logo & Title */}
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color={themeColors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoContainer}>
            <Ionicons name="leaf" size={22} color={Colors.white} />
          </View>
        )}

        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>{title || 'Farmer AI'}</Text>
          {showBack ? null : (
            <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>{subtitle || 'SMART FARMING'}</Text>
          )}
        </View>
      </View>

      {/* Right actions section */}
      <View style={styles.right}>
        {/* Language selector dropdown pill */}
        {showLanguageSelector && (
          <View style={styles.languageWrapper}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}
              onPress={() => setDropdownOpen(!dropdownOpen)}
              activeOpacity={0.85}
            >
              <Ionicons name="globe-outline" size={15} color="#16A34A" />
              <Text style={[styles.languageText, { color: themeColors.textPrimary }]}>
                {selectedLanguage.name}
              </Text>
              <Ionicons name="chevron-down" size={13} color={themeColors.textSecondary} />
            </TouchableOpacity>

            {/* Anchored Floating Dropdown directly below button */}
            {dropdownOpen && (
              <>
                <TouchableOpacity
                  style={styles.backdropOverlay}
                  activeOpacity={1}
                  onPress={() => setDropdownOpen(false)}
                />
                <View
                  style={[
                    styles.floatingDropdownCard,
                    { backgroundColor: themeColors.card, borderColor: themeColors.border },
                  ]}
                >
                  <ScrollView
                    nestedScrollEnabled
                    style={{ maxHeight: 280 }}
                    showsVerticalScrollIndicator={true}
                  >
                    {LANGUAGES.map((lang, index) => {
                      const isSelected = selectedLanguage.code === lang.code || selectedLanguage.name === lang.name;
                      return (
                        <TouchableOpacity
                          key={lang.code}
                          style={[
                            styles.dropdownRow,
                            index < LANGUAGES.length - 1 && { borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#374151' : '#F3F4F6' },
                            isSelected && { backgroundColor: isDarkMode ? '#064E3B' : '#F0F9F1' },
                          ]}
                          onPress={() => handleSelectLanguage(lang)}
                        >
                          <Text
                            style={[
                              styles.dropdownRowText,
                              { color: themeColors.textPrimary },
                              isSelected && { fontWeight: '800', color: '#16A34A' },
                            ]}
                          >
                            {lang.name}
                          </Text>
                          {isSelected && <Ionicons name="checkmark" size={16} color="#16A34A" />}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </>
            )}
          </View>
        )}

        {/* Theme toggle button (Sun / Moon) */}
        <TouchableOpacity
          style={[styles.actionIconButton, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
          onPress={toggleTheme}
          activeOpacity={0.8}
          accessibilityLabel="Toggle Theme"
        >
          <Ionicons
            name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
            size={18}
            color={isDarkMode ? '#F59E0B' : '#4B5563'}
          />
        </TouchableOpacity>

        {!showBack && (
          <>
            <TouchableOpacity
              style={[styles.actionIconButton, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
              onPress={onNotificationPress}
              activeOpacity={0.8}
            >
              <Ionicons name="notifications-outline" size={19} color={themeColors.textPrimary} />
              {notificationCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Profile icon button with LIGHT GREEN BACKGROUND TINT */}
            <TouchableOpacity
              style={[
                styles.actionIconButton,
                styles.profileButtonLightGreen,
                { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9', borderColor: isDarkMode ? '#047857' : '#A7F3D0' },
              ]}
              onPress={onProfilePress}
              activeOpacity={0.8}
            >
              <Ionicons name="person-outline" size={19} color={isDarkMode ? '#6EE7B7' : '#15803D'} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    zIndex: 100,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    padding: 6,
    marginRight: 2,
  },
  logoContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#1E8E3E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginTop: 1,
    textTransform: 'uppercase',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 100,
  },
  languageWrapper: {
    position: 'relative',
    zIndex: 1000,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  languageText: {
    fontSize: 13,
    fontWeight: '600',
  },
  actionIconButton: {
    position: 'relative',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  profileButtonLightGreen: {
    backgroundColor: '#E8F5E9',
    borderColor: '#A7F3D0',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.white,
  },

  /* Floating Popover Dropdown positioned directly below button */
  backdropOverlay: {
    position: 'absolute',
    top: -500,
    left: -500,
    right: -500,
    bottom: -1000,
    width: 2000,
    height: 2000,
    zIndex: 999,
  },
  floatingDropdownCard: {
    position: 'absolute',
    top: 40,
    right: 0,
    width: 200,
    borderRadius: 14,
    paddingVertical: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 12,
    zIndex: 1000,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  dropdownRowText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
