/**
 * Skeleton Loader Component
 * Animated placeholder for loading states
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../../theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = BorderRadius.sm,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: width as number,
          height,
          borderRadius,
          backgroundColor: Colors.shimmer,
          opacity,
        },
        style,
      ]}
    />
  );
};

// Pre-built skeleton patterns

export const SkeletonCard: React.FC = () => (
  <View style={skeletonStyles.card}>
    <Skeleton width={48} height={48} borderRadius={BorderRadius.md} />
    <View style={skeletonStyles.cardContent}>
      <Skeleton width="60%" height={14} />
      <Skeleton width="90%" height={12} style={{ marginTop: Spacing.sm }} />
      <Skeleton width="40%" height={12} style={{ marginTop: Spacing.sm }} />
    </View>
  </View>
);

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <View style={skeletonStyles.list}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </View>
);

export const SkeletonSchemeCard: React.FC = () => (
  <View style={skeletonStyles.schemeCard}>
    <Skeleton width={40} height={40} borderRadius={BorderRadius.sm} />
    <View style={{ marginTop: Spacing.md }}>
      <Skeleton width={80} height={20} borderRadius={BorderRadius.full} />
    </View>
    <Skeleton width="80%" height={16} style={{ marginTop: Spacing.md }} />
    <Skeleton width="100%" height={12} style={{ marginTop: Spacing.sm }} />
    <Skeleton width="50%" height={12} style={{ marginTop: Spacing.sm }} />
    <Skeleton width={100} height={24} borderRadius={BorderRadius.full} style={{ marginTop: Spacing.md }} />
  </View>
);

const skeletonStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    gap: 0,
  },
  schemeCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[100],
    width: 220,
    marginRight: Spacing.md,
  },
});
