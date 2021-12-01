import { createSlice } from '@reduxjs/toolkit';
import { accidentsActions } from '../actions/accidents-ations';
import { Accidents } from '../services/requests/types';
import { ListResponse } from '../models/common';

export interface accidentsResponseProps {
    code?: string;
    message?: string;
}

interface Props {
    isLoading: boolean;
    dataGet: Accidents;
    dateList: ListResponse<Accidents>;
}

const initialState: Props = {
    isLoading: false,
    dataGet: {
        id: '',
        nameAccident: '',
        status: '',
        description: '',
        accidentType: '',
        latitude: '',
        longitude: '',
        created_by: {
            id: '',
            numberPhone: '',
            name: '',
            address: '',
        },
        modified_by: '',
        createTime: Date.prototype,
        UpdateTime: Date.prototype,
    },
    dateList: { results: [], page: 0, totalResults: 0, totalPages: 0, limit: 0 },
};

const accidentsSlice = createSlice({
    name: 'accidents',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(accidentsActions.create.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(accidentsActions.create.fulfilled, (state, action) => {
            state.dataGet = action.payload;
        });

        // change ---
        builder.addCase(accidentsActions.getAllAccidents.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(accidentsActions.getAllAccidents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dateList = action.payload;
        });

        builder.addCase(accidentsActions.getHistoryAccident.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(accidentsActions.getHistoryAccident.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dateList = action.payload;
        });

        // change
        builder.addCase(accidentsActions.createUrgent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(accidentsActions.createUrgent.fulfilled, (state, action) => {
            state.dataGet = action.payload;
        });

        builder.addCase(accidentsActions.getAccidentByID.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(accidentsActions.getAccidentByID.fulfilled, (state, action) => {
            state.dataGet = action.payload;
        });

        builder.addCase(accidentsActions.patchAllAccident.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(accidentsActions.patchAllAccident.fulfilled, (state, action) => {
            state.dataGet = action.payload;
        });
    },
});

export const accidentsReducer = accidentsSlice.reducer;
