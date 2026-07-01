/**
 * AppTabs — the five bottom tabs present on every authenticated screen:
 * Home · Records · Ask Doctor · Reports · Profile. Plus a FloatingMic overlay that opens
 * a voice query from any tab. Each tab is its own native-stack so detail screens
 * push within the tab. See specs/appshell.md.
 */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import { FloatingMic } from '../components';
import {
  AppTabsParamList,
  AskStackParamList,
  HomeStackParamList,
  ProfileStackParamList,
  RecordsStackParamList,
  ReportsStackParamList,
  RootStackParamList,
} from './routes';

// Tab screens
import HomeDashboardScreen from '../screens/home/HomeDashboardScreen';
import RecordsTimelineScreen from '../screens/records/RecordsTimelineScreen';
import RecordDetailScreen from '../screens/records/RecordDetailScreen';
import RecordsEmptyScreen from '../screens/records/RecordsEmptyScreen';
import UploadEntryScreen from '../screens/upload/UploadEntryScreen';
import CameraScannerScreen from '../screens/upload/CameraScannerScreen';
import UploadProgressScreen from '../screens/upload/UploadProgressScreen';
import ClassifyConfirmScreen from '../screens/upload/ClassifyConfirmScreen';
import ReportsHubScreen from '../screens/reports/ReportsHubScreen';
import AskLandingScreen from '../screens/askdoctor/AskLandingScreen';
import VoiceQueryScreen from '../screens/askdoctor/VoiceQueryScreen';
import AnswerDetailScreen from '../screens/askdoctor/AnswerDetailScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import FamilyDependentsScreen from '../screens/profile/FamilyDependentsScreen';
import FamilyMemberDetailScreen from '../screens/profile/FamilyMemberDetailScreen';
import ProfileSwitcherScreen from '../screens/profile/ProfileSwitcherScreen';
import PrivacyDataScreen from '../screens/profile/PrivacyDataScreen';
import ReceiptsBillingScreen from '../screens/profile/ReceiptsBillingScreen';
import ShareWithClinicianScreen from '../screens/share/ShareWithClinicianScreen';
import ExportDataScreen from '../screens/share/ExportDataScreen';
import AuditTrailScreen from '../screens/share/AuditTrailScreen';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeDashboard" component={HomeDashboardScreen} />
    </HomeStack.Navigator>
  );
}

const RecordsStack = createNativeStackNavigator<RecordsStackParamList>();
function RecordsStackNavigator() {
  return (
    <RecordsStack.Navigator screenOptions={{ headerShown: false }}>
      <RecordsStack.Screen
        name="RecordsTimeline"
        component={RecordsTimelineScreen}
      />
      <RecordsStack.Screen name="RecordDetail" component={RecordDetailScreen} />
      <RecordsStack.Screen name="RecordsEmpty" component={RecordsEmptyScreen} />
      <RecordsStack.Screen name="UploadEntry" component={UploadEntryScreen} />
      <RecordsStack.Screen
        name="CameraScanner"
        component={CameraScannerScreen}
      />
      <RecordsStack.Screen
        name="UploadProgress"
        component={UploadProgressScreen}
      />
      <RecordsStack.Screen
        name="ClassifyConfirm"
        component={ClassifyConfirmScreen}
      />
    </RecordsStack.Navigator>
  );
}

const AskStack = createNativeStackNavigator<AskStackParamList>();
function AskStackNavigator() {
  return (
    <AskStack.Navigator screenOptions={{ headerShown: false }}>
      <AskStack.Screen name="AskLanding" component={AskLandingScreen} />
      <AskStack.Screen name="VoiceQuery" component={VoiceQueryScreen} />
      <AskStack.Screen name="AnswerDetail" component={AnswerDetailScreen} />
    </AskStack.Navigator>
  );
}

