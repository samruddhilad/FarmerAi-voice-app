/**
 * Home Stack Navigator
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SearchScreen } from '../screens/home/SearchScreen';
import { VoiceAssistantScreen } from '../screens/voice/VoiceAssistantScreen';
import { SchemeDetailsScreen } from '../screens/schemes/SchemeDetailsScreen';
import { SchemesListScreen } from '../screens/schemes/SchemesListScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import { CropSelectionScreen } from '../screens/services/CropSelectionScreen';
import { DiseaseDiagnosisScreen } from '../screens/services/DiseaseDiagnosisScreen';
import { WeatherScreen } from '../screens/services/WeatherScreen';
import { MarketPricesScreen } from '../screens/services/MarketPricesScreen';
import { FertilizerAdviceScreen } from '../screens/services/FertilizerAdviceScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="VoiceAssistant" component={VoiceAssistantScreen} />
    <Stack.Screen name="SchemeDetails" component={SchemeDetailsScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="CropSelection" component={CropSelectionScreen} />
    <Stack.Screen name="DiseaseDiagnosis" component={DiseaseDiagnosisScreen} />
    <Stack.Screen name="Weather" component={WeatherScreen} />
    <Stack.Screen name="Schemes" component={SchemesListScreen as any} />
    <Stack.Screen name="MarketPrices" component={MarketPricesScreen} />
    <Stack.Screen name="FertilizerAdvice" component={FertilizerAdviceScreen} />
  </Stack.Navigator>
);
