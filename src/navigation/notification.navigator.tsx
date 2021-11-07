import React from 'react';
import { NotificationScreen } from '../screens/notification/notification.component';
import { createStackNavigator } from '@react-navigation/stack';
import { DetailProgressScreen } from '../screens/detail-accidents/detail-progress-component';
const Stack = createStackNavigator();

export const NotificationNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NotificationAccidents" component={NotificationScreen} />
        <Stack.Screen name="DetailProgress" component={DetailProgressScreen} />
    </Stack.Navigator>
);
