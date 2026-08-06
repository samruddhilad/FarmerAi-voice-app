/**
 * Eligibility Wizard Screen — Step-by-step eligibility flow
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { EligibilityScreenProps } from '../../navigation/types';
import { EligibilityResponse, EligibilityResult, Scheme } from '../../types/api.types';

type AnswerMap = Record<string, string>;

type Option = {
  label: string;
  value: string;
};

type Question = {
  id: string;
  countLabel: string;
  title: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: 'supportAccess',
    countLabel: 'Question 1 of 6',
    title: 'Do you already receive any government support?',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
  },
  {
    id: 'landOwnership',
    countLabel: 'Question 2 of 6',
    title: 'Do you own agricultural land?',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
  },
  {
    id: 'landSize',
    countLabel: 'Question 3 of 6',
    title: 'Approximate land size?',
    options: [
      { label: '<2 acres', value: '<2 acres' },
      { label: '2-5 acres', value: '2-5 acres' },
      { label: '5-10 acres', value: '5-10 acres' },
      { label: '>10 acres', value: '>10 acres' },
    ],
  },
  {
    id: 'socialCategory',
    countLabel: 'Question 4 of 6',
    title: 'Your social category?',
    options: [
      { label: 'General', value: 'General' },
      { label: 'SC', value: 'SC' },
      { label: 'ST', value: 'ST' },
      { label: 'OBC', value: 'OBC' },
    ],
  },
  {
    id: 'womanFarmer',
    countLabel: 'Question 5 of 6',
    title: 'Are you a woman farmer?',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
  },
  {
    id: 'interestArea',
    countLabel: 'Question 6 of 6',
    title: 'Which areas interest you most?',
    options: [
      { label: 'Irrigation', value: 'Irrigation' },
      { label: 'Machinery', value: 'Machinery' },
      { label: 'Crop Insurance', value: 'Crop Insurance' },
      { label: 'Horticulture', value: 'Horticulture' },
      { label: 'Credit', value: 'Credit' },
    ],
  },
];

const createScheme = (scheme: Scheme): Scheme => scheme;

const buildResults = (answers: AnswerMap): EligibilityResponse => {
  const results: EligibilityResult[] = [];

  const stScheme = createScheme({
    id: 'tribal-sub-plan-farmer-support',
    title: 'Tribal Sub-Plan Farmer Support Scheme',
    description: 'Enhanced input & mechanization subsidy for tribal farmers.',
    category: 'Tribal Farmer Schemes',
    type: 'Central',
  });

  const creditScheme = createScheme({
    id: 'kisan-credit-card',
    title: 'Kisan Credit Card (KCC)',
    description: 'Short-term credit at 4% interest (with subvention) for crop needs.',
    category: 'Farmer Welfare & Insurance',
    type: 'Central',
  });

  if (answers.socialCategory === 'ST') {
    results.push({
      scheme: stScheme,
      is_eligible: true,
      match_percentage: 96,
      reasons: ['Special benefits for ST farmers'],
    });
  }

  if (answers.interestArea === 'Credit' || answers.landOwnership === 'Yes') {
    results.push({
      scheme: creditScheme,
      is_eligible: true,
      match_percentage: answers.interestArea === 'Credit' ? 94 : 82,
      reasons: [
        answers.interestArea === 'Credit'
          ? 'Matches your interest (Credit)'
          : 'Useful for crop input financing',
      ],
    });
  }

  if (answers.womanFarmer === 'Yes') {
    results.push({
      scheme: createScheme({
        id: 'women-farmer-support',
        title: 'Women Farmer Support Program',
        description: 'Targeted support for women-led farms and collectives.',
        category: 'Women Farmer Support',
        type: 'State',
      }),
      is_eligible: true,
      match_percentage: 88,
      reasons: ['Tailored for woman farmers'],
    });
  }

  if (results.length === 0) {
    results.push({
      scheme: creditScheme,
      is_eligible: true,
      match_percentage: 78,
      reasons: ['Broad support for farm credit and crop needs'],
    });
  }

  return {
    results,
    total_eligible: results.length,
  };
};

export const EligibilityScreen: React.FC<EligibilityScreenProps<'EligibilityForm'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStep(0);
      setAnswers({});
    });

    return unsubscribe;
  }, [navigation]);

  const currentQuestion = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  const handleSelect = (value: string) => {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };

    setAnswers(nextAnswers);

    if (step === QUESTIONS.length - 1) {
      navigation.navigate('EligibilityResult', { results: buildResults(nextAnswers) });
      return;
    }

    setStep((current) => current + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.headerTop, { paddingTop: insets.top + Spacing.lg }]}>
          <TouchableOpacity onPress={() => (step > 0 ? setStep(step - 1) : navigation.goBack())}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Eligibility Wizard</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing['5xl'] }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.stepCount}>{currentQuestion.countLabel}</Text>
        <Text style={styles.stepTitle}>{currentQuestion.title}</Text>

        <View style={styles.optionList}>
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => handleSelect(option.value)}
                activeOpacity={0.85}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option.label}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={28}
                  color={isSelected ? Colors.primary[600] : Colors.gray[400]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.mint[100],
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingBottom: Spacing.md,
  },
  headerSpacer: {
    width: 24,
  },
  headerTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    flex: 1,
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.gray[200],
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary[500],
    borderRadius: 999,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['4xl'],
  },
  stepCount: {
    ...Typography.bodyLg,
    color: Colors.gray[500],
    marginBottom: Spacing['3xl'],
  },
  stepTitle: {
    ...Typography.h2,
    color: Colors.text.primary,
    marginBottom: Spacing['4xl'],
  },
  optionList: {
    gap: Spacing.md,
  },
  optionCard: {
    minHeight: 96,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.card,
  },
  optionCardSelected: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.mint[50],
  },
  optionText: {
    ...Typography.h5,
    color: Colors.text.primary,
    flex: 1,
    paddingRight: Spacing.lg,
  },
  optionTextSelected: {
    color: Colors.primary[700],
  },
});
