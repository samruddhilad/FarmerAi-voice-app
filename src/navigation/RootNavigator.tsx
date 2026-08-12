/**
 * Root Navigator — Splash → Auth check → AuthStack or MainTabs
 */

import React, { useState, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuthContext } from '../contexts/AuthContext';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
<<<<<<< HEAD
import { SplashScreen } from '../screens/auth/SplashScreen';
=======
import { LoadingScreen } from '../screens/support/SupportScreens';
import SplashScreen from '../screens/splash/SplashScreen';
>>>>>>> 4a4f7b94162da68f4aa1690ee3d8ab8f520e2235

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isLoading } = useAuthContext();

  // Show the animated splash screen on first mount
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  );
};
