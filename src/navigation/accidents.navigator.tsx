import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccidentsScreen } from '../screens/accidents/accidents-create';
import { DashboardScreen } from '../screens/dashboard/dashboard.component';

const Stack = createStackNavigator();

export const AccidentsNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DashboardHome" component={DashboardScreen} />
        <Stack.Screen name="Accidents" component={AccidentsScreen} />
    </Stack.Navigator>
);
