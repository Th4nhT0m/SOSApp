import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ViewUserScreen } from '../screens/settings/user-profile.component';
import { SettingsScreen } from '../screens/settings/settings.component';
import { ChangePasswordScreen } from '../screens/settings/change-password.component';
import { AccidentHistoryScreen } from '../screens/settings/accident-history.component';
import { HelperHistoryScreen } from '../screens/settings/helper-history.component';
import { HelperHistoryByAccidentScreen } from '../screens/settings/accident-historyByHelper.component';
const Stack = createStackNavigator();

export const SettingNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Setting" component={SettingsScreen} />
        <Stack.Screen name="UserView" component={ViewUserScreen} />
        <Stack.Screen name="ChangePass" component={ChangePasswordScreen} />
        <Stack.Screen name="AccidentHistory" component={AccidentHistoryScreen} />
        <Stack.Screen name="HelperHistory" component={HelperHistoryScreen} />
        <Stack.Screen name="HelperHistoryInAccident" component={HelperHistoryByAccidentScreen} />
    </Stack.Navigator>
);
