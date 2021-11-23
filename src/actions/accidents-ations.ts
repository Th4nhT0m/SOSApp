import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccidentsRequest } from '../services/requests/accidents';
import { AccidentsProps } from '../services/requests/types';
import { AppStorage } from '../services/app-storage.service';
import { USER_INFO } from '../app/app-constants';

const create = createAsyncThunk('accidents', async (props: AccidentsProps) => {
    const response = await AccidentsRequest.creatAccident(props);
    return response;
});

const createUrgent = createAsyncThunk('accidents/Urgent', async (props: AccidentsProps) => {
    const response = await AccidentsRequest.creatUrgentAccident(props);
    return response;
});
const getAllAccidents = createAsyncThunk('getAllAccidents', async () => {
    const response = await AccidentsRequest.getAllAccident();
    return response;
});

const getHistoryAccident = createAsyncThunk('getHistoryAccident', async () => {
    const response = await AccidentsRequest.getViewHistoryAccident();
    await AppStorage.setItem(USER_INFO, response);
    return response;
});

export const accidentsActions = {
    create,
    createUrgent,
    getAllAccidents,
    getHistoryAccident,
};
