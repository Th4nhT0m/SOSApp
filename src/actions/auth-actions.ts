import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthRequest } from '../services/requests/authentication';
import {
    ChangePassProps,
    EditUserProps,
    ForgotPasswordProps,
    LoginInProps,
    SignUpProps,
} from '../services/requests/types';
import { LoginResponseProps, TokenProps } from '../slices/auth-slice';
import { registerResponseProps } from '../slices/register-slice';
import { AppStorage } from '../services/app-storage.service';
import { UsersRequests } from '../services/requests/user';
import { USER_INFO } from '../app/app-constants';
import { userProps } from '../slices/users-slice';

const login = createAsyncThunk('auth/login', async (props: LoginInProps) => {
    const response = await AuthRequest.obtainToken(props);
    if (response.access !== null) {
        await AppStorage.setItem('tokens', response);
    }
    return response as LoginResponseProps;
});

const register = createAsyncThunk('auth/register', async (props: SignUpProps) => {
    const response = await AuthRequest.register(props);
    return response as registerResponseProps;
});

const token = createAsyncThunk('auth/refreshToken', async () => {
    return await AuthRequest.refreshToken();
});

const isLoggedIn = createAsyncThunk('auth/isLoggedIn', async () => {
    const tokens: TokenProps = await AppStorage.getItem('tokens');
    console.log(tokens);
    return tokens !== null && tokens !== undefined;
});

const logout = createAsyncThunk('auth/logout', async () => {
    const tokens: TokenProps = await AppStorage.removeItem('tokens');
    if (tokens.refresh?.token !== undefined) {
        return await AuthRequest.logOut({ refreshToken: tokens.refresh?.token });
    }
});

// change password
const changePass = createAsyncThunk('auth/change-password', async (props: ChangePassProps) => {
    const response = await AuthRequest.changePasswordUser(props);
    await AppStorage.setItem(USER_INFO, response);
    return response as LoginResponseProps;
});

// forgot password
const forgotPass = createAsyncThunk('auth/forgot-password', async (props: ForgotPasswordProps) => {
    const response = await AuthRequest.forgotPassword(props);
    return response;
});

export const authActions = {
    login,
    register,
    token,
    isLoggedIn,
    logout,
    changePass,
    forgotPass,
};
