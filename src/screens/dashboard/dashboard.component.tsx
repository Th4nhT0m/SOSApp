import React from 'react';
import { SafeAreaLayout } from '../../components/safe-area-layout';
import { StyleSheet } from 'react-native';
import Dashboard from '../../layouts/dashboard';

export const DashboardScreen = ({ navigation }: any): React.ReactElement => {
    return (
        <SafeAreaLayout style={styles.safeArea}>
            <Dashboard navigation={navigation} />
        </SafeAreaLayout>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});
