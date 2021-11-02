import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersRequests } from '../services/requests/user';
import { UserInfo } from '../models/user-info.model';
import { AppStorage } from '../services/app-storage.service';
import { USER_INFO } from '../app/app-constants';
import { EditUserProps } from '../services/requests/types';

const getCurrentUserInfo = createAsyncThunk('users/currentInfo', async () => {
    const response = await UsersRequests.getCurrentUserInfo();
    await AppStorage.setItem(USER_INFO, response);
    return response as UserInfo;
});

interface UserInfoProps {
    id: string;
}
const getUserInfo = createAsyncThunk('users/userInfo', async (props: UserInfoProps) => {
    const response = await UsersRequests.getUserInfo(props.id);
    return response as UserInfo;
});

// view info user
const getViewUserInfo = createAsyncThunk('/users/me', async () => {
    const response = await UsersRequests.getViewUserInfo();
    await AppStorage.setItem(USER_INFO, response);
    return response as UserInfo;
});

// update user
const updateUserInfo = createAsyncThunk('/users/update', async (props: EditUserProps) => {
    const response = await UsersRequests.updateUserInfo(props);
    return response as UserInfo;
});

export const usersActions = {
    getCurrentUserInfo,
    getUserInfo,
    getViewUserInfo,
    updateUserInfo,
};
