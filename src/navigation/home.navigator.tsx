import React from 'react';
import { LogBox } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeBottomNavigation } from '../screens/home/bottom-navigation';
import { SettingNavigator } from './setting.navigator';
import { NotificationNavigator } from './notification.navigator';
import { AccidentsNavigator } from './accidents.navigator';
import { UtilitiesNavigator } from './utilities.navigator';

const BottomTab = createBottomTabNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Dashboard' : 'Settings';

export const HomeNavigator = (): React.ReactElement => (
    <BottomTab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialTabRoute}
        tabBar={(props) => <HomeBottomNavigation {...props} />}
    >
        <BottomTab.Screen name="Dashboard" component={AccidentsNavigator} />
        <BottomTab.Screen name="Notification" component={NotificationNavigator} />
        <BottomTab.Screen name="Utilities" component={UtilitiesNavigator} />
        <BottomTab.Screen name="Settings" component={SettingNavigator} />
    </BottomTab.Navigator>
);

LogBox.ignoreLogs(["Accessing the 'state'"]);
