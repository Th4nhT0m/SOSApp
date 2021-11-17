import { createAsyncThunk } from '@reduxjs/toolkit';
import { HelpProps, PatchHelper } from '../services/requests/types';
import { heplerRequest } from '../services/requests/helper';

const createHelper = createAsyncThunk('createHelper', async (props: HelpProps) => {
    const response = await heplerRequest.createHelper(props);
    return response;
});

const patchHelper = createAsyncThunk('patchHelper', async ({ id, props }: { id: string; props: PatchHelper }) => {
    const response = await heplerRequest.patchHelper(id, props);
    return response;
});
const deleteHelper = createAsyncThunk('deleteHelper', async (id: string) => {
    const response = await heplerRequest.deleteHelper(id);
    return response;
});
const getAllHelper = createAsyncThunk('getAllHelper', async () => {
    const response = await heplerRequest.getAllHelper();
    return response;
});

const getMyHistoryHelper = createAsyncThunk('getMyHistoryHelper', async () => {
    const response = await heplerRequest.getHelpByUserId();
    return response;
});

export const HelperAction = {
    createHelper,
    patchHelper,
    deleteHelper,
    getAllHelper,
    getMyHistoryHelper,
};
