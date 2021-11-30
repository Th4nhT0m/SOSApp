import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavigationTab, Divider, StyleService } from '@ui-kitten/components';
import { BrandBottomNavigation } from '../../components/brand-bottom-navigation.component';
import { BellIcon, GridIcon, SettingIcon, HospitalLocationIcon, UtilitiesIcon } from '../../components/Icons';

export const HomeBottomNavigation: React.FC<BottomTabBarProps> = ({ navigation, state }) => {
    const handleSelect = (index: number) => {
        navigation.navigate(state.routeNames[index] as any);
    };

    return (
        <>
            <Divider style={styles.divider} />
            <BrandBottomNavigation
                indicatorStyle={styles.indicator}
                selectedIndex={state.index}
                onSelect={(index) => handleSelect(index)}
            >
                <BottomNavigationTab title="Dashboard" icon={GridIcon} />
                <BottomNavigationTab title="Notification" icon={BellIcon} />
                <BottomNavigationTab title="Utilities" icon={UtilitiesIcon} />
                <BottomNavigationTab title="Settings" icon={SettingIcon} />
            </BrandBottomNavigation>
        </>
    );
};

const styles = StyleService.create({
    divider: {
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
    },
    indicator: { borderRadius: 5, animation: 'jello-horizontal 0.5s both' },
});
