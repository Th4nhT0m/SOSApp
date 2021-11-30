import { axiosInstance } from '../axios-config.service';
import { DetailAccidentsProps, patchDetailProps } from './types';

async function creatDetailsAccidents(props: DetailAccidentsProps) {
    return await axiosInstance.post('/detailsAccidents', { ...props }).catch((error) => {
        return error;
    });
}
async function getDetailsAccidents(id: string) {
    return await axiosInstance.get(`/detailsAccidents/${id}`).catch((error) => error);
}

async function patchDetailsAccident(id: string, props: patchDetailProps) {
    return await axiosInstance.patch(`/detailsAccidents/${id}`, { ...props }).catch((error) => error);
}
async function deleteDetailsAccident(id: string) {
    return await axiosInstance.delete(`/detailsAccidents/${id}`).catch((error) => error);
}

export const DetailsAccidentsRequest = {
    creatDetailsAccidents,
    getDetailsAccidents,
    patchDetailsAccident,
    deleteDetailsAccident,
};
