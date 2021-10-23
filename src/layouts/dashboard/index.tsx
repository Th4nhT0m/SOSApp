import React from 'react';
import { SafeAreaLayout } from '../../components/safe-area-layout';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Button } from '@ui-kitten/components';
import { UrgentPros } from '../../services/requests/types';
import { accidentsActions } from '../../actions/accidents-ations';
import { useAppDispatch } from '../../services/hooks';

//Accidents
const Dashboard = () => {
    const dispatch = useAppDispatch();
    const onAccidentsButtonPress = (): void => {
        // const onAccidentsButtonPress = (values: UrgentPros) => {
        // dispatch(accidentsActions.createUrgent(values));
        // console.log(accidentsActions.createUrgent(values));
    };

    return (
        <SafeAreaLayout>
            <View style={[styles.container, styles.formContainer]}>
                <Button onPress={onAccidentsButtonPress} />
            </View>
        </SafeAreaLayout>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginHorizontal: 8,
    },
    homeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
    },
    formContainer: {
        marginTop: 48,
        paddingHorizontal: 16,
    },
    btnSoS: {
        marginTop: 48,
        paddingHorizontal: 100,
    },
});
