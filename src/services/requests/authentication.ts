import { axiosInstance } from '../axios-config.service';
import {
    ResetPasswordProps,
    LogoutTokenProps,
    ObtainTokenProps,
    ForgotPasswordProps,
    SignUpProps,
    ChangePassProps,
} from './types';
import { AppStorage } from '../app-storage.service';
import { TokenProps } from '../../slices/auth-slice';

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
    const tokens: TokenProps = await AppStorage.getItem('tokens').catch((error) => {
        console.log(error);
    });
    return tokens?.refresh?.token ?? '';
}

async function logOut(props: LogoutTokenProps) {
    const result = await AppStorage.removeItem('tokens');
    console.log('Logout : ', result);
    return await axiosInstance.post('/auth/logout', { ...props }).catch((error) => {
        return error;
    });
}

// forgot password
async function forgotPassword(props: ForgotPasswordProps) {
    return await axiosInstance.post('/auth/forgot-password', { ...props }).catch((error) => {
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

// change password
async function changePasswordUser(props: ChangePassProps) {
    return await axiosInstance.patch('/auth/change-password', { ...props }).catch((error) => {
        return error;
    });
}

export const AuthRequest = {
    obtainToken,
    refreshToken,
    register,
    logOut,
    changePasswordUser,
    forgotPassword,
    resetPassword,
    verifyEmail,
    sendVerifyEmail,
};
