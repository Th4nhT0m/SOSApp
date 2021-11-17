import { createAsyncThunk } from '@reduxjs/toolkit';
import { handbookRequest } from '../services/requests/handbook';

const getAllHandBook = createAsyncThunk('getAllHandBook', async () => {
    const response = await handbookRequest.getAllHandbook();
    return response;
});

const getHandbookById = createAsyncThunk('getHandbook', async (id: string) => {
    const response = await handbookRequest.getHandbook(id);
    return response;
});

export const handbookActions = {
    getAllHandBook,
    getHandbookById,
};
