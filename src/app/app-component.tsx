import React from 'react';
import Toast from 'react-native-toast-message';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { appMappings, appThemes } from './app-theming';
import { Mapping, Theme, Theming } from '../services/theme.service';
import { AppStorage } from '../services/app-storage.service';
import { AppearanceProvider } from 'react-native-appearance';
import { AppLoading, Task } from './app-loading';
import RNBootSplash from 'react-native-bootsplash';
import { AppNavigator } from '../navigation/app.navigator';
import { StatusBar } from '../components/status-bar.component';
import { Provider } from 'react-redux';
import { store } from './store-provider';

const loadingTasks: Task[] = [
    (): any => AppStorage.getMapping(defaultConfig.mapping).then((result) => ['mapping', result]),
    (): any => AppStorage.getTheme(defaultConfig.theme).then((result) => ['theme', result]),
];

const defaultConfig: { mapping: Mapping; theme: Theme } = {
    mapping: 'eva',
    theme: 'brand',
};

const AppContainer: React.FC<{ mapping: Mapping; theme: Theme }> = ({ mapping, theme }) => {
    const [mappingContext, currentMapping] = Theming.useMapping(appMappings, mapping);
    const [themeContext, currentTheme] = Theming.useTheming(appThemes, mapping, theme);

    return (
        <React.Fragment>
            <IconRegistry icons={[EvaIconsPack]} />
            <AppearanceProvider>
                <ApplicationProvider {...currentMapping} theme={currentTheme}>
                    <Theming.MappingContext.Provider value={mappingContext}>
                        <Theming.ThemeContext.Provider value={themeContext}>
                            <SafeAreaProvider>
                                <StatusBar />
                                <AppNavigator />
                                <Toast ref={(ref) => Toast.setRef(ref)} />
                            </SafeAreaProvider>
                        </Theming.ThemeContext.Provider>
                    </Theming.MappingContext.Provider>
                </ApplicationProvider>
            </AppearanceProvider>
        </React.Fragment>
    );
};

const App = (): React.ReactElement => {
    const [loading, setLoading] = React.useState(true);

    const handleFinish = () => {
        RNBootSplash.hide({ fade: true }).then(() => setLoading(false));
    };

    return (
        <Provider store={store}>
            <AppLoading
                tasks={loadingTasks}
                initialConfig={defaultConfig}
                loading={loading}
                onTasksFinish={handleFinish}
            >
                {(props) => <AppContainer {...props} />}
            </AppLoading>
        </Provider>
    );
};

export default App;
