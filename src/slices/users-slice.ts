import { createSlice } from '@reduxjs/toolkit';
import { usersActions } from '../actions/user-actions';
import { UserInfo } from '../models/user-info.model';

export interface userProps {
    code?: string;
    message?: string;
}

const initialState = {
    isLoading: false,
    data: {},
    currentUser: {
        email: '',
        dob: '',
        address: '',
        name: '',
        identityCard: '',
        sex: 'Male',
        role: '',
        numberPhone: '',
        id: '',
    },
    changeSusses: false,
    error: '',
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(usersActions.getCurrentUserInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(usersActions.getCurrentUserInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        });

        builder.addCase(usersActions.getUserInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(usersActions.getUserInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        // view user
        builder.addCase(usersActions.getViewUserInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(usersActions.getViewUserInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        });

        // update user
        builder.addCase(usersActions.updateUserInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(usersActions.updateUserInfo.fulfilled, (state) => {
            state.isLoading = false;
            state.changeSusses = true;
        });

        // view user by id
        builder.addCase(usersActions.getViewUserInfoById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(usersActions.getViewUserInfoById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        });
    },
});

export const usersReducer = usersSlice.reducer;
