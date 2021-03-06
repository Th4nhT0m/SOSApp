import React, { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Avatar,
    Divider,
    Drawer,
    DrawerElement,
    DrawerItem,
    Icon,
    IndexPath,
    Layout,
    Text,
} from '@ui-kitten/components';
import { AppInfoService } from '../../services/app-info.service.rn';
import { WebBrowserService } from '../../services/web-browser.service.rn';
import { SafeAreaLayout } from '../../components/safe-area-layout';

const version: string = AppInfoService.getVersion();

export const HomeDrawer = ({ navigation }: any): DrawerElement => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>({} as any);

    const DATA = [
        {
            title: 'Themes',
            icon: <Icon name="github" />,
            onPress: () => {
                navigation.toggleDrawer();
                navigation.navigate('Themes');
            },
        },
        {
            title: 'Settings',
            icon: <Icon name="github" />,
            onPress: () => {
                navigation.toggleDrawer();
                navigation.navigate('Authentication');
            },
        },
        {
            title: 'Documentation',
            icon: <Icon name="book" />,
            onPress: () => {
                WebBrowserService.openBrowserAsync('https://akveo.github.io/react-native-ui-kitten');
                navigation.toggleDrawer();
            },
        },
    ];

    const renderHeader = (): ReactElement => (
        <SafeAreaLayout insets="top" level="2">
            <Layout style={styles.header} level="2">
                <View style={styles.profileContainer}>
                    <Avatar size="giant" source={require('../../assets/images/image-app-icon.png')} />
                    <Text style={styles.profileName} category="h6">
                        Kitten Tricks
                    </Text>
                </View>
            </Layout>
        </SafeAreaLayout>
    );

    const renderFooter = () => (
        <SafeAreaLayout insets="bottom">
            <React.Fragment>
                <Divider />
                <View style={styles.footer}>
                    <Text>{`Version ${version}`}</Text>
                </View>
            </React.Fragment>
        </SafeAreaLayout>
    );

    return (
        <Drawer
            header={renderHeader}
            footer={renderFooter}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
        >
            {DATA.map((el, index) => (
                <DrawerItem key={index} title={el.title} onPress={el.onPress} accessoryLeft={el.icon} />
            ))}
        </Drawer>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        height: 128,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 16,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileName: {
        marginHorizontal: 16,
    },
});
