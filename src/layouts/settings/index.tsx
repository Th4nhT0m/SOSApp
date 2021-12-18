import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Setting } from './extra/settings-section.component';
import { ThemesScreen } from '../../screens/themes/theme-settings';
import { useAppDispatch } from '../../services/hooks';
import { authActions } from '../../actions/auth-actions';

// interface SettingsProps {
//     navigation: any;
// }

const Settings = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();

    const onLogoutPress = () => {
        dispatch(authActions.logout());
        dispatch(authActions.isLoggedIn());
    };

    const onSignUpButtonPress = () => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Settings',
                params: {
                    screen: 'UserView',
                },
            });
    };

    const changePassUpButtonPress = () => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Settings',
                params: {
                    screen: 'ChangePass',
                },
            });
    };

    const accidentHistoryButtonPress = () => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Settings',
                params: {
                    screen: 'AccidentHistory',
                },
            });
    };

    const helperHistoryButtonPress = () => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Settings',
                params: {
                    screen: 'HelperHistory',
                },
            });
    };

    return (
        <Layout style={styles.container}>
            <Setting style={styles.setting} hint="History Accident" onPress={accidentHistoryButtonPress} />
            {/*<Setting style={styles.setting} hint="History Helper" onPress={helperHistoryButtonPress} />*/}
            {/*<Setting style={styles.setting} hint="Edit Profile" onPress={onSignUpButtonPress} />*/}
            {/*<Setting style={styles.setting} hint="Change Password" onPress={changePassUpButtonPress} />*/}
            <Setting style={[styles.setting, styles.themes]} hint="Themes" hintStyles={{ margin: 10 }}>
                <ThemesScreen />
            </Setting>
            <Setting hint={'Sign Out'} style={[styles.setting]} onPress={onLogoutPress} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    setting: {
        padding: 16,
    },
    themes: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: 5,
    },
});

export default Settings;
