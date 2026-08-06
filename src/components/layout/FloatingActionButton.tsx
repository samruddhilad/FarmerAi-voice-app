/**
 * FloatingActionButton Component
 * Pulsing microphone FAB for voice assistant
 */

import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../theme';

interface FABProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: number;
  animated?: boolean;
}

export const FloatingActionButton: React.FC<FABProps> = ({
  onPress,
  icon = 'mic',
  size = 56,
  animated = true,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animated) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [animated]);

  return (
    <Animated.View
      style={[
        styles.outerRing,
        {
          width: size + 16,
          height: size + 16,
          borderRadius: (size + 16) / 2,
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          Shadows.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.8}
        accessibilityLabel="Voice Assistant"
        accessibilityRole="button"
      >
        <Ionicons name={icon} size={size * 0.43} color={Colors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  outerRing: {
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
  button: {
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
