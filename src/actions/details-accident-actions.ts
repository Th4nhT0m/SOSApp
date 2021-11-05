import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailsAccidentsRequest } from '../services/requests/detailsAccident';
import { DetailAccidentsProps } from '../services/requests/types';

const creatDetails = createAsyncThunk('detailsAccident', async (props: DetailAccidentsProps) => {
    const response = await DetailsAccidentsRequest.creatDetailsAccidents(props);
    return response;
});

export const DetailAccidentsAction = {
    creatDetails,
};
