import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Shadows } from '../../theme';

interface QuickActionCardProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  subtitle,
  icon = 'leaf-outline',
  onPress,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 40,
    }).start();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        accessibilityLabel={title}
      >
        <View style={styles.container}>
          <View style={styles.topRow}>
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={22} color="#187A3D" />
            </View>
            <Ionicons name="chevron-forward" size={16} color="#187A3D" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            {subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '48%',
    marginBottom: 12,
  },
  touchable: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5E0',
    shadowColor: '#187A3D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  container: {
    padding: 14,
    minHeight: 115,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#EAF6EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#172033',
    lineHeight: 19,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#5F6B7A',
    marginTop: 2,
  },
});
