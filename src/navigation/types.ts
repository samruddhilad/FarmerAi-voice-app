/**
 * Navigation type definitions
 * Type-safe param lists for all navigators
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { EligibilityResponse } from '../types/api.types';

// ─── Root Stack ───────────────────────────────────────────────────────
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// ─── Auth Stack ───────────────────────────────────────────────────────
export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  OTPLogin: { mobile?: string };
};

// ─── Main Bottom Tabs ─────────────────────────────────────────────────
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SchemesTab: NavigatorScreenParams<SchemesStackParamList>;
  EligibilityTab: NavigatorScreenParams<EligibilityStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

// ─── Home Stack ───────────────────────────────────────────────────────
export type HomeStackParamList = {
  Home: undefined;
  Search: undefined;
  VoiceAssistant: undefined;
  SchemeDetails: { schemeId: string };
  Notifications: undefined;
  CropSelection: undefined;
  DiseaseDiagnosis: undefined;
  Weather: undefined;
  Schemes: undefined;
  MarketPrices: undefined;
  FertilizerAdvice: undefined;
};

// ─── Schemes Stack ────────────────────────────────────────────────────
export type SchemesStackParamList = {
  SchemesList: { category?: string };
  SchemeDetails: { schemeId: string };
};

// ─── Eligibility Stack ────────────────────────────────────────────────
export type EligibilityStackParamList = {
  EligibilityForm: undefined;
  EligibilityResult: { results: EligibilityResponse };
};

// ─── Profile Stack ────────────────────────────────────────────────────
export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  LanguageSelection: undefined;
  Bookmarks: undefined;
  ConversationHistory: undefined;
  Help: undefined;
  About: undefined;
  PrivacyPolicy: undefined;
  TermsConditions: undefined;
};

// ─── Screen Props Helpers ─────────────────────────────────────────────
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type HomeScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type SchemesScreenProps<T extends keyof SchemesStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SchemesStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type EligibilityScreenProps<T extends keyof EligibilityStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<EligibilityStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type ProfileScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;
