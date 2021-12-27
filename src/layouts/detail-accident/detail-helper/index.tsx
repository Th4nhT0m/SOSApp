import React, { useState } from 'react';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../../services/hooks';
import { Helpers } from '../../../services/requests/types';
import { HelperAction } from '../../../actions/helper-actions';
import { Alert, Dimensions, ListRenderItemInfo, View, Vibration, Image, Platform, RefreshControl } from 'react-native';
import { Button, Card, Divider, List, Modal, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { accidentsActions } from '../../../actions/accidents-ations';
import Torch from 'react-native-torch';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import PushNotification, { Importance } from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { io } from 'socket.io-client';
import getDistance from 'geolib/es/getPreciseDistance';
import { AirbnbRating } from 'react-native-ratings';
import { usersActions } from '../../../actions/user-actions';

const DetailHelper = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const styles = useStyleSheet(themedStyles);
    const { location } = useCurrentGPSPosition();
    const getAccidents = useAppSelector((state) => state.accidents.dataGet.id);
    const setHelper = useAppSelector((state) => state.helpersReducer.dateList);
    const socket = io('http://192.168.1.6:3000');
    const [modalVisible, setModalVisible] = useState(false);
    React.useEffect(() => {
        dispatch(HelperAction.getHelperByIDAccident(getAccidents));
    }, [dispatch, getAccidents, socket]);

    React.useEffect(() => {
        messaging()
            .getToken(firebase.app().options.messagingSenderId)
            .then((token) => {
                console.log('token', token);
            });

        const unsubscribe = messaging().onMessage(async (remoteMsg) => {
            const changeId = Math.random().toString(36).substring(7);
            createChannels(changeId);
            handleNotification(changeId, {
                bigImage: remoteMsg.notification?.android?.imageUrl,
                title: remoteMsg.notification?.title,
                message: remoteMsg.notification?.body,
                subText: remoteMsg.data?.subtitle,
            });
            console.log('remoteMsg', remoteMsg);
        });

        messaging().setBackgroundMessageHandler(async (remoteMsg) => {
            console.log('remoteMsg Backgroup', remoteMsg);
        });

        return unsubscribe;
    }, []);

    //}, [dispatch, socket]); -->
    // }, [dispatch, getAccidents]);
    // React.useEffect(() => {
    //     start();
    // }, []);

    const helpers: Helpers[] = setHelper.results.map((pops) => ({
        id: pops.id,
        status: pops.status,
        user: pops.user,
        accident: pops.accident,
        helperLatitude: pops.helperLatitude,
        helperLongitude: pops.helperLongitude,
        accidentLatitude: pops.accidentLatitude,
        accidentLongitude: pops.accidentLongitude,
        content: pops.content,
        createTime: pops.createTime,
        UpdateTime: pops.UpdateTime,
        timeOut: pops.timeOut,
    }));

    const onBackPress = () => {
        if (modalVisible === false) {
            Alert.alert('Confirm help', 'Are you sure you got help?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        if (location !== undefined) {
                            dispatch(
                                accidentsActions.patchAllAccident({
                                    id: getAccidents,
                                    props: {
                                        status: 'Success',
                                        latitude: String(location.coords.latitude),
                                        longitude: String(location.coords.longitude),
                                    },
                                })
                            );
                        }
                        setModalVisible(!modalVisible);
                        onCancel();
                    },
                },
            ]);
        } else {
            homePressHandler();
        }
    };

    const onCancel = () => {
        Torch.switchState(false);
        Vibration.cancel();
    };

    PushNotification.configure({
        onRegister: function (token: any) {
            console.log('TOKEN:', token);
        },
        onNotification: function (notification: { finish: (arg0: any) => void }) {
            console.log('NOTIFICATION:', notification);
        },
        onAction: (notification) => {
            console.log('ACTION:', notification.action);
            console.log('NOTIFICATION:', notification);
        },
        onRegistrationError: function (err: { message: any }) {
            console.error(err.message, err);
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
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
        PushNotification.createChannel(
            {
                channelId: channelId,
                channelName: 'My channel',
                channelDescription: 'A channel to categorise your notifications',
                playSound: false,
                soundName: 'default',
                importance: Importance.HIGH,
                vibrate: true,
            },
            () => {
                console.log('created channel');
            }
        );
    };

    const handleNotification = (channelId: any, options: any) => {
        PushNotification.localNotification({
            channelId: channelId,
            bigText: options.subText,
            largeIcon: options.bigImage,
            largeIconUrl: options.bigImage,
            bigLargeIcon: options.bigImage,
            bigPictureUrl: options.bigImage,
            bigLargeIconUrl: options.bigImage,
            color: options.color,
            vibrate: true,
            vibration: 300,
            priority: 'high',
            title: options.title,
            message: options.message,
        });
    };
    const ratingCompleted = (rating: number, id: string | undefined) => {
        if (id !== undefined) {
            dispatch(usersActions.updateRank({ ranking: rating, id: id }));
        }
    };

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
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(HelperAction.getHelperByIDAccident(getAccidents));
    }, [dispatch]);

    const renderNotifies = (info: ListRenderItemInfo<Helpers>): React.ReactElement => {
        if (info.item?.user) {
            const km = calculateDistance(info.item.helperLatitude, info.item.helperLongitude) / 1000;
            return (
                <Card style={{ marginVertical: 10 }}>
                    <Text>{'Name Helper: ' + info.item.user.name}</Text>
                    <Text>{'Status: ' + info.item.status}</Text>
                    <Text>{'Number phone: ' + info.item.user.numberPhone}</Text>
                    <Text>{'Counted helps: ' + info.item.user.countedHelps}</Text>
                    <Text>{`Distance: ${km} KM`}</Text>
                    {modalVisible ? (
                        <AirbnbRating>
                            showRating onFinishRating={(rating: number) => ratingCompleted(rating, info.item.user?.id)}
                        </AirbnbRating>
                    ) : (
                        <Text>{'Rating: ' + info.item.user.ranking}</Text>
                    )}
                </Card>
            );
        }
        return <></>;
    };

    const homePressHandler = () => {
        setModalVisible(false);
        navigation &&
            navigation.navigate('Home', {
                screen: 'Dashboard',
                params: { screen: 'DashboardHome' },
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <TouchableOpacity onPress={onCancel}>
                    <Image source={require('./assets/power-on.png')} style={{ height: 48, width: 48 }} />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                }}
            >
                <Image source={require('./assets/listHelper.png')} style={{ width: 120, height: 120 }} />
                <Text style={{ margin: 10 }} category="h3">
                    List Helper
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <List
                    data={helpers}
                    numColumns={1}
                    renderItem={renderNotifies}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Button style={{ marginVertical: 20, width: '70%' }} size="large" onPress={onBackPress}>
                    Helped
                </Button>
            </View>
        </View>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    circle: {
        position: 'absolute',
        top: 10,
        right: 20,
    },
});
export default DetailHelper;
