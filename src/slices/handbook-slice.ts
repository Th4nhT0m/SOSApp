import { createSlice } from '@reduxjs/toolkit';
import { ListResponse } from '../models/common';
import { handbookActions } from '../actions/handbook-actions';
import { Handbook } from '../services/requests/types';

interface Props {
    isLoading: boolean;
    data: ListResponse<Handbook>;
}

const initialState: Props = {
    isLoading: false,
    data: { results: [], page: 0, totalResults: 0, totalPages: 0, limit: 0 },
};

const handbookSlice = createSlice({
    name: 'handbooks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // view all handbook
        builder.addCase(handbookActions.getAllHandBook.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(handbookActions.getAllHandBook.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
    },
});

export const handbooksReducer = handbookSlice.reducer;
