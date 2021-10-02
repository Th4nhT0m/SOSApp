import * as eva from '@eva-design/eva';
import * as material from '@eva-design/material';
import { default as customEva } from './configs/app-mapping-eva.json';
import { default as customMaterial } from './configs/app-mapping-material.json';
import { default as appTheme } from './configs/app-theme.json';
import { greenie } from './themes';

export const appMappings = {
    eva: {
        mapping: eva.mapping,
        customMapping: customEva,
    },
    material: {
        mapping: material.mapping,
        customMapping: customMaterial,
    },
};

export const appThemes = {
    eva: {
        light: greenie.light,
        dark: greenie.dark,
        brand: {
            light: appTheme,
            dark: appTheme,
        },
    },
    material: {
        light: material.light,
        dark: material.dark,
        brand: {
            light: {},
            dark: {},
        },
    },
};
