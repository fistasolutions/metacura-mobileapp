# Onboarding & Pre-auth Spec (Module A, screens 01-08)

**Priority:** P0. **Screens:** [src/screens/onboarding/](../src/screens/onboarding). **Stack:** `AuthNavigator`.

Mobile-native, single-screen sign-up. No multi-step wizard. All copy obeys the [lexicon invariants](00-overview.md#lexicon-invariants-apply-to-every-screen-and-every-spec).

**Layout convention (forms 03-08):** each form screen fills the full height. The header and fields sit at the top; the primary action (and any trust line / secondary link) is anchored to the foot with a flexible spacer between, and the bottom safe-area edge is respected. The screen still scrolls when the keyboard reduces the viewport. No empty dead space below the content.

---

## 01 · Splash — `SplashScreen.tsx`
The MetaCura brand logo medallion (`src/assets/images/metacura-logo.png`, the gold heartbeat-heart emblem with a transparent background, shared with the web app's `public/metacura-logo.png`) sitting directly on the gradient (no badge), above the Syne "MetaCura" wordmark and the tagline "MyCare ID, your personal health ID." Auto-advances to the Welcome carousel after one second. Teal gradient surface, teal accent. No buttons.

## 02 · Welcome carousel — `OnboardingCarousel.tsx`
Four short swipeable slides over a soft teal ambient field, ending in the three entry actions. The first slide sets the design baseline; the others share the identical layout, spacing, colors, and component language (theme tokens only, no new hues). Each slide pairs a floating-card illustration (composed from the white card / `StatusPill` / source-pill language) with a white sheet anchored low: a teal eyebrow, an Outfit headline whose trailing word is the teal accent, a one-line value statement, and page dots. The illustration sits inside a fixed-size **Stage** that is vertically centered in the space above the sheet (no top-clustering / dead space) with a soft teal glow behind it.

- **Slide 1 · Upload** — eyebrow "Upload", "Upload Any **Document**", value "Snap a photo or import a PDF. Lab reports, prescriptions, scans, discharge notes." Illustration: a drop-zone card (gradient upload chip + accepted-format line) and an uploaded-file card (teal check badge + full progress bar), with floating camera / activity brand badges.
- **Slide 2 · Understand** — eyebrow "Understand", "Read it in Plain **English**", value "Every result explained simply, against your own history, not generic ranges." Illustration: a lab-value card (gradient droplet medallion, large value with an improvement delta chip, a teal range gauge with a marker dot, and a "Healthy below 5.7%" caption) and a plain-English explanation card with a gradient sparkle medallion.
- **Slide 3 · Ask Doctor** — eyebrow "Ask Doctor", "Ask Anything About Your **Record**", value "Clear answers, every claim linked to where it came from." Illustration: a question card (gradient chat medallion + "You asked") and an answer card (gradient sparkle medallion + "with sources" pill, the answer line, and a footer row pairing an improvement delta chip with a NORMAL `StatusPill`). Brand badges sit at clear corners (top-right / bottom-right) so they never cover card content.
- **Slide 4 · Private by design** — eyebrow "Private by design", "Yours Alone, **Always**", value "Your records stay encrypted and entirely under your control." Illustration: a "Your privacy" trust panel — a gradient shield medallion header with a "Built for trust" caption over a divided checklist (HIPAA-compliant, End-to-end encrypted, Never trained on, One-tap delete), each row a teal icon tile with a confirming check. Brand badges float at the clear top-right / bottom-right corners.

The action area reads **Continue** on slides 1–3 (advances the carousel). On the final slide it shows the three entry actions: **Sign Up** (primary gradient → `SignUp`), **Log In** (outline → `Login`), and a quiet centered **Try the lab demo** text link → the public demo (`DemoIntro`, no account). A **Skip** link top-right (hidden on the last slide) jumps to the final slide. Swiping updates the active page dot. All copy obeys the lexicon invariants (no em-dash; "linked" / "with sources", never "cited").

## 03 · Sign Up — `SignUpScreen.tsx`
Full name, **email**, **phone number**, and password on one screen. **Sign in with Apple** and **Sign in with Google** as buttons at the top. No multi-step wizard. Email and phone are separate fields (email uses the email keyboard, phone uses the phone-pad). The password field shows a **live requirement checklist** that ticks teal as each rule is met: at least 8 characters, upper & lowercase letters, a number, and a special character. The primary action stays disabled until name, a valid email, a 10+ digit phone, and all password rules pass; it then routes to Verify with `{ email, phone }`. `plan?` param (from a pricing entry point) is carried forward. The focused field always stays visible above the keyboard. Because RN 0.86 runs Android edge-to-edge (the keyboard overlays the content rather than resizing the window), the screen reserves the live keyboard height as scroll padding (minus the bottom safe-area inset, which the screen already pads, so the reserve never over-counts) and, when a low field (phone or password) is focused, measures that field on screen and scrolls by exactly the amount it is covered by the keyboard, using the keyboard top reported by the OS (`endCoordinates.screenY`) so the calculation is exact for every keyboard type and device (number pad, alphabetic, alphabetic with an autofill suggestion bar). It scrolls only the minimum and never jumps to the foot, so the header and the other fields stay in place, the page does not lurch upward, and no empty band opens below the form. While the keyboard is up the scroll content stops stretching to fill (its flex-grow drops to 0) so it is exactly the form height plus the keyboard reserve, with no empty band between the form and the keyboard; when the keyboard is down it stretches again to anchor the action area to the foot. The activity uses `windowSoftInputMode="adjustResize"`.

## 04 · Verify — `VerifyEmailScreen.tsx`
A **single** six-digit OTP sent to the contact the user signed up with (the **email** when both an email and phone are on file). There is **no email/phone toggle** and no separate channels: the destination is auto-detected as an email (contains `@`) or a phone, and shown **masked** in the subtitle (e.g. `s•••@email.com` or `••• ••• 1234`). The code is six segmented boxes (the shared [`OtpInput`](../src/components/OtpInput.tsx)): each box fills as you type, the active box shows a blinking teal caret, and a single hidden field backs them so native paste / SMS autofill still work. The group is vertically centered under a "Enter your 6-digit code" label; an email contact adds a "check spam" hint. 60-second resend timer ("Resend code"). Continue activates only when six digits are entered. On success → Profile setup.

## 05 · Log In — `LoginScreen.tsx`
Email + password, **Sign in with Apple**, **Sign in with Google**, and a **biometric toggle** (FaceID / fingerprint) offered on the second launch. "Forgot password" link below the Sign In button. On success → reset root to `App`.

## 06 · Forgot password — `ForgotPasswordScreen.tsx`
Single email field. Success state confirms "Reset link sent, check your inbox." (No em-dash.)

## 07 · Reset password — `ResetPasswordScreen.tsx`
Reached via a deep link from the reset email. New password + confirm-password fields. On success → Log In.

## 08 · Profile setup — `ProfileSetupScreen.tsx`
Two questions, each in its own crystal `GlassCard`, vertically centered between the header and the foot action:
- **Profile type** (selectable pills): Myself / My Child / My Parent / My Patient / Other.
- **Primary health focus** (trigger opens a bottom-sheet picker over a dimmed backdrop; the option list scrolls on its own, the page does not; tap an option or the backdrop to dismiss): General wellness / Chronic condition / Post-surgery / Cancer care / Heart / Mental health / Pediatric / Elderly / Other.

Continue → auto-authenticate → the **Reports hub** (`App` focused on `ReportsTab`), so a new sign-up lands on the pricing tiers and can pick the depth they need (and run any `plan` carried from sign-up) straight away. The free Summary is already active, and the other tabs (Home, Records, Ask, Profile) are one tap away.

## Native dependencies
Apple / Google sign-in SDKs, a biometrics library for screen 05, and deep linking config for screen 07 (see [navigation.md](navigation.md#deep-links-later)).

## States
Invalid email, weak password, wrong OTP, expired OTP, resend cooldown. See [states.md](states.md).
