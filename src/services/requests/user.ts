import { axiosInstance } from '../axios-config.service';

async function getCurrentUserInfo() {
    return await axiosInstance.get('auth/me').catch((error) => error);
}

async function getUserInfo(id: string) {
    return await axiosInstance.get(`auth/users/${id}`).catch((error) => error);
}

export const UsersRequests = {
    getCurrentUserInfo,
    getUserInfo,
};
