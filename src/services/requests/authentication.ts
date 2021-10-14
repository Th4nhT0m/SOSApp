import { axiosInstance } from '../axios-config.service';
import { ResetPasswordProps, LogoutTokenProps, ObtainTokenProps, ForgotPasswordProps, SignUpProps } from './types';
import { AppStorage } from '../app-storage.service';

function obtainToken(props: ObtainTokenProps) {
    return axiosInstance.post('/auth/login', {
        email: props.email,
        password: props.password,
    });
}

function refreshToken() {
    return axiosInstance.post('/auth/refresh-tokens', {
        refreshToken: getLocalRefreshToken(),
    });
}

function register(props: SignUpProps) {
    return axiosInstance.post('/auth/register', { ...props });
}

function getLocalRefreshToken() {
    AppStorage.getItem('refreshToken').then((response) => response.data);
    return '';
}

function logOut(props: LogoutTokenProps) {
    return axiosInstance.post('/auth/logout', { ...props });
}

function forgotPassword(props: ForgotPasswordProps) {
    return axiosInstance.post('/auth/forgot-password', { props });
}

function resetPassword(props: ResetPasswordProps) {
    return axiosInstance.post('/auth/forgot-password', { ...props });
}
function verifyEmail() {
    return axiosInstance.post('/auth/verify-email', {
        refreshToken: getLocalRefreshToken(),
    });
}

function sendVerifyEmail() {
    return axiosInstance.post('/auth/verify-email', {
        refreshToken: getLocalRefreshToken(),
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
