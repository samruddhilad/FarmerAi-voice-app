/**
 * Language Selection Screen — Grid of 12 languages
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useLanguages } from '../../hooks/useLanguages';
import { useUpdateProfile } from '../../hooks/useProfile';
import { ProfileScreenProps } from '../../navigation/types';
import { Language } from '../../types/api.types';

const DEFAULT_LANGUAGES: Language[] = [
  { code: 'mr', name: 'मराठी' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'as', name: 'असमिया' },
  { code: 'ahr', name: 'अहिराणी' },
  { code: 'kok', name: 'कोंकणी' },
];

export const LanguageSelectionScreen: React.FC<ProfileScreenProps<'LanguageSelection'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { selectedLanguage, setLanguage } = useLanguageContext();
  const languagesQuery = useLanguages();
  const updateProfile = useUpdateProfile();

  const languages = (languagesQuery.data as Language[]) || DEFAULT_LANGUAGES;

  const handleSelect = async (lang: Language) => {
    await setLanguage(lang);
    updateProfile.mutate({ preferred_language: lang.code });
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Language</Text>
      </View>

      <Text style={styles.subtitle}>
        Choose your preferred language for the AI assistant
      </Text>

      <FlatList
        data={languages}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => {
          const isSelected = selectedLanguage.code === item.code;
          return (
            <TouchableOpacity
              style={[styles.langCard, isSelected && styles.langCardSelected, Shadows.sm]}
              onPress={() => handleSelect(item)}
            >
              <Text style={[styles.langName, isSelected && styles.langNameSelected]}>
                {item.name}
              </Text>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary[500]} />
              )}
            </TouchableOpacity>
          );
        }}
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
  subtitle: {
    ...Typography.body, color: Colors.text.secondary, paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  grid: { padding: Spacing.lg },
  row: { gap: Spacing.md, marginBottom: Spacing.md },
  langCard: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.lg,
    borderWidth: 1.5, borderColor: Colors.gray[200],
  },
  langCardSelected: { borderColor: Colors.primary[500], backgroundColor: Colors.primary[50] },
  langName: { ...Typography.label, color: Colors.text.primary },
  langNameSelected: { color: Colors.primary[700] },
});
