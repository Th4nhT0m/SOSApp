import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccidentsRequest } from '../services/requests/accidents';
import { AccidentsProps, AccidentsPatch } from '../services/requests/types';
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
const patchAllAccident = createAsyncThunk(
    'patchAccident',
    async ({ id, props }: { id: string; props: AccidentsPatch }) => {
        const response = await AccidentsRequest.patchAccident(id, props);
        return response;
    }
);

const getAccidentByID = createAsyncThunk('getAccidentByID', async (id: string) => {
    const response = await AccidentsRequest.getAccidentById(id);
    return response;
});

export const accidentsActions = {
    create,
    createUrgent,
    getAllAccidents,
    getHistoryAccident,
    getAccidentByID,
    patchAllAccident,
};
