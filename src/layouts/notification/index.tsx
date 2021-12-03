import React from 'react';
import { Avatar, Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Alert, Dimensions, ListRenderItemInfo, Platform, View } from 'react-native';
import { DoneAllIcon } from '../../components/Icons';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../services/hooks';
import { accidentsActions } from '../../actions/accidents-ations';
import { Accidents } from '../../services/requests/types';
import getDistance from 'geolib/es/getPreciseDistance';
import { HelperAction } from '../../actions/helper-actions';
import moment from 'moment';
import { io } from 'socket.io-client';
import PushNotification from 'react-native-push-notification';

const Notification = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();
    const socket = io('http://192.168.1.6:1945');
    const setAccidents = useAppSelector((state) => state.accidents.dateList);
    const getUser = useAppSelector((state) => state.users.currentUser.id);
    const nullAccident: Accidents[] = [];
    const [acc] = React.useState(nullAccident);
    React.useEffect(() => {
        // dispatch(accidentsActions.getAllAccidents());
        // // socket.on('getAccidents', (Accidents) => {
        // //     console.log('-----------------');
        // //     console.log(Accidents);
        // // });
        // socket.emit('forceDisconnect');
        // setAcc(setAccidents.results);
        // socket.emit('stop', getUser);
        notification();
        createChannels();
    }, [dispatch, socket]);

    let notifies: Accidents[] = acc.map((pops) => ({
        id: pops.id,
        nameAccident: pops.nameAccident,
        description: pops.description,
        latitude: pops.latitude,
        longitude: pops.longitude,
        created_by: pops.created_by,
        modified_by: pops.modified_by,
        accidentType: pops.accidentType,
        status: pops.status,
        createTime: pops.createTime,
        UpdateTime: pops.UpdateTime,
    }));

    notifies = notifies
        .filter(function (item) {
            return item.status === 'Waiting' && item.created_by?.id !== getUser;
        })
        .map(function ({
            id,
            nameAccident,
            description,
            latitude,
            longitude,
            created_by,
            modified_by,
            accidentType,
            status,
            createTime,
            UpdateTime,
        }) {
            return {
                id,
                nameAccident,
                description,
                latitude,
                longitude,
                created_by,
                modified_by,
                accidentType,
                status,
                createTime,
                UpdateTime,
            };
        });

    const notification = () => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token: any) {
                console.log('TOKEN:', token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification: { finish: (arg0: any) => void }) {
                console.log('NOTIFICATION:', notification);

                // process the notification

                // (required) Called when a remote is received or opened, or local notification is opened
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification: { action: any }) {
                console.log('ACTION:', notification.action);
                console.log('NOTIFICATION:', notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err: { message: any }) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: Platform.OS === 'ios',
        });
    };

    const createChannels = () => {
        PushNotification.createChannel({
            channelId: 'accidents-notification',
            channelName: 'accidentNotification',
        });
    };

    const handleNotification = () => {
        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: 'accidents-notification',
            title: 'Notification accident',
            message: 'Got into an accident and need your help',
            largeIconUrl: 'https://reactjs.org/logo-og.png',
        });
    };

    const setOnAccidents = (id: string, latitude: string, longitude: string): void => {
        Alert.alert('Confirm help', 'Do you want to help?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    if (location != undefined) {
                        console.log(latitude + ' ' + longitude);
                        dispatch(
                            HelperAction.createHelper({
                                accident: id,
                                user: getUser,
                                accidentLatitude: latitude,
                                accidentLongitude: longitude,
                                helperLatitude: String(location.coords.latitude),
                                helperLongitude: String(location.coords.longitude),
                            })
                        );
                        onDetailProgress();
                        notifies = [];
                    }
                },
            },
        ]);
    };
    //
    const calculateDistance = (latitude: string, longitude: string) => {
        if (location !== undefined) {
            const dis = getDistance(
                { latitude: Number(latitude), longitude: Number(longitude) },
                { latitude: location.coords.latitude, longitude: location.coords.longitude }
            );
            return dis;
        } else {
            return 0;
        }
    };

    const onDetailProgress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Notification',
                params: { screen: 'DetailProgress' },
            });
        console.log('Susses');
    };

    const renderItemFooter = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <View style={styles.itemFooter}>
            <Text category="s1">
                {'Distance: ' + calculateDistance(info.item?.latitude, info.item?.longitude) / 1000 + ' KM'}
            </Text>
            <Button
                style={styles.iconButton}
                size="small"
                accessoryLeft={DoneAllIcon}
                onPress={
                    // setOnAccidents(info.item?.id, info.item?.latitude, info.item?.longitude);
                    handleNotification
                }
                // onPress={onDetailProgress}
            />
        </View>
    );

    const renderNotifies = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <Card style={styles.list} footer={() => renderItemFooter(info)}>
            <View style={styles.itemHeader}>
                <Avatar size="giant" source={require('../../assets/images/icon-avatar.png')} />
                <View style={styles.name}>
                    <Text category="s1">{'User name: ' + info.item?.created_by?.name}</Text>
                    <Text category="s1">
                        {'Time: ' + moment(info.item?.createTime).format('DD/MM/YYYY hh:mm:ss a')}
                    </Text>
                </View>
            </View>
            <Divider />
            <Text style={{ marginTop: 15 }}>{'Name accident: ' + info.item?.nameAccident}</Text>
            <Text style={{ marginTop: 15 }}>{'Status: ' + info.item?.status}</Text>
            <Text style={{ marginTop: 15 }}>{'Description: ' + info.item?.description}</Text>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h3">
                    List Accident
                </Text>
                <Divider style={styles.divider} />
            </View>

            <List
                contentContainerStyle={styles.notifyList}
                data={notifies}
                numColumns={1}
                renderItem={renderNotifies}
            />

            <Button
                style={styles.iconButton}
                onPress={handleNotification}
                // onPress={onDetailProgress}
            />
        </View>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    orLabel: {
        marginHorizontal: 8,
    },
    notifyList: {
        paddingHorizontal: 8,
        paddingVertical: 16,
        marginTop: 10,
    },
    divider: {
        flex: 1,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 20,
    },
    productItem: {
        flex: 1,
        margin: 8,
        maxWidth: Dimensions.get('window').width / 2 - 24,
        backgroundColor: 'background-basic-color-1',
    },
    itemHeader: {
        height: 80,
        padding: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    list: {
        marginTop: 30,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    itemPhone: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        left: 10,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    iconPhone: {
        paddingHorizontal: 0,
        // marginHorizontal: 155,
        left: 20,
    },
});

export default Notification;
