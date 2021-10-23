import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, StyleService, Text } from '@ui-kitten/components';
import { UrgentPros } from '../../../services/requests/types';
import { useAppDispatch } from '../../../services/hooks';
import { accidentsActions } from '../../../actions/accidents-ations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Accidents = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();

    const onAccidentsButtonPress = (values: UrgentPros) => {
        dispatch(accidentsActions.createUrgent(values));
    };

    const onHomeButtonPress = (): void => {
        navigation && navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={themedStyles.container}>
            <Text> List</Text>
        </SafeAreaView>
    );
};
const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
    },
});
export default Accidents;
