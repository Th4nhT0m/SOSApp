import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersRequests } from '../services/requests/user';
import { UserInfo } from '../models/user-info.model';
import { AppStorage } from '../services/app-storage.service';
import { USER_INFO } from '../app/app-constants';

const getCurrentUserInfo = createAsyncThunk('users/currentInfo', async () => {
    const response = await UsersRequests.getCurrentUserInfo();
    await AppStorage.setItem(USER_INFO, response);
    return response as unknown as UserInfo;
});
interface UserInfoProps {
    id: string;
}
const getUserInfo = createAsyncThunk('users/userInfo', async (props: UserInfoProps) => {
    const response = await UsersRequests.getUserInfo(props.id);
    return response as UserInfo;
});

export const usersActions = {
    getCurrentUserInfo,
    getUserInfo,
};
