import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccidentsRequest } from '../services/requests/accidents';
import { AccidentsProps, AccidentsPatch, Accidents } from '../services/requests/types';
import { AppStorage } from '../services/app-storage.service';
import { USER_INFO } from '../app/app-constants';
import { ListResponse } from '../models/common';

const create = createAsyncThunk('accidents', async (props: AccidentsProps) => {
    const response = await AccidentsRequest.creatAccident(props);
    return response;
});

interface AccidentSocket {
    onCreateAccident: (data: Accidents) => void;
    data: AccidentsProps;
}
const createUrgent = createAsyncThunk<Accidents, AccidentSocket>('accidents/Urgent', async (props) => {
    const response = await AccidentsRequest.creatUrgentAccident(props.data);
    props.onCreateAccident(response);
    return response;
});

interface AccidentSocketProps {
    onGetAccident: (data: ListResponse<Accidents>) => void;
}
const getAllAccidents = createAsyncThunk<ListResponse<Accidents>, AccidentSocketProps>(
    'getAllAccidents',
    async (props) => {
        const response = await AccidentsRequest.getAllAccident();
        props.onGetAccident(response);
        return response;
    }
);

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

interface AccidentByIDSocket {
    onCreateAccident: (data: Accidents) => void;
    data: string;
}
const getAccidentByID = createAsyncThunk<Accidents, AccidentByIDSocket>('getAccidentByID', async (pops) => {
    const response = await AccidentsRequest.getAccidentById(pops.data);
    pops.onCreateAccident(response);
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
