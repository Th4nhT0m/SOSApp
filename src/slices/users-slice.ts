import { createSlice } from '@reduxjs/toolkit';
import { usersActions } from '../actions/user-actions';

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
    },
});

export const usersReducer = usersSlice.reducer;
