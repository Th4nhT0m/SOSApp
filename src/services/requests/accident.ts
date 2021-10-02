import { axiosInstance } from '../axios-config.service';

const postAccident = () => {
    return axiosInstance.post('/accident', {

    });
}