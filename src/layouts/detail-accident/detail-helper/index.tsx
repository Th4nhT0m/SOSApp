import React, { useState } from 'react';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../../services/hooks';
import { Helpers } from '../../../services/requests/types';
import { HelperAction } from '../../../actions/helper-actions';
import { Alert, Dimensions, ListRenderItemInfo, View, Vibration, Image, Platform } from 'react-native';
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
        console.log('Rating is: ' + rating + ' && Id : ' + id);
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

    const renderNotifies = (info: ListRenderItemInfo<Helpers>): React.ReactElement => {
        if (info.item?.user) {
            const km = calculateDistance(info.item.helperLatitude, info.item.helperLongitude) / 1000;
            return (
                <Card style={styles.itemFooter}>
                    <Text>{'Name Helper: ' + info.item.user.name}</Text>
                    <Text>{'Status: ' + info.item.status}</Text>
                    <Text>{'Number phone: ' + info.item.user.numberPhone}</Text>
                    <Text>{'Counted helps: ' + info.item.user.countedHelps}</Text>
                    <Text>{`Distance: ${km} KM`}</Text>
                    <AirbnbRating showRating defaultRating={info.item.user.ranking} isDisabled={true} />
                </Card>
            );
        }
        return <></>;
    };

    const renderRating = (info: ListRenderItemInfo<Helpers>): React.ReactElement => (
        <View style={styles.listRank}>
            <Card style={styles.itemRating}>
                <Text>{'Name Helper: ' + info.item?.user?.name}</Text>
                <Divider style={styles.listRank} />
                <AirbnbRating
                    showRating
                    onFinishRating={(rating: number) => ratingCompleted(rating, info.item.user?.id)}
                />
            </Card>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.circle}>
                <View>
                    <TouchableOpacity style={styles.layoutCircle} onPress={onCancel}>
                        <Image source={require('./assets/power-on.png')} style={{ height: 48, width: 48 }} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Image
                source={require('./assets/listHelper.png')}
                style={{ width: 120, height: 120, alignSelf: 'center', marginTop: -400 }}
            />
            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h3">
                    List Helper
                </Text>
                <Divider style={styles.divider} />
            </View>

            <List contentContainerStyle={styles.notifyList} data={helpers} numColumns={1} renderItem={renderNotifies} />

            <View>
                <Button style={styles.updateButton} size="large" onPress={onBackPress}>
                    Helped
                </Button>
            </View>

            <Modal visible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
                <Card style={styles.backGroundRank} disabled={true}>
                    <View style={styles.orRatingStyles}>
                        <Divider style={styles.divider} />
                        <Text style={styles.orLabel} category="h3">
                            Helper Rating
                        </Text>
                        <Divider style={styles.divider} />
                    </View>

                    <List style={styles.listRank} data={helpers} renderItem={renderRating} />

                    <Button
                        onPress={() => {
                            setModalVisible(false);
                            navigation &&
                                navigation.navigate('Home', {
                                    screen: 'Dashboard',
                                    params: { screen: 'DashboardHome' },
                                });
                        }}
                    >
                        DISMISS
                    </Button>
                </Card>
            </Modal>
        </View>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 15,
    },
    orRatingStyles: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 15,
        background: 'darkgrey',
    },
    divider: {
        flex: 1,
    },
    updateButton: {
        marginVertical: 24,
        marginHorizontal: 16,
    },
    orLabel: {
        marginHorizontal: 8,
    },
    notifyList: {
        paddingHorizontal: 8,
        paddingVertical: 16,
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
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    itemFooter: {
        marginTop: 10,
    },
    itemRating: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 20,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    circle: {
        marginRight: -40,
        marginTop: 10,
    },
    layoutCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: 70,
        borderRadius: 30,
        marginLeft: 330,
    },
    listRank: {
        marginTop: 20,
    },
    backGroundRank: {
        backgroundColor: '#66cdaa',
        background: '#66cdaa',
    },
});
export default DetailHelper;
