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
import PushNotification, { Importance } from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { ArrowForwardIconOutLineLeftSide } from '../handbook/viewHandbookById/axtra/incons';


const Notification = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const socket = io('http://192.168.1.6:3000');
    const { location } = useCurrentGPSPosition();
    const setAccidents = useAppSelector((state) => state.accidents.dateList.results);
    const getUser = useAppSelector((state) => state.users.currentUser.id);
    const nullAccident: Accidents[] = [];
    const [acc, setAcc] = React.useState(nullAccident);

    React.useEffect(() => {
        dispatch(accidentsActions.getAllAccidents());
        //    socket.on('getAccidents', (Accidents) => {
        //             console.log('-----------------');
        //             console.log(Accidents);
        //    });
        socket.emit('forceDisconnect');
        //setAcc(setAccidents.results);
        socket.emit('stop', getUser);
    }, [dispatch, socket]);

    let notifies: Accidents[] = setAccidents.map((pops) => ({
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

    PushNotification.configure({
        onRegister: function (token: any) {
            console.log('TOKEN:', token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification: { finish: (arg0: any) => void }) {
            console.log('NOTIFICATION:', notification);

            // process the notification
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

    const createChannels = (channelId: any) => {
        PushNotification.createChannel({
            channelId: channelId, // (required)
            channelName: 'My channel', // (required)
            channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        });
    };

    const handleNotification = (channelId: any, options: any) => {
        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: channelId,
            largeIcon: 'ic_launcher',
            bigText: 'Accident',
            largeIconUrl: 'https://cdn-icons-png.flaticon.com/512/1476/1476799.png',
            bigLargeIcon: 'https://cdn-icons-png.flaticon.com/512/1476/1476799.png',
            bigPictureUrl: options.bigImage,
            bigLargeIconUrl: 'https://cdn-icons-png.flaticon.com/512/1476/1476799.png', // (optional) default: undefined
            color: 'red',
            vibrate: true,
            vibration: 300,
            priority: 'high',
            title: 'Notification accident',
            message: 'Got into an accident and need your help',
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
                        socket.emit('forceDisconnect');
                        onDetailProgress();
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

    const onBackButtonPress = (): void => {
        Alert.alert('Confirm help', 'Are you sure you got help?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    socket.emit('forceDisconnect');
                    navigation &&
                        navigation.navigate('Home', {
                            screen: 'Dashboard',
                            params: { screen: 'DashboardHome' },
                        });
                },
            },
        ]);
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
                onPress={() => {
                    setOnAccidents(info.item?.id, info.item?.latitude, info.item?.longitude);
                    //handleNotification
                }}
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
            <Button
                style={styles.backButton}
                appearance="ghost"
                status="control"
                size="giant"
                accessoryLeft={ArrowForwardIconOutLineLeftSide}
                onPress={onBackButtonPress}
            >
                Back
            </Button>
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
        </View>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    backButton: {
        maxWidth: 90,
        paddingHorizontal: 0,
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
