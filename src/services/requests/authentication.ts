import { axiosInstance } from '../axios-config.service';
import { ResetPasswordProps, LogoutTokenProps, ObtainTokenProps, ForgotPasswordProps, SignUpProps } from './types';
import { AppStorage } from '../app-storage.service';

async function obtainToken(props: ObtainTokenProps) {
    return await axiosInstance
        .post('/auth/login', {
            email: props.email,
            password: props.password,
        })
        .catch((error) => {
            return error;
        });
}

async function refreshToken() {
    return axiosInstance
        .post('/auth/refresh-tokens', {
            refreshToken: getLocalRefreshToken(),
        })
        .catch((error) => {
            return error;
        });
}

async function register(props: SignUpProps) {
    return axiosInstance.post('/auth/register', { ...props }).catch((error) => {
        return error;
    });
}

async function getLocalRefreshToken() {
    return await AppStorage.getItem('refreshToken').catch((error) => {
        return error;
    });
}

async function logOut(props: LogoutTokenProps) {
    return await axiosInstance.post('/auth/logout', { ...props }).catch((error) => {
        return error;
    });
}

async function forgotPassword(props: ForgotPasswordProps) {
    return await axiosInstance.post('/auth/forgot-password', { props }).catch((error) => {
        return error;
    });
}

async function resetPassword(props: ResetPasswordProps) {
    return await axiosInstance.post('/auth/forgot-password', { ...props }).catch((error) => {
        return error;
    });
}

async function verifyEmail() {
    return await axiosInstance
        .post('/auth/verify-email', {
            refreshToken: await getLocalRefreshToken(),
        })
        .catch((error) => {
            return error;
        });
}

async function sendVerifyEmail() {
    return await axiosInstance
        .post('/auth/verify-email', {
            refreshToken: getLocalRefreshToken(),
        })
        .catch((error) => {
            return error;
        });
}

export const AuthRequest = {
    obtainToken,
    refreshToken,
    register,
    logOut,
    forgotPassword,
    resetPassword,
    verifyEmail,
    sendVerifyEmail,
};
