import React from 'react';
import { View } from 'react-native';
import { Button, Divider, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import * as yup from 'yup';
import { identityCardRegExp, phoneRegExp } from '../../../app/app-constants';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { usersActions } from '../../../actions/user-actions';
import { EditUserProps, SignUpProps } from '../../../services/requests/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../../app/store-provider';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { ArrowForwardIconOutLineLeftSide } from './extra/icons';
import InputField from '../../../components/form-inputs/input-field';
import DatePicker from '../../../components/form-inputs/date-picker';
import SelectField from '../../../components/form-inputs/select-field';

const updateUserSchema = yup.object().shape({
    name: yup.string().required('Name is required').typeError('Invalid name'),
    identityCard: yup.string().matches(identityCardRegExp, 'Invalid ID').required('ID is required'),
    numberPhone: yup.string().matches(phoneRegExp, 'Invalid phone number').required('Phone number is required'),
    address: yup.string().required('Address is required.'),
    dob: yup.date().typeError('Invalid date format').required('Date of birth is required'),
});

const genderOptions = [{ title: 'Male' }, { title: 'Female' }, { title: 'Other' }];

const initValues: EditUserProps = {
    name: '',
    identityCard: '',
    numberPhone: '',
    address: '',
    sex: '',
    //  dob: new Date(),
};

const ViewUser = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<EditUserProps>({
        resolver: yupResolver(updateUserSchema),
        defaultValues: initValues,
    });

    const styles = useStyleSheet(themedStyles);

    const updateUser = useAppSelector((state: RootState) => state.users);

    React.useEffect(() => {
        dispatch(usersActions.getViewUserInfo());
    }, [dispatch]);

    const setDataUser: EditUserProps = {
        name: updateUser.currentUser.name,
        identityCard: updateUser.currentUser.identityCard,
        numberPhone: updateUser.currentUser.numberPhone,
        address: updateUser.currentUser.address,
        sex: updateUser.currentUser.sex,
        //   dob: updateUser.currentUser.dob,
    };

    const onSignUpButtonPress = (values: SignUpProps): void => {
        const { sex, ...rest } = values;
        const sexStr = genderOptions[parseInt(sex, 1)].title;
        dispatch(usersActions.updateUserInfo({ sex: sexStr, ...rest }));
        if (updateUser.changeSusses) {
            console.log(updateUser);
        } else {
            console.log(updateUser.error);
        }
    };

    const onBackButtonPress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Settings',
                params: {
                    screen: 'Setting',
                },
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Button
                style={styles.backButton}
                appearance="ghost"
                status="control"
                size="giant"
                accessoryLeft={ArrowForwardIconOutLineLeftSide}
                onPress={onBackButtonPress}
            >
                Back
            </Button>

            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h5">
                    Change information
                </Text>
                <Divider style={styles.divider} />
            </View>

            <View style={[styles.container, styles.formContainer]}>
                <InputField name={'name'} control={control} label={'Full name'} value={setDataUser.name} />
                <InputField
                    name={'identityCard'}
                    control={control}
                    label={'ID Number'}
                    value={setDataUser.identityCard}
                />
                <InputField
                    name={'numberPhone'}
                    control={control}
                    label={'Phone number'}
                    value={setDataUser.numberPhone}
                />
                <DatePicker control={control} name={'dob'} label={'Date of birth'} />
                <SelectField name={'sex'} control={control} options={genderOptions} />
                <InputField
                    style={styles.formInput}
                    placeholder="Where are you?"
                    label="Address"
                    name={'address'}
                    autoCapitalize="words"
                    control={control}
                    value={setDataUser.address}
                />
            </View>

            <Button
                style={styles.signUpButton}
                size="large"
                onPress={handleSubmit(onSignUpButtonPress)}
                accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
            >
                Change Information
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
    socialAuthHintText: {
        alignSelf: 'center',
        marginBottom: 16,
    },
    formContainer: {
        marginTop: 48,
        paddingHorizontal: 16,
    },
    formInput: {
        marginTop: 16,
    },
    signUpButton: {
        marginVertical: 24,
        marginHorizontal: 16,
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
    backButton: {
        maxWidth: 80,
        paddingHorizontal: 0,
    },
});

export default ViewUser;
