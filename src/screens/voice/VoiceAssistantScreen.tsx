/**
 * Voice Assistant Screen
 * Large mic button, animated waveform, transcript, response display
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Button } from '../../components/common/Button';
import { useVoiceQuery } from '../../hooks/useVoice';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { HomeScreenProps } from '../../navigation/types';

export const VoiceAssistantScreen: React.FC<HomeScreenProps<'VoiceAssistant'>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { selectedLanguage } = useLanguageContext();
  const voiceQuery = useVoiceQuery();

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  // Animated bars for waveform
  const barAnims = useRef(
    Array.from({ length: 7 }, () => new Animated.Value(0.3))
  ).current;

  useEffect(() => {
    if (isRecording) {
      const animations = barAnims.map((anim, i) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: Math.random() * 0.7 + 0.3,
              duration: 200 + i * 50,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.3,
              duration: 200 + i * 50,
              useNativeDriver: true,
            }),
          ])
        )
      );
      animations.forEach((a) => a.start());
      return () => animations.forEach((a) => a.stop());
    }
  }, [isRecording]);

  const handleMicPress = async () => {
    if (isRecording) {
      setIsRecording(false);
      // In production: stop recording, get audio URI, send to API
      // Simulating API call structure:
      // const result = await voiceQuery.mutateAsync({ audioUri, language: selectedLanguage.code });
    } else {
      setIsRecording(true);
      setTranscript('');
      setResponse('');
      // In production: start recording with expo-av
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Assistant</Text>
        <View style={styles.langBadge}>
          <Text style={styles.langText}>{selectedLanguage.name}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {isRecording
              ? 'Listening...'
              : voiceQuery.isPending
              ? 'Processing...'
              : 'Tap the mic to ask'}
          </Text>
          <Text style={styles.statusHint}>
            Speak in {selectedLanguage.name} for best results
          </Text>
        </View>

        {/* Waveform */}
        {isRecording && (
          <View style={styles.waveform}>
            {barAnims.map((anim, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.waveBar,
                  {
                    transform: [{ scaleY: anim }],
                  },
                ]}
              />
            ))}
          </View>
        )}

        {/* Transcript */}
        {transcript ? (
          <View style={styles.messageCard}>
            <View style={styles.messageHeader}>
              <Ionicons name="person-circle-outline" size={20} color={Colors.primary[500]} />
              <Text style={styles.messageLabel}>You said</Text>
            </View>
            <Text style={styles.messageText}>{transcript}</Text>
          </View>
        ) : null}

        {/* AI Response */}
        {response ? (
          <View style={[styles.messageCard, styles.responseCard]}>
            <View style={styles.messageHeader}>
              <Ionicons name="leaf" size={20} color={Colors.primary[500]} />
              <Text style={styles.messageLabel}>Farmer AI</Text>
            </View>
            <Text style={styles.messageText}>{response}</Text>
          </View>
        ) : null}

        {/* Suggestion chips when idle */}
        {!isRecording && !transcript && (
          <View style={styles.suggestions}>
            <Text style={styles.suggestionsTitle}>Try asking</Text>
            {[
              'Which schemes am I eligible for?',
              'How to apply for PM Kisan?',
              'What is the weather forecast?',
              'Tell me about crop insurance',
            ].map((suggestion, idx) => (
              <TouchableOpacity key={idx} style={styles.suggestionChip}>
                <Ionicons name="mic-outline" size={16} color={Colors.primary[500]} />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Mic Button */}
      <View style={styles.micContainer}>
        <TouchableOpacity
          style={[
            styles.micButton,
            Shadows.button,
            isRecording && styles.micButtonRecording,
          ]}
          onPress={handleMicPress}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isRecording ? 'stop' : 'mic'}
            size={36}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.micHint}>
          {isRecording ? 'Tap to stop' : 'Tap to speak'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  backBtn: { padding: Spacing.xs },
  headerTitle: { ...Typography.h5, color: Colors.text.primary, flex: 1 },
  langBadge: {
    backgroundColor: Colors.primary[50],
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  langText: { ...Typography.labelSm, color: Colors.primary[700] },
  scrollView: { flex: 1 },
  scrollContent: { padding: Spacing.xl, paddingBottom: 160 },
  statusContainer: { alignItems: 'center', marginBottom: Spacing['3xl'] },
  statusText: { ...Typography.h4, color: Colors.text.primary, marginBottom: Spacing.xs },
  statusHint: { ...Typography.bodySm, color: Colors.text.tertiary },
  waveform: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    height: 60,
    marginBottom: Spacing['3xl'],
  },
  waveBar: {
    width: 6,
    height: 50,
    backgroundColor: Colors.primary[400],
    borderRadius: 3,
  },
  messageCard: {
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  responseCard: {
    backgroundColor: Colors.primary[50],
    borderColor: Colors.primary[100],
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  messageLabel: { ...Typography.labelSm, color: Colors.text.secondary },
  messageText: { ...Typography.body, color: Colors.text.primary, lineHeight: 22 },
  suggestions: { marginTop: Spacing.xl },
  suggestionsTitle: {
    ...Typography.label,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  suggestionText: { ...Typography.body, color: Colors.text.primary },
  micContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonRecording: {
    backgroundColor: Colors.error,
  },
  micHint: {
    ...Typography.bodySm,
    color: Colors.text.tertiary,
    marginTop: Spacing.sm,
  },
});
