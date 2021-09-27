import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ForgotPasswordScreen } from '../screens/auth/forgot-password.component';
import { SignUpScreen } from '../screens/auth/sign-up';
import { SignInScreen } from '../screens/auth/sign-in';

// const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// const AuthMenuNavigator = (): React.ReactElement => (
//     <TopTab.Navigator tabBar={(props) => <AuthScreen {...props} />}>
//         <TopTab.Screen name="AuthGrid" component={AuthGridScreen} />
//         <TopTab.Screen name="AuthList" component={AuthListScreen} />
//     </TopTab.Navigator>
// );

export const AuthNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
        {/*<Stack.Screen name="Auth" component={AuthMenuNavigator} />*/}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
);
