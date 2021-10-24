import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccidentsScreen } from '../screens/accidents/accidents-create';

const Stack = createStackNavigator();

export const AccidentsNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Accidents" component={AccidentsScreen} />
    </Stack.Navigator>
);
