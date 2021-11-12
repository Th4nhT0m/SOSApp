import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapHospitalScreen } from '../screens/mapHospital/map-Hospital.component';

const Stack = createStackNavigator();

export const MapHospitalNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Hospitals" component={MapHospitalScreen} />
    </Stack.Navigator>
);
