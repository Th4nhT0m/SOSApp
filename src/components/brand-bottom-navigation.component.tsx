import React from 'react';
import { BottomNavigation, BottomNavigationProps, ThemeProvider } from '@ui-kitten/components';
import { useThemingService } from '../services/theme.service';

export const BrandBottomNavigation = (props: BottomNavigationProps): React.ReactElement => {
    const { useTheme } = useThemingService();
    const brandTheme = useTheme('brand');

    return (
        <ThemeProvider theme={brandTheme}>
            <BottomNavigation {...props} />
        </ThemeProvider>
    );
};
