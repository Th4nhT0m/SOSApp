import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { ImageOverlay } from './extra/image-overlay.component';
import * as yup from 'yup';
import { FacebookIcon, GoogleIcon, TwitterIcon } from './extra/icons';
import { useAppDispatch } from '../../../services/hooks';
import { authActions } from '../../../actions/auth-actions';
import { LoginInProps, SignUpProps } from '../../../services/requests/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/form-inputs/input-field';
import PasswordField from '../../../components/form-inputs/password-field';

const loginSchema = yup.object().shape({
    email: yup.string().email().typeError('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const SignIn = ({ navigation }: any): React.ReactElement => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignUpProps>({
        resolver: yupResolver(loginSchema),
    });
    const dispatch = useAppDispatch();

    const onSignInButtonPress = (values: LoginInProps): void => {
        dispatch(authActions.login(values));
    };
    const onSignUpButtonPress = (): void => {
        navigation && navigation.navigate('SignUp');
    };

    const onForgotPress = (): void => {
        navigation && navigation.navigate('ForgotPassword');
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageOverlay style={styles.container} source={require('../sign-up/assets/unnamed.png')}>
                <View style={styles.headerContainer}>
                    <Text style={styles.signInLabel} category="s1" status="control">
                        Sign in to your account
                    </Text>
                </View>

                <View style={styles.formContainer}>
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
                        <InputField label={'Email'} name={'email'} control={control} />
                        <PasswordField name={'password'} control={control} />
                        <Button
                            style={styles.signInButton}
                            status={'primary'}
                            size="giant"
                            accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
                            onPress={handleSubmit(onSignInButtonPress)}
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
                            <Button appearance="ghost" size="giant" status="control" accessoryLeft={GoogleIcon} />
                            <Button appearance="ghost" size="giant" status="control" accessoryLeft={FacebookIcon} />
                            <Button appearance="ghost" size="giant" status="control" accessoryLeft={TwitterIcon} />
                        </View>
                    </View>
                </View>
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
