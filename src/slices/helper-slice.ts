import { createSlice } from '@reduxjs/toolkit';
import { HelpProps, PatchHelper } from '../services/requests/types';
import { HelperAction } from '../actions/helper-actions';

export interface HelperProps {
    code?: string;
    message?: string;
}

interface Props {
    isLoading: boolean;
    dataCreate: HelpProps;

    isPatch: boolean;
}
const initialState: Props = {
    isPatch: false,
    isLoading: false,
    dataCreate: {
        accident: '',
        user: '',
        accidentLatitude: '',
        accidentLongitude: '',
        helperLatitude: '',
        helperLongitude: '',
    },
};
const helpeSlice = createSlice({
    name: 'helpers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(HelperAction.createHelper.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(HelperAction.createHelper.fulfilled, (state, action) => {
            state.dataCreate = action.payload;
        });
        builder.addCase(HelperAction.patchHelper.pending, (state) => {
            state.isPatch = true;
        });
        builder.addCase(HelperAction.patchHelper.fulfilled, (state, action) => {
            state.dataCreate = action.payload;
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
    },
});

export const helpersReducer = helpeSlice.reducer;
