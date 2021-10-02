import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppStorage } from './app-storage.service';
import { AuthRequest } from './requests/authentication';

export const axiosInstance = axios.create({
    baseURL: 'localhost:3000',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        let token: string;
        AppStorage.getItem('token').then((result) => {
            token = result.data;
            if (token.length > 0) {
                return {
                    ...config,
                    Authorization: 'Bearer ' + token,
                };
            }
            return config;
        });
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const { status, data } = response;

        if (status === 401) {
            return AuthRequest.refreshToken().then((res: any) => {
                const { token } = res.data;
                AppStorage.setItem('token', token);
            });
        }

        return data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        // if (typeof error === "string")

        return Promise.reject(error);
    }
);
