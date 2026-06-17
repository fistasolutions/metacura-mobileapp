/**
 * AuthNavigator — pre-auth, onboarding, and the public lab demo (Modules A + B).
 * Splash → Welcome → (Sign Up | Log In | Try Lab Demo). See specs/onboarding.md.
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './routes';
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import SignUpScreen from '../screens/onboarding/SignUpScreen';
import VerifyEmailScreen from '../screens/onboarding/VerifyEmailScreen';
import LoginScreen from '../screens/onboarding/LoginScreen';
import ForgotPasswordScreen from '../screens/onboarding/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/onboarding/ResetPasswordScreen';
import ProfileSetupScreen from '../screens/onboarding/ProfileSetupScreen';
import DemoIntroScreen from '../screens/demo/DemoIntroScreen';
import DemoPlaybackScreen from '../screens/demo/DemoPlaybackScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="DemoIntro" component={DemoIntroScreen} />
      <Stack.Screen name="DemoPlayback" component={DemoPlaybackScreen} />
    </Stack.Navigator>
  );
}
