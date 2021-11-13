import { createAsyncThunk } from '@reduxjs/toolkit';
import { handbookRequest } from '../services/requests/handbook';

const getAllHandBook = createAsyncThunk('getAllHandBook', async () => {
    const response = await handbookRequest.getAllHandbook();
    return response;
});

export const handbookActions = {
    getAllHandBook,
};
