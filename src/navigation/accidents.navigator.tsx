import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccidentsScreen } from '../screens/Utilities/accidents/accidents-create';
import { DashboardScreen } from '../screens/dashboard/dashboard.component';
import { DetailHelperScreen } from '../screens/detail-accidents/detail-hepler-component';

const Stack = createStackNavigator();

export const AccidentsNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DashboardHome" component={DashboardScreen} />
        <Stack.Screen name="DetailHelper" component={DetailHelperScreen} />
    </Stack.Navigator>
);
