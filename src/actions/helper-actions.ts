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

export const HelperAction = {
    createHelper,
    patchHelper,
    deleteHelper,
    getAllHelper,
};
