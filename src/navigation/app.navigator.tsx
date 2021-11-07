import React, { useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { HomeNavigator } from './home.navigator';
import { AuthNavigator } from './auth.navigator';
import { createStackNavigator } from '@react-navigation/stack';
import { AccidentsNavigator } from './accidents.navigator';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { SettingNavigator } from './setting.navigator';
import { authActions } from '../actions/auth-actions';

const Stack = createStackNavigator();

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        // prevent layout blinking when performing navigation
        background: 'transparent',
    },
};

export const AppNavigator = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(authActions.isLoggedIn());
    }, [dispatch]);

    const privateStack = () => (
        <>
            <Stack.Screen name={'Home'} component={HomeNavigator} />
        </>
    );

    const publicStack = () => <Stack.Screen name={'Authenticate'} component={AuthNavigator} />;

    return (
        <NavigationContainer theme={navigatorTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Authenticate'}>
                {auth.isLogin ? privateStack() : publicStack()}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
