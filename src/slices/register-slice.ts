import { createSlice } from '@reduxjs/toolkit';
import { authActions } from '../actions/auth-actions';

interface Props {
    isLoading: boolean;
    error?: string;
    registerSusses: boolean;
}
const initialState: Props = {
    isLoading: false,
    registerSusses: false,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authActions.register.pending, (state) => {
            state.isLoading = false;
            state.registerSusses = true;
        });
        builder.addCase(authActions.register.fulfilled, (state) => {
            state.isLoading = true;
        });
    },
});

export const registerReducer = registerSlice.reducer;
