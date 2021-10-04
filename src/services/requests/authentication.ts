import { axiosInstance } from '../axios-config.service';
import { Email, LoginInProps, LogoutTokenPors, ObtainTokenProps, Password, SignUpProps } from './types';
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

function signUp(props: SignUpProps) {
    return axiosInstance.post('/auth/register', { ...props });
}

function getLocalRefreshToken() {
    AppStorage.getItem('refreshToken').then((response) => response.data);
    return '';
}

function logIn(props: LoginInProps) {
    return axiosInstance.post('auth/login', { ...props });
}

function logOut(props: LogoutTokenPors) {
    return axiosInstance.post('auth/logout', { ...props });
}

function forgotPassword(props: Email) {
    return axiosInstance.post('auth/forgot-password', { ...props });
}

function resetPassword(props: Password) {
    return axiosInstance.post('auth/forgot-password', { ...props });
}
function verrifyEmail() {
    return axiosInstance.post('auth/verify-email', {
        refreshToken: getLocalRefreshToken(),
    });
}

function sendVerrifyEmail() {
    return axiosInstance.post('auth/verify-email', {
        refreshToken: getLocalRefreshToken(),
    });
}

export const AuthRequest = {
    obtainToken,
    refreshToken,
    logIn,
    signUp,
    logOut,
    forgotPassword,
    resetPassword,
    verrifyEmail,
    sendVerrifyEmail,
};
