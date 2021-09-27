import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mapping, Theme } from './theme.service';

const MAPPING_KEY: string = 'mapping';
const THEME_KEY: string = 'theme';

export class AppStorage {
    static getMapping = (fallback?: Mapping): Promise<Mapping> => {
        return AsyncStorage.getItem(MAPPING_KEY).then((mapping: Mapping | any) => {
            return mapping || fallback;
        });
    };

    static getTheme = (fallback?: Theme): Promise<Theme> => {
        return AsyncStorage.getItem(THEME_KEY).then((theme: Theme | any) => {
            return theme || fallback;
        });
    };

    static setMapping = (mapping: Mapping): Promise<void> => {
        return AsyncStorage.setItem(MAPPING_KEY, <string>mapping);
    };

    static setTheme = (theme: Theme): Promise<void> => {
        return AsyncStorage.setItem(THEME_KEY, <string>theme);
    };
}
