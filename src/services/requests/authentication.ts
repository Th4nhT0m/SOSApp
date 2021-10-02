import { axiosInstance } from '../axios-config.service';
import { ObtainTokenProps, SignUpProps } from './types';
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

export const AuthRequest = {
    obtainToken,
    refreshToken,
    signUp,
};
