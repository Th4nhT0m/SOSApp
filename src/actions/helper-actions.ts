import { createAsyncThunk } from '@reduxjs/toolkit';
import { HelpProps, PatchHelper } from '../services/requests/types';
import { helperRequest } from '../services/requests/helper';

const createHelper = createAsyncThunk('createHelper', async (props: HelpProps) => {
    const response = await helperRequest.createHelper(props);
    return response;
});

const patchHelper = createAsyncThunk('patchHelper', async ({ id, props }: { id: string; props: PatchHelper }) => {
    const response = await helperRequest.patchHelper(id, props);
    return response;
});
const deleteHelper = createAsyncThunk('deleteHelper', async (id: string) => {
    const response = await helperRequest.deleteHelper(id);
    return response;
});
const getAllHelper = createAsyncThunk('getAllHelper', async () => {
    const response = await helperRequest.getAllHelper();
    return response;
});

const getHelperByIDAccident = createAsyncThunk('getAllHelperByID', async (id: string) => {
    const response = await helperRequest.getHelperByIDAccident(id);
    return response;
});

const getMyHistoryHelper = createAsyncThunk('getMyHistoryHelper', async () => {
    const response = await helperRequest.getHelpByUserId();
    return response;
});
export const HelperAction = {
    createHelper,
    patchHelper,
    deleteHelper,
    getAllHelper,
    getHelperByIDAccident,
    getMyHistoryHelper,
};
