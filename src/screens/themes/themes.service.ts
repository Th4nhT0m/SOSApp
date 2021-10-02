import { Mapping, Theme } from '../../services/theme.service';
import { ThemeItem } from './type';

const createThemeForMapping = (themes: any, mapping: Mapping, theme: Theme): ThemeItem => {
    return {
        mapping: mapping,
        name: theme,
        theme: themes[mapping][theme],
    };
};

const createThemeListItems = (themes: any, mapping: Mapping): ThemeItem[] => {
    return Object.keys(themes[mapping] as any)
        .filter((key) => key !== 'brand')
        .map((theme: Theme) => createThemeForMapping(themes, mapping, theme));
};

export const ThemesService = {
    createThemeListItems,
    createThemeForMapping,
};
