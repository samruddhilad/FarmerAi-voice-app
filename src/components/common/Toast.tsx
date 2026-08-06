/**
 * Toast Notification Component
 * Types: success, error, info, warning
 * Auto-dismiss after 3 seconds
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  visible: boolean;
  type?: ToastType;
  message: string;
  onDismiss: () => void;
  duration?: number;
}

const toastConfig: Record<
  ToastType,
  { icon: keyof typeof Ionicons.glyphMap; bg: string; color: string }
> = {
  success: { icon: 'checkmark-circle', bg: Colors.successBg, color: Colors.success },
  error: { icon: 'close-circle', bg: Colors.errorBg, color: Colors.error },
  info: { icon: 'information-circle', bg: Colors.infoBg, color: Colors.info },
  warning: { icon: 'warning', bg: Colors.warningBg, color: Colors.warning },
};

export const Toast: React.FC<ToastProps> = ({
  visible,
  type = 'info',
  message,
  onDismiss,
  duration = 3000,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss());
  };

  if (!visible) return null;

  const config = toastConfig[type];

  return (
    <Animated.View
      style={[
        styles.container,
        Shadows.lg,
        { backgroundColor: config.bg, transform: [{ translateY }], opacity },
      ]}
    >
      <Ionicons name={config.icon} size={22} color={config.color} />
      <Text style={[styles.message, { color: config.color }]} numberOfLines={2}>
        {message}
      </Text>
      <TouchableOpacity onPress={hideToast} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons name="close" size={18} color={config.color} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    zIndex: 9999,
    gap: Spacing.md,
  },
  message: {
    ...Typography.bodySm,
    flex: 1,
    fontWeight: '500',
  },
});
