import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '../../components/layout/Header';
import { Colors } from '../../theme';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { HomeScreenProps } from '../../navigation/types';

export const VoiceAssistantScreen: React.FC<HomeScreenProps<'VoiceAssistant'>> = ({
  navigation,
}) => {
  const { t, selectedLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();

  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'success'>('idle');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  // Questions dictionary dynamically based on language
  const quickQuestions = [
    { question: t('q1'), response: selectedLanguage.code === 'en' ? 'Use Neem Oil spray (5ml/L) or Mancozeb 75% WP for leaf blight.' : 'तुमच्या सोयाबीन पिकावरील करपा रोगासाठी मकोझेब ७५% WP (२ ग्रॅम/लिटर) फवारावे.' },
    { question: t('q2'), response: selectedLanguage.code === 'en' ? 'PM-Kisan installment is scheduled to be credited this month.' : 'पीएम किसान सन्मान निधीचा पुढील हप्ता लवकरच खात्यात जमा होईल.' },
    { question: t('q3'), response: selectedLanguage.code === 'en' ? 'Apply NPK 100:50:50 in 3 split doses for cotton.' : 'कापूस पिकासाठी नत्र:स्फुरद:पालाश १००:५०:५० मात्रा ३ टप्प्यात द्यावी.' },
    { question: t('q4'), response: selectedLanguage.code === 'en' ? 'Today Latur APMC rate for Yellow Soybean is ₹4,650/Quintal.' : 'आजचे लातूर APMC मधील सोयाबीन बाजारभाव ₹४,६५०/क्विंटल आहेत.' },
  ];

  const ripple1Val = useRef(new Animated.Value(0)).current;
  const ripple2Val = useRef(new Animated.Value(0)).current;
  const ripple3Val = useRef(new Animated.Value(0)).current;
  const micScaleVal = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    let breathing: Animated.CompositeAnimation;
    if (status === 'idle') {
      breathing = Animated.loop(
        Animated.sequence([
          Animated.timing(micScaleVal, {
            toValue: 1.06,
            duration: 1400,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(micScaleVal, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      );
      breathing.start();
    } else if (status === 'listening') {
      breathing = Animated.loop(
        Animated.sequence([
          Animated.timing(micScaleVal, {
            toValue: 1.15,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(micScaleVal, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      );
      breathing.start();
    } else {
      Animated.spring(micScaleVal, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (breathing) breathing.stop();
    };
  }, [status]);

  useEffect(() => {
    let ripples: Animated.CompositeAnimation;
    const animateRing = (val: Animated.Value, delay: number) => {
      val.setValue(0);
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(val, {
            toValue: 1,
            duration: 2200,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
        ])
      );
    };

    ripples = Animated.parallel([
      animateRing(ripple1Val, 0),
      animateRing(ripple2Val, 700),
      animateRing(ripple3Val, 1400),
    ]);
    ripples.start();

    return () => {
      if (ripples) ripples.stop();
    };
  }, []);

  const triggerMockQuery = (questionText: string, replyText: string) => {
    setStatus('processing');
    setTranscript(questionText);
    setResponse('');

    setTimeout(() => {
      setStatus('success');
      setResponse(replyText);
      setTimeout(() => {
        setStatus('idle');
      }, 1500);
    }, 1200);
  };

  const handleMicPress = () => {
    if (status === 'idle') {
      setStatus('listening');
      setTranscript('');
      setResponse('');
      setTimeout(() => {
        const randomQ = quickQuestions[Math.floor(Math.random() * quickQuestions.length)];
        triggerMockQuery(randomQ.question, randomQ.response);
      }, 2000);
    }
  };

  const getRippleStyle = (val: Animated.Value) => {
    return {
      transform: [
        {
          scale: val.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 2.2],
          }),
        },
      ],
      opacity: val.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0.4, 0.15, 0],
      }),
    };
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('agriMitraTab')}
        showLanguageSelector
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bannerWrapper}>
          <LinearGradient
            colors={themeColors.bannerBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.assistantBannerCard, { borderColor: isDarkMode ? '#065F46' : '#DCFCE7' }]}
          >
            <View style={styles.bannerTextWrap}>
              <View style={styles.assistantBadge}>
                <Ionicons name="add-circle" size={14} color="#15803D" />
                <Text style={styles.assistantBadgeText}>{t('agriMitraTab')}</Text>
              </View>
              <Text style={[styles.assistantTitle, { color: isDarkMode ? '#F9FAFB' : '#14532D' }]}>
                {t('appName')}
              </Text>
              <Text style={[styles.assistantSubtitle, { color: isDarkMode ? '#D1D5DB' : '#475569' }]}>
                {t('voiceTapToSpeak')}
              </Text>
            </View>

            <View style={styles.leafWrap}>
              <Ionicons name="leaf-outline" size={72} color={isDarkMode ? '#059669' : '#A7F3D0'} />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.micSection}>
          <Text style={[styles.micMainInstruction, { color: themeColors.textPrimary }]}>
            {status === 'listening' ? t('voiceListening') : t('voiceTapToSpeak')}
          </Text>

          <View style={styles.micContainer}>
            <Animated.View style={[styles.rippleRing, getRippleStyle(ripple1Val)]} />
            <Animated.View style={[styles.rippleRing, getRippleStyle(ripple2Val)]} />
            <Animated.View style={[styles.rippleRing, getRippleStyle(ripple3Val)]} />

            <Animated.View style={{ transform: [{ scale: micScaleVal }] }}>
              <TouchableOpacity
                onPress={handleMicPress}
                activeOpacity={0.85}
                style={styles.micButtonTouchable}
              >
                <LinearGradient
                  colors={['#4ADE80', '#16A34A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.micCircle}
                >
                  <Ionicons name="mic" size={42} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Text style={[styles.micTapLabel, { color: themeColors.textPrimary }]}>{t('voiceTapToSpeak')}</Text>
          <TouchableOpacity onPress={handleMicPress}>
            <Text style={styles.micSubLabel}>{t('agriMitraTab')}</Text>
          </TouchableOpacity>
        </View>

        {(transcript || response || status === 'processing') ? (
          <View style={styles.chatSection}>
            {transcript ? (
              <View style={[styles.userCard, { backgroundColor: isDarkMode ? '#064E3B' : '#F0F9F1', borderColor: isDarkMode ? '#047857' : '#DCFCE7' }]}>
                <Ionicons name="person-circle-outline" size={18} color="#16A34A" />
                <Text style={[styles.userCardText, { color: themeColors.textPrimary }]}>{transcript}</Text>
              </View>
            ) : null}

            {status === 'processing' && (
              <View style={[styles.aiCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
                <Ionicons name="leaf" size={18} color="#16A34A" />
                <Text style={[styles.aiCardText, { color: themeColors.textPrimary }]}>{t('loading')}</Text>
              </View>
            )}

            {response ? (
              <View style={[styles.aiCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
                <Ionicons name="leaf" size={18} color="#16A34A" />
                <Text style={[styles.aiCardText, { color: themeColors.textPrimary }]}>{response}</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        <View style={styles.quickQuestionsSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>{t('suggestedQuestionsTitle')}</Text>

          <View style={styles.questionGrid}>
            {quickQuestions.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.questionCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
                activeOpacity={0.8}
                onPress={() => triggerMockQuery(item.question, item.response)}
              >
                <View style={styles.micBadge}>
                  <Ionicons name="mic" size={14} color="#16A34A" />
                </View>
                <Text style={[styles.questionText, { color: themeColors.textPrimary }]}>{item.question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bannerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  assistantBannerCard: {
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  assistantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginBottom: 8,
  },
  assistantBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  assistantTitle: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
  },
  assistantSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  leafWrap: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micSection: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  micMainInstruction: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  micContainer: {
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 12,
  },
  rippleRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#86EFAC',
  },
  micButtonTouchable: {
    borderRadius: 48,
    elevation: 8,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  micCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micTapLabel: {
    fontSize: 14,
    fontWeight: '800',
  },
  micSubLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
    marginTop: 2,
  },
  chatSection: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  userCardText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  aiCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  aiCardText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  quickQuestionsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  questionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  questionCard: {
    width: '48%',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1,
    minHeight: 70,
  },
  micBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  questionText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    lineHeight: 18,
  },
});
