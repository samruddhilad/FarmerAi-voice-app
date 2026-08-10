import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MainTabParamList } from './types';
import { HomeStack } from './HomeStack';
import { SchemesStack } from './SchemesStack';
import { EligibilityStack } from './EligibilityStack';
import { ProfileStack } from './ProfileStack';
import { Colors } from '../theme';
import { useThemeContext } from '../contexts/ThemeContext';
import { useLanguageContext } from '../contexts/LanguageContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

const FloatingCenterFab: React.FC<{ onPress: () => void; isFocused?: boolean }> = ({ onPress, isFocused }) => {
  const { t } = useLanguageContext();
  const pulseAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.4],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0.4, 0.15, 0],
  });

  return (
    <View style={styles.centerItemContainer}>
      <TouchableOpacity
        style={styles.centerFabTouchable}
        activeOpacity={0.85}
        onPress={onPress}
      >
        <Animated.View
          style={[
            styles.rippleRing,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        />
        <LinearGradient
          colors={['#4ADE80', '#16A34A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.centerFab}
        >
          <Ionicons name="mic" size={26} color={Colors.white} />
        </LinearGradient>
      </TouchableOpacity>
      <Text style={[styles.centerLabel, isFocused && styles.centerLabelActive]}>{t('agriMitraTab')}</Text>
    </View>
  );
};

const TabItem: React.FC<{
  isFocused: boolean;
  label: string;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  textColor: string;
}> = ({ isFocused, label, activeIcon, inactiveIcon, onPress, textColor }) => {
  const scaleValue = React.useRef(new Animated.Value(isFocused ? 1.1 : 1)).current;

  React.useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: isFocused ? 1.08 : 1,
      useNativeDriver: true,
      friction: 7,
      tension: 40,
    }).start();
  }, [isFocused]);

  const color = isFocused ? '#16A34A' : '#6B7280';
  const iconName = isFocused ? activeIcon : inactiveIcon;

  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }], alignItems: 'center' }}>
        <Ionicons name={iconName} size={22} color={color} />
        <Text style={[styles.tabLabel, { color: isFocused ? '#16A34A' : textColor }]}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

type RegularTab = {
  isCenter?: false;
  routeName: keyof MainTabParamList;
  label: string;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
};

type CenterTab = {
  isCenter: true;
};

type TabConfig = RegularTab | CenterTab;

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t } = useLanguageContext();

  const currentRouteName = state.routes[state.index]?.name;
  const currentChildRoute = (state.routes[state.index]?.state as any)?.routes?.[(state.routes[state.index]?.state as any)?.index || 0]?.name;
  const isVoiceAssistantFocused = currentRouteName === 'HomeTab' && currentChildRoute === 'VoiceAssistant';

  const tabs: TabConfig[] = [
    { routeName: 'HomeTab', label: t('homeTab'), activeIcon: 'home', inactiveIcon: 'home-outline' },
    { routeName: 'SchemesTab', label: t('schemesTab'), activeIcon: 'apps', inactiveIcon: 'apps-outline' },
    { isCenter: true },
    { routeName: 'EligibilityTab', label: t('eligibilityTab'), activeIcon: 'checkmark-circle', inactiveIcon: 'checkmark-circle-outline' },
    { routeName: 'ProfileTab', label: t('profileTab'), activeIcon: 'person', inactiveIcon: 'person-outline' },
  ];

  return (
    <View
      style={[
        styles.tabBarFloatingContainer,
        {
          backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
          borderColor: isDarkMode ? '#374151' : 'rgba(229, 231, 235, 0.8)',
          bottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {tabs.map((tab, index) => {
        if (tab.isCenter) {
          return (
            <FloatingCenterFab
              key="center-fab"
              isFocused={isVoiceAssistantFocused}
              onPress={() => {
                navigation.navigate('HomeTab', { screen: 'VoiceAssistant' });
              }}
            />
          );
        }

        const regularTab = tab as RegularTab;
        const routeIndex = state.routes.findIndex(r => r.name === regularTab.routeName);
        const isFocused = state.index === routeIndex && !isVoiceAssistantFocused;
        const route = state.routes[routeIndex];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            if (regularTab.routeName === 'ProfileTab') {
              navigation.navigate('ProfileTab', { screen: 'Profile' });
            } else if (regularTab.routeName === 'HomeTab') {
              navigation.navigate('HomeTab', { screen: 'Home' });
            } else if (regularTab.routeName === 'SchemesTab') {
              navigation.navigate('SchemesTab', { screen: 'SchemesList' });
            } else if (regularTab.routeName === 'EligibilityTab') {
              navigation.navigate('EligibilityTab', { screen: 'EligibilityForm' });
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        return (
          <TabItem
            key={regularTab.routeName}
            isFocused={isFocused}
            label={regularTab.label}
            activeIcon={regularTab.activeIcon}
            inactiveIcon={regularTab.inactiveIcon}
            onPress={onPress}
            textColor={themeColors.textSecondary}
          />
        );
      })}
    </View>
  );
};

export const MainTabs: React.FC = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} />
    <Tab.Screen name="SchemesTab" component={SchemesStack} />
    <Tab.Screen name="EligibilityTab" component={EligibilityStack} />
    <Tab.Screen name="ProfileTab" component={ProfileStack} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBarFloatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 36, // Capsule floating shape matching reference Image 2
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 8,
    position: 'absolute',
    left: 14,
    right: 14,
    borderWidth: 1.5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  centerItemContainer: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  centerFabTouchable: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    position: 'relative',
  },
  centerFab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  rippleRing: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#86EFAC',
  },
  centerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    marginTop: 2,
  },
  centerLabelActive: {
    color: '#16A34A',
    fontWeight: '800',
  },
});
