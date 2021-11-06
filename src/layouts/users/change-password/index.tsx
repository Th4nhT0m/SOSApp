import React from 'react';
import { View, Alert } from 'react-native';
import { Button, Divider, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import * as yup from 'yup';
import { passwordRegExp } from '../../../app/app-constants';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { ChangePassProps } from '../../../services/requests/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../../app/store-provider';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { ChangeIconOutLine, ArrowForwardIconOutLineLeftSide } from './extra/icons';
import { authActions } from '../../../actions/auth-actions';
import PasswordField from '../../../components/form-inputs/password-field';

const changePassUser = yup.object().shape({
    password: yup.string().matches(passwordRegExp, 'Please enter a longer password').required('Password is required'),
});

const initValues: ChangePassProps = {
    password: '',
};

const ChangePassword = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ChangePassProps>({
        resolver: yupResolver(changePassUser),
        defaultValues: initValues,
    });

    const styles = useStyleSheet(themedStyles);

    const changePass = useAppSelector((state: RootState) => state.auth);

    const onChangeButtonPress = (values: ChangePassProps): void => {
        Alert.alert('Notification', 'Do you want to change the password ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    dispatch(authActions.changePass(values));
                },
            },
        ]);
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

            <Button
                style={styles.iconSetting}
                appearance="ghost"
                status="control"
                size="giant"
                accessoryLeft={ChangeIconOutLine}
            />

            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h5">
                    Change Password
                </Text>
                <Divider style={styles.divider} />
            </View>

            <View style={[styles.container, styles.formContainer]}>
                <PasswordField name={'password'} control={control} label={'New password'} />
            </View>

            <Button
                style={styles.updateButton}
                size="large"
                onPress={handleSubmit(onChangeButtonPress)}
                accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
            >
                Change
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
    updateButton: {
        marginVertical: 24,
        marginHorizontal: 16,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 2,
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

    iconSetting: {
        maxWidth: 350,
        paddingHorizontal: 0,
        alignSelf: 'center',
        marginBottom: 16,
    },
});

export default ChangePassword;
