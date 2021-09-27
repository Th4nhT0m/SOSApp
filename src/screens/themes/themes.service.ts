import { Mapping, Theme } from '../../services/theme.service';
import { ThemeItem } from './type';

export class ThemesService {
    static createThemeListItems = (
        themes: { [x: string]: {} | { [x: string]: any } },
        mapping: Mapping
    ): ThemeItem[] => {
        return Object.keys(themes[mapping])
            .filter((key) => key !== 'brand')
            .map((theme: Theme) => ThemesService.createThemeForMapping(themes, mapping, theme));
    };

    static createThemeForMapping = (
        themes: { [x: string]: { [x: string]: any } },
        mapping: Mapping,
        theme: Theme
    ): ThemeItem => {
        return {
            mapping: mapping,
            name: theme,
            theme: themes[mapping][theme],
        };
    };
}
