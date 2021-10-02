import React from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { List, ThemeProvider, Toggle } from '@ui-kitten/components';
import { ThemeCard } from './theme-card.component';
import { MappingContextValue, ThemeContextValue, Theming } from '../../services/theme.service';
import { ThemesService } from './themes.service';
import { ThemeItem } from './type';
import { appThemes } from '../../app/app-theming';
import { RestartAppModal } from './restart-app-modal.component';

export const ThemesScreen = (): React.ReactElement => {
    const mappingContext: MappingContextValue = React.useContext(Theming.MappingContext);
    const themeContext: ThemeContextValue = React.useContext(Theming.ThemeContext);
    const [evaToggleChecked, setEvaToggleChecked] = React.useState<boolean>(mappingContext.isEva());
    const [restartModalVisible, setRestartModalVisible] = React.useState<boolean>(false);

    const themes: ThemeItem[] = ThemesService.createThemeListItems(appThemes, mappingContext.currentMapping);

    const onEvaToggleCheckedChange = (checked: boolean): void => {
        setEvaToggleChecked(checked);
        setRestartModalVisible(true);
        mappingContext.setCurrentMapping(checked ? 'eva' : 'material');
    };

    const onItemPress = (info: ListRenderItemInfo<ThemeItem>): void => {
        themeContext.setCurrentTheme(info.item.name);
    };

    const isActiveTheme = (theme: ThemeItem): boolean => {
        return mappingContext.currentMapping === theme.mapping && themeContext.currentTheme === theme.name;
    };

    const shouldDisableItem = (theme: ThemeItem): boolean => {
        return themeContext.currentTheme === theme.name;
    };

    const createThemeNameForItem = (theme: ThemeItem): string => {
        return `${theme.mapping} ${theme.name}`.toUpperCase();
    };

    const toggleRestartModal = (): void => {
        setRestartModalVisible(!restartModalVisible);
    };

    const renderItem = (info: ListRenderItemInfo<ThemeItem>): React.ReactElement => (
        <ThemeProvider theme={info.item.theme}>
            <ThemeCard
                style={styles.item}
                title={createThemeNameForItem(info.item)}
                isActive={isActiveTheme(info.item)}
                disabled={shouldDisableItem(info.item)}
                onPress={() => onItemPress(info)}
            />
        </ThemeProvider>
    );

    const renderFooter = (): React.ReactElement => (
        <Toggle style={styles.evaToggle} checked={evaToggleChecked} onChange={onEvaToggleCheckedChange}>
            Eva Design System
        </Toggle>
    );

    return (
        <View style={styles.container}>
            <List
                // contentContainerStyle={styles.container}
                data={themes}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
            />
            <RestartAppModal
                visible={restartModalVisible}
                onBackdropPress={toggleRestartModal}
                onGotItButtonPress={toggleRestartModal}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 5,
    },
    item: {
        margin: 8,
    },
    evaToggle: {
        margin: 8,
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
});
