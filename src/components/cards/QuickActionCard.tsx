import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Shadows } from '../../theme';

interface QuickActionCardProps {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  icon = 'mic-outline',
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
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.touchable, Shadows.card]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        accessibilityLabel={title}
      >
        <LinearGradient
          colors={['#FFFFFF', '#FAF8F4']} // White to soft warm cream gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={20} color={Colors.primary[600]} />
          </View>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          <Ionicons name="arrow-forward" size={14} color={Colors.primary[500]} style={styles.arrow} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 20, // 20px border radius
    overflow: 'hidden',
    width: 150,
    height: 130,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  container: {
    flex: 1,
    padding: Spacing.md,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.text.primary,
    lineHeight: 16,
    marginTop: Spacing.xs,
  },
  arrow: {
    alignSelf: 'flex-end',
  },
});
