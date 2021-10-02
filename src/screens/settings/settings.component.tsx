import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import Settings from '../../layouts/settings';
import { SafeAreaLayout } from '../../components/safe-area-layout';

export const SettingsScreen = ({ navigation }: any): React.ReactElement => {
    const renderBackAction = (): React.ReactElement => <TopNavigationAction onPress={navigation.goBack} />;
    return (
        <SafeAreaLayout style={styles.container}>
            <TopNavigation title="Settings" accessoryLeft={renderBackAction} />
            <Divider />
            <Settings navigation={navigation} />
        </SafeAreaLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
