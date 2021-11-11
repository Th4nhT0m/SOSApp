import React from 'react';
import { View } from 'react-native';
import SelectField from '../../../components/form-inputs/select-field';
import InputField from '../../../components/form-inputs/input-field';
import { useForm } from 'react-hook-form';
import { AccidentsProps } from '../../../services/requests/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { RootState } from '../../../app/store-provider';
import { KeyboardAvoidingView } from '../../auth/sign-in/extra/3rd-party';


import * as yup from 'yup';
import { accidentsActions } from '../../../actions/accidents-ations';

const accidentsSchema = yup.object().shape({
    nameAccidents: yup.string().required('Name Accidents is required'),
    content: yup.string().required('content is required'),
    locationName: yup.string().required('Location Name is required'),
    people: yup.string().required('People is required'),
});

const Accidents = ({ navigation }: any): React.ReactElement => {
    // const {
    //     control,
    //     handleSubmit,
    //     formState: { isSubmitting },
    // } = useForm<AccidentsProps>({
    //     resolver: yupResolver(accidentsSchema),
    // });
    //
    // const genderOptions = [{ title: 'Danger' }, { title: 'Normal' }];
    //
    // const accidents = useAppSelector((state: RootState) => state.accidents);
    // const dispatch = useAppDispatch();
    // const onAccidentsButtonPress = (values: AccidentsProps): void => {
    //     dispatch(accidentsActions.create({ ...values }));
    //     if (accidents.issusses) {
    //         console.log(accidents);
    //     }
    // };
    //
    // const onHomeButtonPress = (): void => {
    //     navigation && navigation.navigate('Home');
    // };

    return <KeyboardAvoidingView />;
};

export default Accidents;
