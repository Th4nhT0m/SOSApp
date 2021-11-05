import { axiosInstance } from '../axios-config.service';
import { UrgentProps, AccidentsProps } from './types';

async function creatAccident(props: AccidentsProps) {
    return await axiosInstance.post('/accidents', { ...props }).catch((error) => {
        return error;
    });
}
async function creatUrgentAccident(props: UrgentProps) {
    return await axiosInstance.post('/accidents/Urgent', { ...props }).catch((error) => {
        return error;
    });
}
async function getAllAccident() {
    return await axiosInstance.get('/accidents').catch((error) => {
        return error;
    });
}

export const AccidentsRequest = {
    creatAccident,
    creatUrgentAccident,
    getAllAccident,
};
