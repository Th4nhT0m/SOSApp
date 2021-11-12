import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { EmailIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import * as yup from 'yup';
import { ForgotPasswordProps } from '../../../services/requests/types';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../../app/store-provider';
import { authActions } from '../../../actions/auth-actions';
import { LoadingIndicator } from '../../../components/loading-indicator';
import InputField from '../../../components/form-inputs/input-field';

const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email().typeError('Email is invalid').required('Email is required'),
});

const initValues: ForgotPasswordProps = {
    email: '',
};

const ForgotPassword = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ForgotPasswordProps>({
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues: initValues,
    });

    // const [email, setEmail] = React.useState<string>();

    const onResetPasswordButtonPress = (values: ForgotPasswordProps): void => {
        dispatch(authActions.forgotPass(values));
    };

    return (
        <KeyboardAvoidingView>
            <ImageOverlay style={styles.container} source={require('./assets/image-background.jpg')}>
                <Text style={styles.forgotPasswordLabel} category="h4" status="control">
                    Forgot Password
                </Text>
                <Text style={styles.enterEmailLabel} status="control">
                    Please enter your email address
                </Text>

                <View style={styles.formContainer}>
                    <InputField
                        name={'email'}
                        control={control}
                        label={'Email'}
                        placeholder="Email"
                        accessoryRight={EmailIcon}
                    />
                </View>

                <Button
                    size="giant"
                    onPress={handleSubmit(onResetPasswordButtonPress)}
                    accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
                >
                    RESET PASSWORD
                </Button>
            </ImageOverlay>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 24,
    },
    forgotPasswordLabel: {
        zIndex: 1,
        alignSelf: 'center',
        marginTop: 24,
    },
    enterEmailLabel: {
        zIndex: 1,
        alignSelf: 'center',
        marginTop: 64,
    },
});
export default ForgotPassword;
