/**
 * RootNavigator — top of the tree. Switches between the Auth flow and the
 * authenticated App (5 tabs), and hosts the cross-tab screens: the signature
 * Source sheet (18, a slide-up modal) plus the full-page Reports hub + report
 * screens (23-26) and Payment sheet (27). See specs/navigation.md.
 *
 * Auth state is not wired yet (scaffold). `initialRouteName` is Auth so the app
 * boots into Splash; flip to "App" to jump straight into the tabs while building.
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './routes';
import { AuthNavigator } from './AuthNavigator';
import { AppTabs } from './AppTabs';
import SourceSheetScreen from '../screens/records/SourceSheetScreen';
import ReportsHubScreen from '../screens/reports/ReportsHubScreen';
import SummaryReportScreen from '../screens/reports/SummaryReportScreen';
import HealthInsightsReportScreen from '../screens/reports/HealthInsightsReportScreen';
import SecondOpinionReportScreen from '../screens/reports/SecondOpinionReportScreen';
import PaymentSheetScreen from '../screens/reports/PaymentSheetScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="App" component={AppTabs} />

      {/* The Source sheet is a true slide-up modal (the signature interaction). */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="SourceSheet" component={SourceSheetScreen} />
      </Stack.Group>

      {/* Module G — Reports + payment are full-page pushes, reachable from
          multiple tabs (Home card, Family detail, the Reports tab). */}
      <Stack.Group>
        <Stack.Screen name="ReportsHub" component={ReportsHubScreen} />
        <Stack.Screen name="SummaryReport" component={SummaryReportScreen} />
        <Stack.Screen
          name="HealthInsightsReport"
          component={HealthInsightsReportScreen}
        />
        <Stack.Screen
          name="SecondOpinionReport"
          component={SecondOpinionReportScreen}
        />
        <Stack.Screen name="PaymentSheet" component={PaymentSheetScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
