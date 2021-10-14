import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FastField, Formik } from 'formik';
import { Button, Text } from '@ui-kitten/components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { ImageOverlay } from './extra/image-overlay.component';
import * as yup from 'yup';
import { FieldInput, PasswordInput } from '../../../components/form-inputs';
import { LockIcon, PersonIcon } from '../../../components/Icons';
import { FacebookIcon, GoogleIcon, TwitterIcon } from './extra/icons';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { RootState } from '../../../app/store-provider';
import { authActions } from '../../../actions/auth-actions';
import { LoginInProps } from '../../../services/requests/types';

const LoginSchema = yup.object().shape({
    email: yup.string().email().typeError('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const SignIn = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);
    const onSignInButtonPress = (values: LoginInProps): void => {
        dispatch(authActions.login(values));
        console.log(values);
        console.log(auth);
    };

    const onSignUpButtonPress = (): void => {
        navigation && navigation.navigate('SignUp');
    };

    const onForgotPress = (): void => {
        navigation && navigation.navigate('ForgotPassword');
    };

    const initialValues = {
        email: '',
        password: '',
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageOverlay style={styles.container} source={require('./assets/image-background.jpg')}>
                <View style={styles.headerContainer}>
                    <Text category="h1" status="control">
                        Hello
                    </Text>
                    <Text style={styles.signInLabel} category="s1" status="control">
                        Sign in to your account
                    </Text>
                </View>
                <Formik initialValues={initialValues} onSubmit={onSignInButtonPress} validationSchema={LoginSchema}>
                    {({ handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                        <View style={styles.formContainer}>
                            <FastField
                                name={'email'}
                                label={'Email'}
                                accessoryLeft={PersonIcon}
                                handleChange={handleChange('email')}
                                handleBlur={handleBlur('email')}
                                component={FieldInput}
                            />

                            <FastField
                                style={styles.passwordInput}
                                name={'password'}
                                label={'Password'}
                                accessoryLeft={LockIcon}
                                handleChange={handleChange('password')}
                                handleBlur={handleBlur('password')}
                                component={PasswordInput}
                            />
                            <View style={styles.forgotPasswordContainer}>
                                <Button
                                    style={styles.forgotPasswordButton}
                                    appearance="ghost"
                                    status="control"
                                    onPress={onForgotPress}
                                >
                                    Forgot your password?
                                </Button>
                            </View>
                            <View>
                                <Button
                                    style={styles.signInButton}
                                    status={'primary'}
                                    size="giant"
                                    accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
                                    onPress={(props) => handleSubmit(props)}
                                    children="Sign In"
                                />
                                <Button
                                    style={styles.signUpButton}
                                    appearance="ghost"
                                    status="control"
                                    onPress={onSignUpButtonPress}
                                >
                                    Don't have an account? Sign Up
                                </Button>
                            </View>
                            <View style={styles.socialAuthContainer}>
                                <Text style={styles.socialAuthHintText} status={'control'}>
                                    Sign with a social account
                                </Text>
                                <View style={styles.socialAuthButtonsContainer}>
                                    <Button
                                        appearance="ghost"
                                        size="giant"
                                        status="control"
                                        accessoryLeft={GoogleIcon}
                                    />
                                    <Button
                                        appearance="ghost"
                                        size="giant"
                                        status="control"
                                        accessoryLeft={FacebookIcon}
                                    />
                                    <Button
                                        appearance="ghost"
                                        size="giant"
                                        status="control"
                                        accessoryLeft={TwitterIcon}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
            </ImageOverlay>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
    },
    formContainer: {
        flex: 1,
        marginTop: 32,
        paddingHorizontal: 16,
    },
    signInLabel: {
        marginTop: 16,
    },
    signInButton: {
        marginHorizontal: 16,
    },
    signUpButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    passwordInput: {
        marginTop: 16,
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
    socialAuthButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    socialAuthHintText: {
        alignSelf: 'center',
        marginBottom: 16,
    },
    socialAuthContainer: {
        marginTop: 24,
    },
});

export default SignIn;
