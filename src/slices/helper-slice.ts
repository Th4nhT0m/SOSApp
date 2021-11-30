import { createSlice } from '@reduxjs/toolkit';
import { Helpers } from '../services/requests/types';
import { HelperAction } from '../actions/helper-actions';
import { ListResponse } from '../models/common';

export interface HelperProps {
    code?: string;
    message?: string;
}

interface user {
    id: string;
    numberPhone: string;
    name: string;
    address: string;
}

interface Props {
    isLoading: boolean;
    dateGet: Helpers;
    isPatch: boolean;
    dateList: ListResponse<Helpers>;
}
const initialState: Props = {
    isPatch: false,
    isLoading: false,
    dateGet: {
        id: '',
        user: {
            id: '',
            name: '',
            address: '',
            numberPhone: '',
        },
        status: '',
        accident: '',
        content: '',
        helperLatitude: '',
        helperLongitude: '',
        accidentLatitude: '',
        accidentLongitude: '',
        timeOut: Date.prototype,
        createTime: Date.prototype,
        UpdateTime: Date.prototype,
    },
    dateList: { results: [], page: 0, totalResults: 0, totalPages: 0, limit: 0 },
};
const helperSlice = createSlice({
    name: 'helpers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(HelperAction.createHelper.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(HelperAction.createHelper.fulfilled, (state, action) => {
            state.dateGet = action.payload;
        });

        // change
        builder.addCase(HelperAction.patchHelper.pending, (state) => {
            state.isPatch = false;
        });
        builder.addCase(HelperAction.patchHelper.fulfilled, (state, action) => {
            state.dateGet = action.payload;
        });

        builder.addCase(HelperAction.getMyHistoryHelper.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(HelperAction.getMyHistoryHelper.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dateList = action.payload;
        });

        // Change 1
        builder.addCase(HelperAction.getHelperByIDAccident.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(HelperAction.getHelperByIDAccident.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dateList = action.payload;
        });

        // change
        builder.addCase(HelperAction.getAllHelper.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(HelperAction.getAllHelper.fulfilled, (state, action) => {
            state.dateList = action.payload;
        });
    },
});

export const helpersReducer = helperSlice.reducer;
