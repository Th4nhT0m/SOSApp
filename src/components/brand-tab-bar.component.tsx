import React from 'react';
import { TabBar, TabBarProps, ThemeProvider } from '@ui-kitten/components';
import { useThemingService } from '../services/theme.service';

export const BrandTabBar = (props: TabBarProps): React.ReactElement => {
    const { useTheme } = useThemingService();
    const brandTheme = useTheme('brand');

    return (
        <ThemeProvider theme={brandTheme}>
            <TabBar {...props} />
        </ThemeProvider>
    );
};
