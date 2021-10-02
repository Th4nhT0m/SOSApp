import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ForgotPasswordScreen } from '../screens/auth/forgot-password.component';
import { SignUpScreen } from '../screens/auth/sign-up';
import { SignInScreen } from '../screens/auth/sign-in';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
);
