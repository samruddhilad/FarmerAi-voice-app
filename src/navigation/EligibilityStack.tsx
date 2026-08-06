/**
 * Eligibility Stack Navigator
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EligibilityStackParamList } from './types';
import { EligibilityScreen } from '../screens/eligibility/EligibilityScreen';
import { EligibilityResultScreen } from '../screens/eligibility/EligibilityResultScreen';

const Stack = createNativeStackNavigator<EligibilityStackParamList>();

export const EligibilityStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <Stack.Screen name="EligibilityForm" component={EligibilityScreen} />
    <Stack.Screen name="EligibilityResult" component={EligibilityResultScreen} />
  </Stack.Navigator>
);
