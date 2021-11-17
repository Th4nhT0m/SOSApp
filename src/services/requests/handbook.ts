import { axiosInstance } from '../axios-config.service';

async function getAllHandbook() {
    return await axiosInstance.get('/handbooks').catch((error) => {
        return error;
    });
}

async function getHandbook(id: string) {
    return await axiosInstance.get(`/handbooks/${id}`).catch((error) => error);
}

export const handbookRequest = {
    getAllHandbook,
    getHandbook,
};
