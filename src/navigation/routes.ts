/**
 * Route names + param types for the whole app.
 * Tree (see specs/navigation.md):
 *   RootStack
 *     ├─ Auth (AuthNavigator)        — pre-auth + onboarding + public demo
 *     ├─ App  (AppTabs)              — Home · Records · Ask Doctor · Profile
 *     └─ modal screens              — Source sheet, Reports hub, Payment, Share
 *
 * Each tab is its own native-stack so detail screens push within the tab.
 */

// ---- Auth / pre-auth (Module A + B) ----
export type AuthStackParamList = {
  Splash: undefined; // 01
  Welcome: undefined; // 02 — welcome carousel
  SignUp: { plan?: 'summary' | 'insights' | 'opinion' } | undefined; // 03
  VerifyEmail: { email?: string; phone?: string } | undefined; // 04
  Login: undefined; // 05
  ForgotPassword: undefined; // 06
  ResetPassword: { token?: string } | undefined; // 07
  ProfileSetup: undefined; // 08
  DemoIntro: undefined; // 09
  DemoPlayback: undefined; // 10
};

// ---- Home tab (Module C) ----
export type HomeStackParamList = {
  HomeDashboard: undefined; // 11
};

// ---- Records tab (Modules D + E) ----
export type RecordsStackParamList = {
  RecordsTimeline: undefined; // 16
  RecordDetail: { recordId: string }; // 17
  RecordsEmpty: undefined; // 19
  // Upload flow (D) pushes within the Records tab
  UploadEntry: undefined; // 12
  CameraScanner: undefined; // 13
  UploadProgress: { fileName?: string } | undefined; // 14
  ClassifyConfirm: { recordId?: string } | undefined; // 15
};

// ---- Ask Doctor tab (Module F) ----
export type AskStackParamList = {
  AskLanding: { recordId?: string; voiceQuestion?: string } | undefined; // 20
  VoiceQuery: undefined; // 21
  AnswerDetail: { answerId: string } | undefined; // 22
};

// ---- Profile tab (Modules I + H) ----
export type ProfileStackParamList = {
  Profile: undefined; // 31
  FamilyDependents: undefined; // 32
  FamilyMemberDetail: { dependentId: string }; // 32a — managed-member overview
  ProfileSwitcher: undefined; // 33
  PrivacyData: undefined; // 34
  ReceiptsBilling: undefined; // 35
  ShareWithClinician: undefined; // 28
  ExportData: undefined; // 29
  AuditTrail: undefined; // 30
};

// ---- Bottom tabs ----
export type AppTabsParamList = {
  HomeTab: undefined;
  RecordsTab: undefined;
  AskTab: undefined;
  ProfileTab: undefined;
};

// ---- Root ----
export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  // Modal screens reachable from multiple tabs (Module G + the Source sheet)
  SourceSheet: { recordId: string; line?: number }; // 18 — signature interaction
  ReportsHub: undefined; // 23
  SummaryReport: undefined; // 24
  HealthInsightsReport: undefined; // 25
  SecondOpinionReport: undefined; // 26
  PaymentSheet: { tier: 'insights' | 'opinion' }; // 27
};
