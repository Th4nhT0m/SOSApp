import React from 'react';
import { View } from 'react-native';
import SelectField from '../../../components/form-inputs/select-field';
import InputField from '../../../components/form-inputs/input-field';
import { useForm } from 'react-hook-form';
import { AccidentsPros } from '../../../services/requests/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { RootState } from '../../../app/store-provider';
import { KeyboardAvoidingView } from '../../auth/sign-in/extra/3rd-party';
import { Button } from '@ui-kitten/components';
import { LoadingIndicator } from '../../../components/loading-indicator';

import * as yup from 'yup';
import { accidentsActions } from '../../../actions/accidents-ations';

const accidentsSchema = yup.object().shape({
    nameAccidents: yup.string().required('Name Accidents is required'),
    content: yup.string().required('content is required'),
    locationName: yup.string().required('Location Name is required'),
    people: yup.string().required('People is required'),
});

const Accidents = ({ navigation }: any): React.ReactElement => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<AccidentsPros>({
        resolver: yupResolver(accidentsSchema),
    });

    const genderOptions = [{ title: 'Danger' }, { title: 'Normal' }];

    const accidents = useAppSelector((state: RootState) => state.accidents);
    const dispatch = useAppDispatch();
    const onAccidentsButtonPress = (values: AccidentsPros): void => {
        dispatch(accidentsActions.create({ ...values }));
        if (accidents.issusses) {
            console.log(accidents);
        }
    };

    const onHomeButtonPress = (): void => {
        navigation && navigation.navigate('Home');
    };

    return (
        <KeyboardAvoidingView>
            <View>
                <InputField name={'nameAccidents'} control={control} label={'Name Accidents'} />
                <SelectField name={'status'} control={control} options={genderOptions} />
                <InputField name={'locationName'} control={control} label={'Location Name'} />
                <InputField name={'people'} control={control} label={'People'} />
            </View>
            <Button
                size="large"
                onPress={handleSubmit(onAccidentsButtonPress)}
                accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
            >
                Create
            </Button>
            <Button
                size="large"
                onPress={handleSubmit(onHomeButtonPress)}
                accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
            >
                GO BACK
            </Button>
        </KeyboardAvoidingView>
    );
};

export default Accidents;
