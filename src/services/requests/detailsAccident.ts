import { axiosInstance } from '../axios-config.service';
import { DetailAccidentsProps } from './types';

async function creatDetailsAccidents(props: DetailAccidentsProps) {
    return await axiosInstance.post('/detailsAccidents', { ...props }).catch((error) => {
        return error;
    });
}
export const DetailsAccidentsRequest = {
    creatDetailsAccidents,
};
