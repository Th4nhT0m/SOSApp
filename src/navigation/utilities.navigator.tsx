import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UtilitiesScreen } from '../screens/Utilities/Utilities.component';
import { HandbookViewScreen } from '../screens/Utilities/handbook/hankbook-view.component';
import { HandbookByIdScreen } from '../screens/Utilities/handbook/hankbookById-view.component';
import { MapHospitalScreen } from '../screens/Utilities/mapHospital/map-Hospital.component';
import { AccidentsScreen } from '../screens/Utilities/accidents/accidents-create';
import { CarRepairScreen } from '../screens/Utilities/mapCarRepair/map-Car-Repair.component';
import { FuelScreen } from '../screens/Utilities/mapFuel/map-Fuel.component';
const Stack = createStackNavigator();

export const UtilitiesNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ViewUtilities" component={UtilitiesScreen} />
        <Stack.Screen name="GetHandbook" component={HandbookViewScreen} />
        <Stack.Screen name="HandbookById" component={HandbookByIdScreen} />
        <Stack.Screen name="Hospitals" component={MapHospitalScreen} />
        <Stack.Screen name="Accidents" component={AccidentsScreen} />
        <Stack.Screen name="ViewCarRepair" component={CarRepairScreen} />
        <Stack.Screen name="ViewFuel" component={FuelScreen} />
    </Stack.Navigator>
);
