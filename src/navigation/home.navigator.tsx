import React from 'react';
import { LogBox } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeBottomNavigation } from '../screens/home/bottom-navigation';
import { DashboardScreen } from '../screens/dashboard/dashboard.component';
import { SettingNavigator } from './setting.navigator';
import { NotificationNavigator } from './notification.navigator';
import { AccidentsScreen } from "../screens/accidents/accidents-create";
import { AccidentsNavigator } from "./accidents.navigator";

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
        <BottomTab.Screen name="Hospital" component={SettingNavigator} />
        <BottomTab.Screen name="Settings" component={SettingNavigator} />
    </BottomTab.Navigator>
    // <BottomTab.Navigator
    //   screenOptions={{ headerShown: false }}
    //   initialRouteName={initialTabRoute}
    //   tabBar={(props) => <HomeBottomNavigation {...props} />}
    // >
    //     <BottomTab.Screen name="AccidentsNavigator" component={AccidentsNavigator} />
    //     <BottomTab.Screen name="Notification" component={NotificationNavigator} />
    //     <BottomTab.Screen name="Hospital" component={SettingNavigator} />
    //     <BottomTab.Screen name="Settings" component={SettingNavigator} />
    // </BottomTab.Navigator>
);

LogBox.ignoreLogs(["Accessing the 'state'"]);
