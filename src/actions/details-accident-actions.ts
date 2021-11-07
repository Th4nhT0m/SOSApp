import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailsAccidentsRequest } from '../services/requests/detailsAccident';
import { DetailAccidentsProps, patchDetailProps } from '../services/requests/types';

const creatDetails = createAsyncThunk('detailsAccident', async (props: DetailAccidentsProps) => {
    const response = await DetailsAccidentsRequest.creatDetailsAccidents(props);
    return response;
});

const getDetails = createAsyncThunk('getDetailsAccident', async (id: string) => {
    const response = await DetailsAccidentsRequest.getDetailsAccidents(id);
    return response;
});
const patchDetails = createAsyncThunk(
    'patchDetailsAccident',
    async ({ id, props }: { id: string; props: patchDetailProps }) => {
        const response = await DetailsAccidentsRequest.patchDetailsAccident(id, props);
        return response;
    }
);
const deleteDetails = createAsyncThunk('deleteDetailsAccident', async (id: string) => {
    const response = await DetailsAccidentsRequest.deleteDetailsAccident(id);
    return response;
});

export const DetailAccidentsAction = {
    creatDetails,
    getDetails,
    patchDetails,
    deleteDetails,
};
