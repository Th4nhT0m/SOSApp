import { createSlice } from '@reduxjs/toolkit';
import { Helper, Helpers } from '../services/requests/types';
import { HelperAction } from '../actions/helper-actions';
import { ListResponse } from '../models/common';

export interface HelperProps {
    code?: string;
    message?: string;
}

interface Props {
    isLoading: boolean;
    dateGet: Helper;
    isPatch: boolean;
    dateList: ListResponse<Helpers>;
    data: ListResponse<Helper>;
}
const initialState: Props = {
    isPatch: false,
    isLoading: false,
    dateGet: {
        id: '',
        user: '',
        status: '',
        accident: '',
        content: '',
        helperLatitude: '',
        helperLongitude: '',
        accidentLatitude: '',
        accidentLongitude: '',
        timeOut: Date.prototype,
    },
    dateList: { results: [], page: 0, totalResults: 0, totalPages: 0, limit: 0 },
    data: { results: [], page: 0, totalResults: 0, totalPages: 0, limit: 0 },
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
      
        builder.addCase(HelperAction.patchHelper.pending, (state) => {
            state.isPatch = false;
        });
        builder.addCase(HelperAction.patchHelper.fulfilled, (state, action) => {
            state.dateGet = action.payload;
        });
      
        // builder.addCase(HelperAction.deleteHelper.pending, (state) => {
        //
        // });
        // builder.addCase(HelperAction.deleteHelper.fulfilled, (state, action) => {
        //
        // });
        // builder.addCase(HelperAction.createHelper.pending, (state) => {
        //
        // });
        // builder.addCase(HelperAction.createHelper.fulfilled, (state, action) => {
        //
        // });
      
        builder.addCase(HelperAction.getMyHistoryHelper.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(HelperAction.getMyHistoryHelper.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dateList = action.payload;
         });
      
        builder.addCase(HelperAction.getHelperByIDAccident.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(HelperAction.getHelperByIDAccident.fulfilled, (state, action) => {
            state.data = action.payload;
        });
      
        builder.addCase(HelperAction.getAllHelper.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(HelperAction.getAllHelper.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export const helpersReducer = helperSlice.reducer;
