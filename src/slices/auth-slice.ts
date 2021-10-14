import { createSlice } from '@reduxjs/toolkit';
import { authActions } from '../actions/auth-actions';

export interface TokenProps {
    access?: {
        token: string;
        expires: string;
    };
    refresh?: {
        token: string;
        expires: string;
    };
}
export interface LoginResponseProps {
    tokens?: TokenProps;
    code?: string;
    message?: string;
}
interface Props {
    isLogin: boolean;
    tokens?: TokenProps;
    isLoading: boolean;
    error?: string;
}

const initialState: Props = {
    isLogin: false,
    tokens: {},
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authActions.login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authActions.login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLogin = true;
            state.tokens = action.payload.tokens;
        });
        builder.addCase(authActions.login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.isLogin = false;
        });
    },
});

export const authReducer = authSlice.reducer;
