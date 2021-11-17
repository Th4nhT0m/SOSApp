import { axiosInstance } from '../axios-config.service';
import { HelpProps, PatchHelper } from './types';

async function createHelper(props: HelpProps) {
    return await axiosInstance.post('/helpers', { ...props }).catch((error) => {
        return error;
    });
}

async function patchHelper(id: string, props: PatchHelper) {
    return await axiosInstance.patch(`/helpers/${id}`, { ...props }).catch((error) => {
        return error;
    });
}

async function deleteHelper(id: string) {
    return await axiosInstance.delete(`/helpers/${id}`).catch((error) => {
        return error;
    });
}

async function getAllHelper() {
    return await axiosInstance.get('/helpers').catch((error) => {
        return error;
    });
}

async function getHelperByIDAccident(id: string) {
    return await axiosInstance.get(`helpers/accidentID?accident=${id}`).catch((error) => {
        return error;
    });
}

async function getHelpByUserId() {
    return await axiosInstance.get('/helpers/myHelper').catch((error) => {
        return error;
    });
}
export const helperRequest = {
    createHelper,
    patchHelper,
    deleteHelper,
    getAllHelper,
    getHelpByUserId,
    getHelperByIDAccident,
};
