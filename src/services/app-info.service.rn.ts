import DeviceInfo from 'react-native-device-info';

const getVersion = (): string => {
    return DeviceInfo.getVersion();
};

const getBuildNumber = (): string => {
    return DeviceInfo.getBuildNumber();
};

export const AppInfoService = {
    getVersion,
    getBuildNumber,
};
