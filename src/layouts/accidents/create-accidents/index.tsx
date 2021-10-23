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
import { Button, StyleService, useStyleSheet } from '@ui-kitten/components';
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
    //
    // const initValues: AccidentsPros = {
    //     nameAccidents: '',
    //     status: 'Normal',
    //     content: '',
    //     locationName: '',
    //     latitude: '',
    //     longitude: '',
    //     user: '',
    //     people: '',
    // };

    const genderOptions = [{ title: 'Danger' }, { title: 'Normal' }];
    const styles = useStyleSheet(themedStyles);

    const accidents = useAppSelector((state: RootState) => state.accidents);
    const dispatch = useAppDispatch();
    const onAccidentsButtonPress = (values: AccidentsPros): void => {
        const { status, ...rest } = values;
        const sexStr = genderOptions[parseInt(status, 1)].title;
        dispatch(accidentsActions.create({ status: sexStr, ...rest }));
        if (accidents.issusses) {
            console.log(accidents);
        }
    };

    const onHomeButtonPress = (): void => {
        navigation && navigation.navigate('Home');
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={[styles.container, styles.formContainer]}>
                <InputField name={'nameAccidents'} control={control} label={'Name Accidents'} />
                <SelectField name={'status'} control={control} options={genderOptions} />
                <InputField name={'locationName'} control={control} label={'Location Name'} />
                <InputField name={'people'} control={control} label={'People'} />
            </View>
            <Button
                style={styles.signUpButton}
                size="large"
                onPress={handleSubmit(onAccidentsButtonPress)}
                accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
            >
                Create
            </Button>
            <Button
                style={styles.signUpButton}
                size="large"
                onPress={handleSubmit(onHomeButtonPress)}
                accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
            >
                GO BACK
            </Button>
        </KeyboardAvoidingView>
    );
};

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    headerContainer: {
        minHeight: 216,
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 44,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
    },
    socialAuthContainer: {
        marginTop: 24,
    },
    socialAuthButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    socialAuthHintText: {
        alignSelf: 'center',
        marginBottom: 16,
    },
    formContainer: {
        marginTop: 48,
        paddingHorizontal: 16,
    },
    evaButton: {
        maxWidth: 72,
        paddingHorizontal: 0,
    },
    signInLabel: {
        flex: 1,
    },
    signInButton: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 0,
    },
    signUpButton: {
        marginVertical: 24,
        marginHorizontal: 16,
    },
    socialAuthIcon: {
        tintColor: 'text-basic-color',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 52,
    },
    divider: {
        flex: 1,
    },
    orLabel: {
        marginHorizontal: 8,
    },
    emailSignLabel: {
        alignSelf: 'center',
        marginTop: 8,
    },
    formInput: {
        marginTop: 16,
    },
    termsCheckBox: {
        marginTop: 20,
    },
    termsCheckBoxText: {
        fontSize: 11,
        lineHeight: 14,
        color: 'text-hint-color',
        marginLeft: 10,
    },
});

export default Accidents;
