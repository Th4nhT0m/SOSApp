import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HandbookViewScreen } from '../screens/handbook/hankbook-view.component';
import { HandbookByIdScreen } from '../screens/handbook/hankbookById-view.component';
const Stack = createStackNavigator();

export const HandbookNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetViewHospital" component={HandbookViewScreen} />
        <Stack.Screen name="HandbookById" component={HandbookByIdScreen} />
    </Stack.Navigator>
);
