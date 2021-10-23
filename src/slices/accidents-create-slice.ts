import { createSlice } from '@reduxjs/toolkit';
import { accidentsActions } from '../actions/accidents-ations';

interface Props {
    issusses: boolean;
    isLoading: boolean;
}

const initialState: Props = {
    issusses: false,
    isLoading: false,
};

const accidentsSlice = createSlice({
    name: 'accidents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(accidentsActions.create.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(accidentsActions.create.fulfilled, (state, action) => {
            state.issusses = true;
        });
    },
});
export const accidentsReducer = accidentsSlice.reducer;
