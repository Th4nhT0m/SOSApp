import React from 'react';
import { View } from 'react-native';
import { Button, CheckBox, Divider, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { ArrowForwardIconOutline, FacebookIcon, GoogleIcon, HeartIconFill, TwitterIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import * as yup from 'yup';
import { identityCardRegExp, passwordRegExp, phoneRegExp } from '../../../app/app-constants';
import { FastField, Formik, FormikValues } from 'formik';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { FieldInput, DatePicker, PasswordInput, SelectInput } from '../../../components/form-inputs';

const SignUp = ({ navigation }: any): React.ReactElement => {
    const SignUpSchema = yup.object().shape({
        name: yup.string().required('Name is required').typeError('Invalid name'),
        email: yup.string().email().typeError('Invalid email').required('Email is required'),
        password: yup
            .string()
            .matches(passwordRegExp, 'Please enter a longer password')
            .required('Password is required'),
        identityCard: yup.string().matches(identityCardRegExp, 'Invalid ID').required('ID is required'),
        numberPhone: yup.string().matches(phoneRegExp, 'Invalid phone number').required('Phone number is required'),
        address: yup.string().required('Address is required.'),
        sex: yup.string().oneOf(['Male', 'Female', 'Other'], 'Gender is required'),
        dob: yup.date().typeError('Invalid date format').required('Date of birth is required'),
    });
    const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);

    const styles = useStyleSheet(themedStyles);

    const onSignUpButtonPress = (values: FormikValues): void => {
        console.log(values);
    };

    const onSignInButtonPress = (): void => {
        navigation && navigation.navigate('SignIn');
    };

    const renderCheckboxLabel = React.useCallback(
        (evaProps) => (
            <Text {...evaProps} style={styles.termsCheckBoxText}>
                By creating an account, I agree to the Ewa Terms of\nUse and Privacy Policy
            </Text>
        ),
        []
    );

    const initValues = {
        name: '',
        email: '',
        password: '',
        identityCard: '',
        numberPhone: '',
        address: '',
        sex: 'Male',
        dob: new Date(),
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageOverlay style={styles.headerContainer as any} source={require('./assets/image-background.jpg')}>
                <Button
                    style={styles.evaButton}
                    appearance="ghost"
                    status="control"
                    size="large"
                    accessoryLeft={HeartIconFill}
                >
                    EVA
                </Button>
                <View style={styles.signUpContainer}>
                    <Text style={styles.signInLabel} category="h4" status="control">
                        SIGN UP
                    </Text>
                    <Button
                        style={styles.signInButton}
                        appearance="ghost"
                        status="control"
                        size="giant"
                        accessoryLeft={ArrowForwardIconOutline}
                        onPress={onSignInButtonPress}
                    >
                        Sign In
                    </Button>
                </View>
            </ImageOverlay>
            <View style={styles.socialAuthContainer}>
                <Text style={styles.socialAuthHintText}>Sign with a social account</Text>
                <View style={styles.socialAuthButtonsContainer}>
                    <Button appearance="ghost" size="giant" status="basic" accessoryLeft={GoogleIcon} />
                    <Button appearance="ghost" size="giant" status="basic" accessoryLeft={FacebookIcon} />
                    <Button appearance="ghost" size="giant" status="basic" accessoryLeft={TwitterIcon} />
                </View>
            </View>
            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h5">
                    OR
                </Text>
                <Divider style={styles.divider} />
            </View>
            <Text style={styles.emailSignLabel}>Sign up with Email</Text>
            <Formik onSubmit={onSignUpButtonPress} initialValues={initValues} validationSchema={SignUpSchema}>
                {({ handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                    <>
                        <View style={[styles.container, styles.formContainer]}>
                            <FastField
                                placeholder="Ally"
                                label="NAME"
                                name={'name'}
                                autoCapitalize="words"
                                component={FieldInput}
                                handleBlur={handleBlur('name')}
                                handleChange={handleChange('name')}
                            />
                            <FastField
                                name={'dob'}
                                style={styles.formInput}
                                placeholder="18/10/1995"
                                label="Date of Birth"
                                component={DatePicker}
                                handleBlur={handleBlur('dob')}
                                handleChange={handleChange('dob')}
                            />
                            <FastField
                                style={styles.formInput}
                                placeholder="ally.watsan@gmail.com"
                                label="EMAIL"
                                component={FieldInput}
                                name={'email'}
                                handleBlur={handleBlur('email')}
                                handleChange={handleChange('email')}
                            />
                            <FastField
                                style={styles.formInput}
                                label="PASSWORD"
                                placeholder="Password"
                                component={PasswordInput}
                                name={'password'}
                                handleBlur={handleBlur('password')}
                                handleChange={handleChange('password')}
                            />
                            <FastField
                                style={styles.formInput}
                                placeholder="Identity Card?"
                                label="Identity Card"
                                name={'identityCard'}
                                autoCapitalize="words"
                                component={FieldInput}
                                handleBlur={handleBlur('identityCard')}
                                handleChange={handleChange('identityCard')}
                            />
                            <FastField
                                style={styles.formInput}
                                placeholder="Number Phone?"
                                label="Number Phone"
                                name={'numberPhone'}
                                component={FieldInput}
                                handleBlur={handleBlur('numberPhone')}
                                handleChange={handleChange('numberPhone')}
                            />
                            <FastField
                                style={styles.formContainer}
                                label="GENDER"
                                options={['Male', 'Female', 'Other'] as any}
                                component={SelectInput}
                                name={'sex'}
                                handleBlur={handleBlur('sex')}
                                handleChange={handleChange('sex')}
                            />
                            <FastField
                                style={styles.formInput}
                                placeholder="Where are you?"
                                label="ADDRESS"
                                name={'address'}
                                autoCapitalize="words"
                                component={FieldInput}
                                handleBlur={handleBlur('address')}
                                handleChange={handleChange('address')}
                            />
                            <CheckBox
                                style={styles.termsCheckBox}
                                checked={termsAccepted}
                                onChange={(checked: boolean) => setTermsAccepted(checked)}
                            >
                                {renderCheckboxLabel}
                            </CheckBox>
                        </View>
                        <Button
                            style={styles.signUpButton}
                            size="large"
                            onPress={(props) => handleSubmit(props)}
                            accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
                        >
                            SIGN UP
                        </Button>
                    </>
                )}
            </Formik>
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

export default SignUp;
