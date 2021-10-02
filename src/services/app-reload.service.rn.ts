import { NativeModules } from 'react-native';

const reload = (): void => {
    NativeModules.DevMenu.reload();
};

export const AppReloadService = {
    reload,
};
