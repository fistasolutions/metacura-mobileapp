/**
 * Screen 03 · Sign Up — create a MyCare ID. Social row, name / email / phone /
 * password, a live password-requirement checklist, trust line, and a link to
 * Log in. Continue routes to Verify with the email + phone for OTP. See
 * specs/onboarding.md.
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import {
  Screen,
  ScreenHeader,
  AppText,
  Button,
  Input,
  SocialButtons,
  Divider,
} from '../../components';
import { TRUST_LINE } from '../../data';

// Password policy: min 8 chars, upper + lowercase, a number, a special char.
const PASSWORD_RULES: { key: string; label: string; test: (p: string) => boolean }[] = [
  { key: 'len', label: 'At least 8 characters', test: p => p.length >= 8 },
  { key: 'case', label: 'Upper & lowercase letters', test: p => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { key: 'num', label: 'A number', test: p => /\d/.test(p) },
  { key: 'special', label: 'A special character', test: p => /[^A-Za-z0-9]/.test(p) },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpScreen() {
  const t = useTheme();
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  // RN 0.86 enables edge-to-edge on Android, so `adjustResize` no longer shrinks
  // the window for the keyboard, it overlays the content. We reserve the keyboard
  // height as scroll padding ourselves, then scroll the *focused* low field (phone
  // or password) just far enough to clear the keyboard, never to the foot, so the
  // page does not jump all the way up when a low field is tapped.
  const [kbHeight, setKbHeight] = useState(0);
  const scrollY = useRef(0); // live scroll offset
  const kbReserve = useRef(0); // how much the keyboard overlaps the scroll area
  const kbTopY = useRef(0); // OS-reported keyboard top in window coords (0 if unknown)
  const viewportRef = useRef<View>(null); // the ScrollView's frame
  const phoneRef = useRef<View>(null);
  const pwRef = useRef<View>(null);
  const activeRef = useRef<View | null>(null); // the focused low field's wrapper
  const GAP = 12;

  // Scroll the minimum so the focused field's bottom (plus GAP) clears the
  // keyboard. The keyboard top comes from the OS event (endCoordinates.screenY),
  // which is exact on every device and keyboard type (number pad, alphabetic, or
  // alphabetic with an autofill suggestion bar). We only fall back to deriving it
  // from the viewport if the OS does not report a usable value.
  const reveal = () => {
    const field = activeRef.current;
    const vp = viewportRef.current;
    const scroller = scrollRef.current;
    if (!field || !vp || !scroller || kbReserve.current <= 0) return;
    vp.measureInWindow((_vx, vy, _vw, vh) => {
      field.measureInWindow((_fx, fy, _fw, fh) => {
        if (!fh || !vh) return;
        const keyboardTop =
          kbTopY.current > 0 ? kbTopY.current : vy + vh - kbReserve.current;
        const overlap = fy + fh + GAP - keyboardTop;
        if (overlap > 0) {
          scroller.scrollTo({ y: scrollY.current + overlap, animated: true });
        }
      });
    });
  };
  const onLowFocus = (ref: React.RefObject<View | null>) => () => {
    activeRef.current = ref.current;
    reveal(); // when the keyboard is already open
  };
  const onHighFocus = () => {
    activeRef.current = null;
  };
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', e => {
      kbReserve.current = Math.max(0, e.endCoordinates.height - insets.bottom);
      kbTopY.current = e.endCoordinates.screenY ?? 0;
      setKbHeight(e.endCoordinates.height);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setKbHeight(0);
      kbReserve.current = 0;
      kbTopY.current = 0;
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, [insets.bottom]);
  // Reveal only after kbHeight changes: the bottom padding is now committed, so
  // the content is tall enough to actually scroll (otherwise scrollTo clamps to 0
  // on the first focus from rest). A short delay lets the native layout settle.
  useEffect(() => {
    if (kbHeight <= 0) return;
    const id = setTimeout(reveal, 60);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kbHeight]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const phoneDigits = phone.replace(/\D/g, '');
  const passwordOk = PASSWORD_RULES.every(r => r.test(password));
  const canSubmit =
    fullName.trim().length > 1 &&
    EMAIL_RE.test(email.trim()) &&
    phoneDigits.length >= 10 &&
    passwordOk;

  const onSubmit = () => {
    if (!canSubmit) return;
    nav.navigate('VerifyEmail', { email: email.trim(), phone: phone.trim() });
  };

  return (
    <Screen scroll={false} contentStyle={{ flex: 1 }} edges={['top', 'bottom']}>
      <View ref={viewportRef} collapsable={false} style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          onScroll={e => {
            scrollY.current = e.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}
          contentContainerStyle={{
            // Idle: stretch to fill so the action area anchors to the foot.
            // Keyboard up: flexGrow 0, so the container is exactly the content
            // height plus the keyboard reserve. (With edge-to-edge the ScrollView
            // is NOT resized for the keyboard, so flexGrow:1 would stretch the
            // container to full height and open an empty band below the form.)
            flexGrow: kbHeight > 0 ? 0 : 1,
            justifyContent: 'space-between',
            // The Screen's SafeAreaView already pads the bottom inset, so reserve
            // only the part of the keyboard that overlaps the scroll area.
            paddingBottom: kbHeight > 0 ? Math.max(0, kbHeight - insets.bottom) : 0,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top cluster: header + fields stay grouped at the top. */}
          <View>
          <ScreenHeader
          eyebrow="Get started free"
          title="Create your"
          accent="MyCare ID."
          subtitle="One ID for your whole health story."
        />

        <View style={{ gap: t.spacing[3] }}>
          <SocialButtons />
          <Divider label="or" />

          <Input
            label="Full name"
            placeholder="Sarah Jenkins"
            value={fullName}
            onChangeText={setFullName}
            onFocus={onHighFocus}
            style={styles.dense}
          />
          <Input
            label="Email"
            placeholder="you@email.com"
            value={email}
            onChangeText={setEmail}
            onFocus={onHighFocus}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            style={styles.dense}
          />
          <View ref={phoneRef} collapsable={false}>
            <Input
              label="Phone number"
              placeholder="+1 415 555 0132"
              value={phone}
              onChangeText={setPhone}
              onFocus={onLowFocus(phoneRef)}
              keyboardType="phone-pad"
              autoComplete="tel"
              style={styles.dense}
            />
          </View>

          <View style={{ gap: t.spacing[2] }}>
            <View ref={pwRef} collapsable={false}>
              <Input
                label="Password"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                onFocus={onLowFocus(pwRef)}
                secureTextEntry
                autoCapitalize="none"
                style={styles.dense}
              />
            </View>
            {/* Live requirement checklist — two columns to stay compact */}
            <View style={styles.checklist}>
              {PASSWORD_RULES.map(rule => {
                const ok = rule.test(password);
                return (
                  <View key={rule.key} style={styles.ruleItem}>
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: ok ? t.colors.primary : 'transparent',
                        borderWidth: ok ? 0 : 1.5,
                        borderColor: t.colors.borderStrong,
                      }}
                    >
                      {ok ? <Check size={10} color={t.colors.textInverse} strokeWidth={3} /> : null}
                    </View>
                    <AppText variant="secondary" color={ok ? t.colors.text : t.colors.textMuted}>
                      {rule.label}
                    </AppText>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        </View>

        {/* Action area: anchored to the foot when idle (space-between), but the
            whole form scrolls once the keyboard shrinks the viewport. */}
        <View style={{ gap: t.spacing[3], paddingTop: t.spacing[4] }}>
          <Button label="Get started free" disabled={!canSubmit} onPress={onSubmit} />

          <AppText variant="secondary" color={t.colors.textMuted} style={{ textAlign: 'center' }}>
            {TRUST_LINE}
          </AppText>

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: t.spacing[1] }}>
            <AppText variant="secondary" color={t.colors.textMuted}>
              Already have an account?
            </AppText>
            <Pressable onPress={() => nav.navigate('Login')} accessibilityRole="button">
              <AppText variant="secondary" color={t.colors.primary} style={{ fontFamily: t.fonts.bodySemibold }}>
                Log in
              </AppText>
            </Pressable>
          </View>
        </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  dense: {
    paddingVertical: 11,
  },
  checklist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
    columnGap: 12,
    paddingTop: 2,
  },
  ruleItem: {
    width: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
