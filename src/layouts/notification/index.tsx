import React from 'react';
import { Avatar, Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Dimensions, ListRenderItemInfo, View } from 'react-native';
import { NotificationProps } from '../../screens/notification/types';
import { DoneAllIcon } from '../../components/Icons';
// @ts-ignore
import moment from 'moment';
import * as faker from 'faker';

const Notification = (): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);

    const notifies: NotificationProps[] = [...Array(5)].map(() => ({
        avatar: require('../../assets/images/icon-avatar.png'),
        contents: faker.lorem.lines(2),
        date: new Date(2020, 10, 15),
        firstName: faker.name.firstName(),
        title: faker.name.title(),
        lastName: faker.name.lastName(),
    }));

    const renderItemFooter = (info: ListRenderItemInfo<NotificationProps>): React.ReactElement => (
        <View style={styles.itemFooter}>
            <Text category="s1">{moment(info.item?.date).fromNow()}</Text>
            <Button style={styles.iconButton} size="small" accessoryLeft={DoneAllIcon} />
        </View>
    );

    const renderNotifies = (info: ListRenderItemInfo<NotificationProps>): React.ReactElement => (
        <Card footer={() => renderItemFooter(info)}>
            <View style={styles.itemHeader}>
                <Avatar size="giant" source={require('../../assets/images/icon-avatar.png')} />
                <View>
                    <Text category="s2">{info.item?.firstName + ' ' + info.item?.lastName}</Text>
                    <Text category="s1">{info.item?.title}</Text>
                </View>
            </View>
            <Divider />
            <Text style={{ marginTop: 15 }}>{info.item?.contents}</Text>
        </Card>
    );

    return (
        <List contentContainerStyle={styles.notifyList} data={notifies} numColumns={1} renderItem={renderNotifies} />
    );
};
const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    notifyList: {
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    productItem: {
        flex: 1,
        margin: 8,
        maxWidth: Dimensions.get('window').width / 2 - 24,
        backgroundColor: 'background-basic-color-1',
    },
    itemHeader: {
        height: 80,
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
});

export default Notification;
