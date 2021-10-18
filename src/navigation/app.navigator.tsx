import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { HomeNavigator } from './home.navigator';
import { AuthNavigator } from './auth.navigator';
import { createStackNavigator } from '@react-navigation/stack';

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
    const [isSigned, setSigned] = React.useState(false);

    return (
        <NavigationContainer theme={navigatorTheme}>
            {/*{isSigned ? <HomeNavigator /> : <AuthNavigator />}*/}
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Authenticate'}>
                <Stack.Screen name={'Home'} component={HomeNavigator} />
                <Stack.Screen name={'Authenticate'} component={AuthNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
