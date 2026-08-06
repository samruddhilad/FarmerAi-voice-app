/**
 * Onboarding Screen
 * 3-step onboarding with illustrations
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Animated,
  ViewToken,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { Button } from '../../components/common/Button';
import { useAuthContext } from '../../contexts/AuthContext';
import { AuthScreenProps } from '../../navigation/types';

interface OnboardingItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}

const ONBOARDING_DATA: OnboardingItem[] = [
  {
    id: '1',
    icon: 'leaf',
    title: 'Discover Schemes',
    description:
      'Find government schemes tailored for farmers. Get information about eligibility, benefits, and how to apply.',
    color: Colors.primary[500],
  },
  {
    id: '2',
    icon: 'mic',
    title: 'Ask in Your Language',
    description:
      'Talk to our AI assistant in 12 regional languages. Just speak and get instant answers about farming and schemes.',
    color: Colors.primary[600],
  },
  {
    id: '3',
    icon: 'checkmark-circle',
    title: 'Check Eligibility',
    description:
      'Quickly check your eligibility for various schemes. Save time by knowing what you qualify for before applying.',
    color: Colors.primary[700],
  },
];

export const OnboardingScreen: React.FC<AuthScreenProps<'Onboarding'>> = ({
  navigation,
}) => {
  const { completeOnboarding } = useAuthContext();
  const { width: windowWidth } = useWindowDimensions();
  const slideWidth = Math.min(windowWidth, 450);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    await completeOnboarding();
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View style={[styles.slide, { width: slideWidth }]}>
      <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
        <Ionicons name={item.icon} size={64} color={item.color} />
      </View>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideDescription}>{item.description}</Text>
    </View>
  );

  const isLastSlide = currentIndex === ONBOARDING_DATA.length - 1;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {ONBOARDING_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        {!isLastSlide && (
          <Button
            title="Skip"
            onPress={handleGetStarted}
            variant="ghost"
            size="md"
          />
        )}
        <Button
          title={isLastSlide ? 'Get Started' : 'Next'}
          onPress={handleNext}
          variant="primary"
          size="lg"
          icon={isLastSlide ? 'arrow-forward' : undefined}
          iconPosition="right"
          style={{ flex: isLastSlide ? 1 : undefined, minWidth: 120 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing['3xl'],
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  slideTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  slideDescription: {
    ...Typography.bodyLg,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: Spacing.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing['3xl'],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray[300],
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.primary[500],
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing['2xl'],
    paddingBottom: Spacing['5xl'],
    gap: Spacing.lg,
  },
});
