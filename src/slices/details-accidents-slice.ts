import { createSlice } from '@reduxjs/toolkit';
import { DetailAccidentsAction } from '../actions/details-accident-actions';
import { DetailAccidents, DetailAccidentsProps } from '../services/requests/types';

export interface detailsAccidentsProps {
    code?: string;
    message?: string;
}
interface Props {
    isLoading: boolean;
    dataCreate: DetailAccidentsProps;
    dataGet: DetailAccidents;
    isPatch: boolean;
}
const initialState: Props = {
    isPatch: false,
    isLoading: false,
    dataCreate: { accident: '', user: '', latitude: '', longitude: '' },
    dataGet: {
        id: '',
        user: '',
        accident: '',
        status: '',
        latitude: '',
        longitude: '',
        content: '',
        timeOut: Date.prototype,
    },
};

const detailAccidentsSlice = createSlice({
    name: 'detailAccident',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(DetailAccidentsAction.creatDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(DetailAccidentsAction.creatDetails.fulfilled, (state, action) => {
            state.dataCreate = action.payload;
            state.dataGet = action.payload;
        });
        builder.addCase(DetailAccidentsAction.getDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(DetailAccidentsAction.getDetails.fulfilled, (state, action) => {
            state.dataGet = action.payload;
        });
        builder.addCase(DetailAccidentsAction.patchDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(DetailAccidentsAction.patchDetails.fulfilled, (state, action) => {
            state.dataGet = action.payload;
            state.isPatch = true;
        });
        builder.addCase(DetailAccidentsAction.deleteDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(DetailAccidentsAction.deleteDetails.fulfilled, (state, action) => {
            state.dataCreate = action.payload;
        });
    },
});

export const detailAccidentsReducer = detailAccidentsSlice.reducer;
