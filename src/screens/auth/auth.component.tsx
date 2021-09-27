import React from 'react';
import { Tab, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { BrandTabBar } from '../../components/brand-tab-bar.component';
import { ArrowIosBackIcon, GridIcon, ListIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout';

export const AuthScreen = ({ navigation, state }: any): React.ReactElement => {
    const onTabSelect = (index: number): void => {
        navigation.navigate(state.routeNames[index]);
    };

    const renderBackAction = (): React.ReactElement => (
        <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
    );

    return (
        <SafeAreaLayout insets="top">
            <TopNavigation title="Auth" accessoryLeft={renderBackAction} />
            <BrandTabBar selectedIndex={state.index} onSelect={onTabSelect}>
                <Tab icon={GridIcon} />
                <Tab icon={ListIcon} />
            </BrandTabBar>
        </SafeAreaLayout>
    );
};
