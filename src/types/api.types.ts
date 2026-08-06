/**
 * All TypeScript types for the Farmer Voice AI Assistant
 * Mirrors BACKEND_API_CONTRACT.md exactly
 */

// ─── Generic API Wrappers ─────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ─── User & Auth ──────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  preferred_language: string;
  avatar_url?: string;
  state?: string;
  district?: string;
  created_at?: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface GoogleAuthRequest {
  id_token: string;
}

export interface SendOTPRequest {
  mobile: string;
}

export interface VerifyOTPRequest {
  mobile: string;
  otp: string;
}

export interface UpdateProfileRequest {
  preferred_language?: string;
  name?: string;
  state?: string;
  district?: string;
}

// ─── Language ─────────────────────────────────────────────────────────

export interface Language {
  code: string;
  name: string;
}

// ─── Schemes ──────────────────────────────────────────────────────────

export interface Scheme {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'Central' | 'State';
  amount?: string;
  eligibility_criteria?: string;
  benefits?: string;
  documents_required?: string[];
  application_url?: string;
  deadline?: string;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SchemeCategory {
  id: string;
  name: string;
  icon?: string;
  count?: number;
}

export interface SchemeFilters {
  page?: number;
  limit?: number;
  category?: string;
  language?: string;
  search?: string;
}

// ─── Eligibility ──────────────────────────────────────────────────────

export interface EligibilityRequest {
  age: number;
  gender: string;
  state: string;
  district: string;
  land_size: number;
  farmer_type: string;
}

export interface EligibilityResult {
  scheme: Scheme;
  is_eligible: boolean;
  match_percentage?: number;
  reasons?: string[];
}

export interface EligibilityResponse {
  results: EligibilityResult[];
  total_eligible: number;
}

// ─── Bookmarks ────────────────────────────────────────────────────────

export interface Bookmark {
  id: string;
  scheme_id: string;
  scheme: Scheme;
  created_at: string;
}

export interface AddBookmarkRequest {
  scheme_id: string;
}

// ─── Conversations & History ──────────────────────────────────────────

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  audio_url?: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  title?: string;
  preview?: string;
  message_count: number;
  messages?: ConversationMessage[];
  created_at: string;
  updated_at: string;
}

// ─── Voice ────────────────────────────────────────────────────────────

export interface VoiceQueryResponse {
  transcript: string;
  answer: string;
  audio_url: string;
  conversation_id?: string;
}

// ─── Chat ─────────────────────────────────────────────────────────────

export interface ChatRequest {
  message: string;
  language: string;
}

export interface ChatResponse {
  answer: string;
  audio_url?: string;
  conversation_id?: string;
  related_schemes?: Scheme[];
}

// ─── Notifications ────────────────────────────────────────────────────

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: string;
  category?: string;
  is_read: boolean;
  created_at: string;
  data?: Record<string, unknown>;
}

// ─── Quick Actions ────────────────────────────────────────────────────

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  action_type: string;
  action_value?: string;
}

// ─── Health ───────────────────────────────────────────────────────────

export interface HealthResponse {
  status: string;
}

// ─── Navigation Types ─────────────────────────────────────────────────

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  OTPLogin: { mobile?: string };
};

export type MainTabParamList = {
  HomeTab: undefined;
  SchemesTab: undefined;
  EligibilityTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Search: undefined;
  VoiceAssistant: undefined;
  SchemeDetails: { schemeId: string };
  Notifications: undefined;
};

export type SchemesStackParamList = {
  SchemesList: { category?: string };
  SchemeDetails: { schemeId: string };
};

export type EligibilityStackParamList = {
  EligibilityForm: undefined;
  EligibilityResult: { results: EligibilityResponse };
};

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
