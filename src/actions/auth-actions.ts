import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthRequest } from '../services/requests/authentication';
import { LoginInProps } from '../services/requests/types';
import { SignUpProps } from '../services/requests/types';
import { LoginResponseProps } from '../slices/auth-slice';
import { registerResponseProps } from '../slices/register-slice';

const login = createAsyncThunk('auth/login', async (props: LoginInProps) => {
    const response = await AuthRequest.obtainToken(props);
    return response as LoginResponseProps;
});

const register = createAsyncThunk('auth/register', async (props: SignUpProps) => {
    const response = await AuthRequest.register(props);
    return response as registerResponseProps;
});

const token = createAsyncThunk('auth/refreshToken', async () => {
    const response = await AuthRequest.refreshToken();
    return response;
});

export const authActions = {
    login,
    register,
    token,
};