const ReportsStack = createNativeStackNavigator<ReportsStackParamList>();
function ReportsStackNavigator() {
  return (
    <ReportsStack.Navigator screenOptions={{ headerShown: false }}>
      <ReportsStack.Screen name="ReportsHubTab" component={ReportsHubScreen} />
    </ReportsStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="FamilyDependents"
        component={FamilyDependentsScreen}
      />
      <ProfileStack.Screen
        name="FamilyMemberDetail"
        component={FamilyMemberDetailScreen}
      />
      <ProfileStack.Screen
        name="ProfileSwitcher"
        component={ProfileSwitcherScreen}
      />
      <ProfileStack.Screen name="PrivacyData" component={PrivacyDataScreen} />
      <ProfileStack.Screen
        name="ReceiptsBilling"
        component={ReceiptsBillingScreen}
      />
      <ProfileStack.Screen
        name="ShareWithClinician"
        component={ShareWithClinicianScreen}
      />
      <ProfileStack.Screen name="ExportData" component={ExportDataScreen} />
      <ProfileStack.Screen name="AuditTrail" component={AuditTrailScreen} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<AppTabsParamList>();

const TAB_GLYPH: Record<keyof AppTabsParamList, string> = {
  HomeTab: '⌂',
  RecordsTab: '▤',
  AskTab: '✦',
  ReportsTab: '⚗',
  ProfileTab: '◉',
};
const TAB_LABEL: Record<keyof AppTabsParamList, string> = {
  HomeTab: 'Home',
  RecordsTab: 'Records',
  AskTab: 'Ask Doctor',
  ReportsTab: 'Reports',
  ProfileTab: 'Profile',
};

// Routes that take over the full screen: the app chrome (tab bar + FloatingMic)
// is hidden so they read as immersive surfaces.
const IMMERSIVE_ROUTES = ['CameraScanner'];
// The Ask Doctor tab already carries its own voice affordance everywhere (the
// chat composer's mic, the full-screen voice capture), so the global FloatingMic
// is hidden across that whole tab — otherwise it overlaps the composer / send
// button. The tab bar stays.
const MIC_HIDDEN_TAB = 'AskTab';

function deepestRouteName(state?: any): string | undefined {
  if (!state || typeof state.index !== 'number') return undefined;
  const route = state.routes[state.index];
  return (route?.state && deepestRouteName(route.state)) || route?.name;
}

function activeTabName(state?: any): string | undefined {
  if (!state || typeof state.index !== 'number') return undefined;
  return state.routes[state.index]?.name;
}

export function AppTabs() {
  const t = useTheme();
  const rootNav =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [immersive, setImmersive] = useState(false);
  const [hideMic, setHideMic] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenListeners={{
          state: e => {
            const s = (e.data as any)?.state;
            const leaf = deepestRouteName(s);
            const isImmersive = !!leaf && IMMERSIVE_ROUTES.includes(leaf);
            setImmersive(isImmersive);
            setHideMic(isImmersive || activeTabName(s) === MIC_HIDDEN_TAB);
          },
        }}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: t.colors.primary,
          tabBarInactiveTintColor: t.colors.textMuted,
          tabBarStyle: {
            backgroundColor: t.colors.surface,
            borderTopColor: t.colors.border,
            display: immersive ? 'none' : 'flex',
          },
          tabBarLabel: TAB_LABEL[route.name],
          tabBarLabelStyle: {
            fontFamily: t.fonts.bodyMedium,
            fontSize: 11,
          },
          tabBarIcon: ({ color }: { color: string }) => (
            <Text style={{ color, fontSize: 18 }}>{TAB_GLYPH[route.name]}</Text>
          ),
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
        <Tab.Screen name="RecordsTab" component={RecordsStackNavigator} />
        <Tab.Screen name="AskTab" component={AskStackNavigator} />
        <Tab.Screen name="ReportsTab" component={ReportsStackNavigator} />
        <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
      </Tab.Navigator>
      {hideMic ? null : (
        <FloatingMic
          onPress={() =>
            rootNav.navigate('App', {
              screen: 'AskTab',
              params: { screen: 'VoiceQuery' },
            } as never)
          }
        />
      )}
    </View>
  );
}
