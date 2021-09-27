import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { appMappings, appThemes } from './app-theming';
import { Mapping, Theme, useThemingService } from '../services/theme.service';
import { AppStorage } from '../services/app-storage.service';
import { AppearanceProvider } from 'react-native-appearance';
import { AppLoading, Task } from './app-loading';
import RNBootSplash from 'react-native-bootsplash';
import { AppNavigator } from '../navigation/app.navigator';
import { StatusBar } from '../components/status-bar.component';

const loadingTasks: Task[] = [
    (): any => AppStorage.getMapping(defaultConfig.mapping).then((result) => ['mapping', result]),
    (): any => AppStorage.getTheme(defaultConfig.theme).then((result) => ['theme', result]),
];

const defaultConfig: { mapping: Mapping; theme: Theme } = {
    mapping: 'eva',
    theme: 'dark',
};

const AppContainer: React.FC<{ mapping: Mapping; theme: Theme }> = ({ mapping, theme }) => {
    const { useMapping, useTheming, MappingContext, ThemeContext } = useThemingService();

    const [mappingContext, currentMapping] = useMapping(appMappings, mapping);
    const [themeContext, currentTheme] = useTheming(appThemes, mapping, theme);

    return (
        <>
            <IconRegistry icons={[EvaIconsPack]} />
            <AppearanceProvider>
                <ApplicationProvider {...currentMapping} theme={currentTheme}>
                    <MappingContext.Provider value={mappingContext}>
                        <ThemeContext.Provider value={themeContext}>
                            <SafeAreaProvider>
                                <StatusBar />
                                <AppNavigator />
                            </SafeAreaProvider>
                        </ThemeContext.Provider>
                    </MappingContext.Provider>
                </ApplicationProvider>
            </AppearanceProvider>
        </>
    );
};

const App = (): React.ReactElement => {
    const [loading, setLoading] = React.useState(true);

    const handleFinish = () => {
        RNBootSplash.hide({ fade: true }).then(() => setLoading(false));
    };

    return (
        <AppLoading tasks={loadingTasks} initialConfig={defaultConfig} loading={loading} onTasksFinish={handleFinish}>
            {(props) => <AppContainer {...props} />}
        </AppLoading>
    );
};

export default App;
