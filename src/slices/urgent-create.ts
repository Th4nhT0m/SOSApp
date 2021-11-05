import { createSlice } from '@reduxjs/toolkit';
import { authActions } from '../actions/auth-actions';

export interface urgentResponseProps {
    code?: string;
    message?: string;
}

interface Props {
    isLoading: boolean;
    error?: string;
    registerSusses: boolean;
}

const initialState: Props = {
    isLoading: false,
    registerSusses: false,
};

const urgentSlice = createSlice({
    name: 'urgent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authActions.register.pending, (state) => {
            state.isLoading = false;
            state.registerSusses = true;
        });
        builder.addCase(authActions.register.fulfilled, (state, action) => {
            state.isLoading = true;
            state.error = action.payload.message;
        });
    },
});

export const urgentReducer = urgentSlice.reducer;
