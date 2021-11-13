import { axiosInstance } from '../axios-config.service';

async function getAllHandbook() {
    return await axiosInstance.get('/handbooks').catch((error) => {
        return error;
    });
}

export const handbookRequest = {
    getAllHandbook,
};
