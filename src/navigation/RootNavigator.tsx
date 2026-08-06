/**
 * Root Navigator — Auth check → AuthStack or MainTabs
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuthContext } from '../contexts/AuthContext';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { LoadingScreen } from '../screens/support/SupportScreens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
};
