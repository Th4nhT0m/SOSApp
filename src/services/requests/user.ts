import { axiosInstance } from '../axios-config.service';
import { EditUserProps } from './types';

async function getCurrentUserInfo() {
    return await axiosInstance.get('auth/me').catch((error) => error);
}

async function getUserInfo(id: string) {
    return await axiosInstance.get(`auth/users/${id}`).catch((error) => error);
}

// view user
async function getViewUserInfo() {
    return await axiosInstance.get('/users/me').catch((error) => error);
}

// update user
async function updateUserInfo(props: EditUserProps) {
    return await axiosInstance.patch('/users/update', { ...props }).catch((error) => {
        return error;
    });
}

export const UsersRequests = {
    getCurrentUserInfo,
    getUserInfo,
    updateUserInfo,
    getViewUserInfo,
};
