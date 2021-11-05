import { createSlice } from '@reduxjs/toolkit';
import { accidentsActions } from '../actions/accidents-ations';

interface Props {
    isSuccess: boolean;
    isLoading: boolean;
}

const initialState: Props = {
    isSuccess: false,
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
            state.isSuccess = true;
        });
    },
});
export const accidentsReducer = accidentsSlice.reducer;
