import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ViewUserScreen } from '../screens/settings/user-profile.component';
import { SettingsScreen } from '../screens/settings/settings.component';

const Stack = createStackNavigator();

export const SettingNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Setting" component={SettingsScreen} />
        <Stack.Screen name="UserView" component={ViewUserScreen} />
    </Stack.Navigator>
);
