import React from 'react';
import { View } from 'react-native';
import { Button, CheckBox, Divider, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import {
    Address,
    PhoneNumber,
    IDCard,
    PersonName,
    FacebookIcon,
    GoogleIcon,
    ArrowForwardIconOutLineLeftSide,
    TwitterIcon,
    EmailIcon,
} from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import * as yup from 'yup';
import { identityCardRegExp, passwordRegExp, phoneRegExp } from '../../../app/app-constants';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { RootState } from '../../../app/store-provider';
import { authActions } from '../../../actions/auth-actions';
import { SignUpProps } from '../../../services/requests/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordField from '../../../components/form-inputs/password-field';
import SelectField from '../../../components/form-inputs/select-field';
import InputField from '../../../components/form-inputs/input-field';
import DatePicker from '../../../components/form-inputs/date-picker';

const signUpSchema = yup.object().shape({
    name: yup.string().required('Name is required').typeError('Invalid name'),
    email: yup.string().email().typeError('Invalid email').required('Email is required'),
    password: yup.string().matches(passwordRegExp, 'Please enter a longer password').required('Password is required'),
    identityCard: yup.string().matches(identityCardRegExp, 'Invalid ID').required('ID is required'),
    numberPhone: yup.string().matches(phoneRegExp, 'Invalid phone number').required('Phone number is required'),
    address: yup.string().required('Address is required.'),
    dob: yup.date().typeError('Invalid date format').required('Date of birth is required'),
});
const genderOptions = [{ title: 'Male' }, { title: 'Female' }, { title: 'Other' }];
const initValues: SignUpProps = {
    name: '',
    email: '',
    password: '',
    identityCard: '',
    numberPhone: '',
    address: '',
    sex: '',
    dob: new Date(),
};

const SignUp = ({ navigation }: any): React.ReactElement => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignUpProps>({
        resolver: yupResolver(signUpSchema),
        defaultValues: initValues,
    });

    const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);

    const styles = useStyleSheet(themedStyles);
    const register = useAppSelector((state: RootState) => state.register);
    const dispatch = useAppDispatch();

    const onSignUpButtonPress = (values: SignUpProps): void => {
        const { sex, ...rest } = values;
        const sexStr = genderOptions[parseInt(sex, 10)].title;
        dispatch(authActions.register({ sex: sexStr, ...rest }));
        if (register.registerSusses) {
            console.log(register);
        } else {
            console.log(register.error);
        }
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

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageOverlay style={styles.headerContainer as any} source={require('./assets/unnamed.png')}>
                <View style={styles.signUpContainer}>
                    <Button
                        style={styles.signInButton}
                        appearance="ghost"
                        status="control"
                        size="giant"
                        accessoryRight={ArrowForwardIconOutLineLeftSide}
                        onPress={onSignInButtonPress}
                    >
                        Sign In
                    </Button>
                </View>
            </ImageOverlay>
            <Text style={styles.signInLabel} category="h4">
                SIGN UP
            </Text>
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

            <View style={[styles.container, styles.formContainer]}>
                <InputField name={'name'} control={control} label={'Full name'} accessoryRight={PersonName} />
                <InputField name={'email'} control={control} label={'Email'} accessoryRight={EmailIcon} />
                <PasswordField name={'password'} control={control} />
                <InputField name={'identityCard'} control={control} label={'ID Number'} accessoryRight={IDCard} />
                <InputField
                    name={'numberPhone'}
                    control={control}
                    label={'Phone number'}
                    accessoryRight={PhoneNumber}
                />
                <DatePicker control={control} name={'dob'} label={'Date of birth'} />
                <SelectField name={'sex'} label={'Sex'} control={control} options={genderOptions} />
                <InputField
                    style={styles.formInput}
                    placeholder="Where are you?"
                    label="Address"
                    name={'address'}
                    autoCapitalize="words"
                    control={control}
                    accessoryRight={Address}
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
                onPress={handleSubmit(onSignUpButtonPress)}
                accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
            >
                SIGN UP
            </Button>
        </KeyboardAvoidingView>
    );
};

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    headerContainer: {
        minHeight: 40,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
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
        alignSelf: 'center',
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
        marginHorizontal: 12,
        marginTop: 30,
    },
    divider: {
        flex: 1,
    },
    orLabel: {
        marginHorizontal: 8,
    },
    emailSignLabel: {
        alignSelf: 'center',
        marginTop: 35,
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
