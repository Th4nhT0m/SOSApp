import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Setting } from './extra/settings-section.component';
import { ThemesScreen } from '../../screens/themes/theme-settings';

interface SettingsProps {
    navigation: any;
}
const Settings = ({ navigation }: SettingsProps): React.ReactElement => {
    const onLogoutPress = () => navigation.navigate('Authenticate');
    return (
        <Layout style={styles.container}>
            <Setting style={styles.setting} hint="Edit Profile" />
            <Setting style={styles.setting} hint="Change Password" />
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
