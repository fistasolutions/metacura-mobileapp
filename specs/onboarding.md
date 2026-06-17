# Onboarding & Pre-auth Spec (Module A, screens 01-08)

**Priority:** P0. **Screens:** [src/screens/onboarding/](../src/screens/onboarding). **Stack:** `AuthNavigator`.

Mobile-native, single-screen sign-up. No multi-step wizard. All copy obeys the [lexicon invariants](00-overview.md#lexicon-invariants-apply-to-every-screen-and-every-spec).

---

## 01 · Splash — `SplashScreen.tsx`
Logo with the tagline "MyCare ID, your personal health ID." Auto-advances to Welcome after one second. Brand surface, Syne wordmark, teal accent. No buttons.

## 02 · Welcome carousel — `WelcomeScreen.tsx`
Four short slides:
1. Upload any document.
2. Understand it in plain English.
3. Ask anything about your record.
4. HIPAA-compliant, end-to-end encrypted, never trained on, one-tap delete.

Three CTAs at the end: **Sign Up**, **Log In**, **Try Lab Demo** (routes to the public demo, no account). Use a paged horizontal scroll with dot indicators.

## 03 · Sign Up — `SignUpScreen.tsx`
Full name, email, password on one screen. **Sign in with Apple** and **Sign in with Google** as buttons at the top. No multi-step wizard. Primary action: create account → routes to Verify email with the entered email as a param. `plan?` param (from a pricing entry point) is carried forward.

## 04 · Verify email — `VerifyEmailScreen.tsx`
Six-digit OTP field. 60-second resend timer. Hint to check spam. Continue activates only when six digits are entered. On success → Profile setup.

## 05 · Log In — `LoginScreen.tsx`
Email + password, **Sign in with Apple**, **Sign in with Google**, and a **biometric toggle** (FaceID / fingerprint) offered on the second launch. "Forgot password" link below the Sign In button. On success → reset root to `App`.

## 06 · Forgot password — `ForgotPasswordScreen.tsx`
Single email field. Success state confirms "Reset link sent, check your inbox." (No em-dash.)

## 07 · Reset password — `ResetPasswordScreen.tsx`
Reached via a deep link from the reset email. New password + confirm-password fields. On success → Log In.

## 08 · Profile setup — `ProfileSetupScreen.tsx`
Two dropdowns on one screen:
- **Profile type:** Myself / My Child / My Parent / My Patient / Other.
- **Primary health focus:** General wellness / Chronic condition / Post-surgery / Cancer care / Heart / Mental health / Pediatric / Elderly / Other.

Continue → auto-authenticate → Home (free Summary active). If a paid `plan` was carried from sign-up, open the Reports hub after Home loads.

## Native dependencies
Apple / Google sign-in SDKs, a biometrics library for screen 05, and deep linking config for screen 07 (see [navigation.md](navigation.md#deep-links-later)).

## States
Invalid email, weak password, wrong OTP, expired OTP, resend cooldown. See [states.md](states.md).
