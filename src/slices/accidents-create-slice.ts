import { createSlice } from '@reduxjs/toolkit';
import { accidentsActions } from '../actions/accidents-ations';
import { Accidents } from '../services/requests/types';
import { ListResponse } from '../models/common';
export interface accidentsProps {
    code?: string;
    message?: string;
}
interface Props {
    isLoading: boolean;
    data: ListResponse<Accidents>;
    dataGet: Accidents;
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
        created_by: '',
        modified_by: '',
    },
    data: { results: [], page: 0, totalResults: 0, totalPages: 0, limit: 0 },
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
        builder.addCase(accidentsActions.getAllAccidents.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(accidentsActions.getAllAccidents.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export const accidentsReducer = accidentsSlice.reducer;
