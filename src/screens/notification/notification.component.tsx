import React from 'react';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { BackButtonIcon } from '../../components/Icons';
import { SafeAreaLayout } from '../../components/safe-area-layout';
import { StyleSheet } from 'react-native';
import Notification from '../../layouts/notification';

export const NotificationScreen = ({ navigation }: any): React.ReactElement => {
    const renderBackAction = (): React.ReactElement => (
        <TopNavigationAction icon={BackButtonIcon} onPress={navigation.goBack} />
    );
    return (
        <SafeAreaLayout style={styles.safeArea}>
            <TopNavigation title="Dashboard" accessoryLeft={renderBackAction} />
            <Notification navigation={navigation} />
        </SafeAreaLayout>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});
