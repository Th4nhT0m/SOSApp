import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccidentsRequest } from '../services/requests/accidents';
import { AccidentsPros } from '../services/requests/types';
import { UrgentPros } from '../services/requests/types';
import { urgentResponseProps } from '../slices/urgent-create';

const create = createAsyncThunk('accidents', async (props: AccidentsPros) => {
    const response = await AccidentsRequest.creatAccident(props);
    return response;
});

const createUrgent = createAsyncThunk('accidents/Urgent', async (props: UrgentPros) => {
    const response = await AccidentsRequest.creatUrgentAccident(props);
    return response as urgentResponseProps;
});

export const accidentsActions = {
    create,
    createUrgent,
};
