import { createSlice } from '@reduxjs/toolkit';
import { DetailAccidentsAction } from '../actions/details-accident-actions';
import { DetailAccidentsProps } from '../services/requests/types';

export interface detailsAccidentsProps {
    code?: string;
    message?: string;
}
interface Props {
    isLoading: boolean;
    data: DetailAccidentsProps;
}
const initialState: Props = {
    isLoading: false,
    data: { accident: '', user: '', latitude: '', longitude: '' },
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
            state.data = action.payload;
        });
    },
});

export const detailAccidentsReducer = detailAccidentsSlice.reducer;
