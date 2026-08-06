/**
 * Schemes Stack Navigator
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SchemesStackParamList } from './types';
import { SchemesListScreen } from '../screens/schemes/SchemesListScreen';
import { SchemeDetailsScreen } from '../screens/schemes/SchemeDetailsScreen';

const Stack = createNativeStackNavigator<SchemesStackParamList>();

export const SchemesStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <Stack.Screen name="SchemesList" component={SchemesListScreen} initialParams={{}} />
    <Stack.Screen name="SchemeDetails" component={SchemeDetailsScreen} />
  </Stack.Navigator>
);
