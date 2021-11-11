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
    changeSusses: boolean;
}

const initialState: Props = {
    isLogin: false,
    tokens: {},
    isLoading: false,
    changeSusses: false,
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
            state.tokens = action.payload?.tokens;
        });
        builder.addCase(authActions.login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.isLogin = false;
        });
        builder.addCase(authActions.isLoggedIn.fulfilled, (state, action) => {
            state.isLogin = action.payload;
        });

        // change pass
        builder.addCase(authActions.changePass.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authActions.changePass.fulfilled, (state) => {
            state.isLoading = false;
            state.changeSusses = true;
        });

        // forgot password
        builder.addCase(authActions.forgotPass.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authActions.forgotPass.fulfilled, (state) => {
            state.isLoading = false;
            state.changeSusses = true;
        });
    },
});

export const authReducer = authSlice.reducer;
