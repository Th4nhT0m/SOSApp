import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppStorage } from './app-storage.service';
import { TokenProps } from '../slices/auth-slice';
import Toast from 'react-native-toast-message';

export const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.9:5000/v1',
    timeout: 30000,
    headers: {
        accept: '*/*',
        contentType: 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    },
});

async function getLocalRefreshToken() {
    const tokens: TokenProps = await AppStorage.getItem('tokens').catch((error) => {
        console.log(error);
    });
    return tokens?.refresh?.token ?? '';
}

async function refreshToken() {
    return axiosInstance
        .post('/auth/refresh-tokens', {
            refreshToken: getLocalRefreshToken(),
        })
        .catch((error) => {
            return error;
        });
}

export const authHeader = async () => {
    let token: string;
    const result: TokenProps = await AppStorage.getItem('tokens');
    token = (result && result.access?.token) ?? '';
    if (token.length > 0) {
        return {
            Authorization: 'Bearer ' + token,
        };
    }
    return {};
};

axiosInstance.interceptors.request.use(
    async function (config: AxiosRequestConfig) {
        const headers = await authHeader();
        return { ...config, headers };
    },
    function (error) {
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Hello',
            text2: error.message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
        if (!error.status) {
            console.log('Request: ', error);
        } else {
            return Promise.reject(error);
        }
    }
);
axiosInstance.interceptors.response.use(
    async function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const { data } = response;
        return data;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error Message',
            text2: error.response.data.message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
        if (!error.status) {
            console.log('Response: ', error);
        } else {
            const { status } = error;
            if (status === 401) {
                return await refreshToken().then(async (res: TokenProps) => {
                    await AppStorage.setItem('tokens', res ?? {});
                });
            }
            return Promise.reject(error);
        }
    }
);
