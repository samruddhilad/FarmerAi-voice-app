/**
 * Root Navigator — Auth check → AuthStack or MainTabs
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuthContext } from '../contexts/AuthContext';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { SplashScreen } from '../screens/auth/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isLoading } = useAuthContext();

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
