/**
 * RootNavigator — top of the tree. Switches between the Auth flow and the
 * authenticated App (4 tabs), and hosts the cross-tab modal screens: the
 * signature Source sheet (18), the Reports hub + report screens (23-26), and
 * the Payment sheet (27). See specs/navigation.md.
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

      {/* Modal / sheet group, reachable from multiple tabs */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="SourceSheet" component={SourceSheetScreen} />
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
