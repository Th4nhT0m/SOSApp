import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccidentsRequest } from '../services/requests/accidents';
import { AccidentsProps } from '../services/requests/types';

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

export const accidentsActions = {
    create,
    createUrgent,
    getAllAccidents,
};
