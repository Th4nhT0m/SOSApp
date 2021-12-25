import React from 'react';
import { Dimensions, Image, View, Vibration, Platform } from 'react-native';
import { Avatar, Card, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition, useSocket } from '../../services/hooks';
import MapViewComponent from '../../components/form-map/map-view.component';
import { usersActions } from '../../actions/user-actions';
import { accidentsActions } from '../../actions/accidents-ations';
import { TouchableOpacity } from 'react-native-gesture-handler';
const window = Dimensions.get('window');
// @ts-ignore
import Torch from 'react-native-torch';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import Sound from 'react-native-sound';

const Dashboard = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();
    const { socket } = useSocket();
    const ONE_SECOND_IN_MS = 10;
    const PATTERN = [ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];
    let sound1: Sound;
    const { currentUser } = useAppSelector((state) => state.users);
    React.useEffect(() => {
        dispatch(usersActions.getCurrentUserInfo());
    }, [dispatch]);

    React.useEffect(() => {
        messaging()
            .getToken()
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

    const onAccidentsButtonPress = () => {
        if (location && socket) {
            dispatch(
                accidentsActions.createUrgent({
                    data: {
                        latitude: String(location.coords.latitude),
                        //user: userInfo.currentUser.id,
                        longitude: String(location.coords.longitude),
                    },
                    onCreateAccident: (values) => {
                        socket.emit('sentAccidents', { ...values });
                    },
                })
            );
        }
        setTimeout(() => {
            navigation &&
                navigation.navigate('Home', {
                    screen: 'Dashboard',
                    params: { screen: 'DetailHelper' },
                });
            handlePress();
        }, 2500);
        start();
    };

    const handlePress = () => {
        Torch.switchState(true);
        Vibration.vibrate(PATTERN, true);
    };

    const start = () => {
        Sound.setCategory('Playback');
        sound1 = new Sound(require('./music/dangeralar_o3srdt8a.mp3'), (error) => {
            if (error) {
                alert('error' + error.message);
                return;
            }
            sound1.play(() => {
                sound1.release();
            });
            // sound1.setNumberOfLoops(2);
        });
    };

    PushNotification.configure({
        onRegister: function (token: any) {
            console.log('TOKEN:', token);
        },
        onNotification: function (notification: { finish: (arg0: any) => void }) {
            console.log('NOTIFICATION:', notification);
        },
        //        onAction: function (notification: { action: any }) {
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

    return (
        <View style={[styles.container]}>
            <Card style={{ ...styles.userInfo }} status={'primary'}>
                <View style={styles.infoContainer}>
                    <Avatar size={'giant'} source={require('../../assets/images/icon-avatar.png')} />
                    <Text>Hello, {currentUser.name}</Text>
                    <Image source={require('./extra/notification.png')} style={{ width: 37, height: 37, left: 155 }} />
                </View>
            </Card>

            <MapViewComponent
                height={window.height * 0.78}
                loadingEnabled={true}
                showsMyLocationButton={true}
                // onUserLocationChange={(event) => console.log(event.nativeEvent.coordinate)}
            />

            <View style={[themedStyles.formContainer, themedStyles.container]}>
                <TouchableOpacity style={styles.layoutSoS} onPress={onAccidentsButtonPress}>
                    <Image source={require('./extra/sosư.png')} style={{ height: 110, width: 110 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Dashboard;

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        // alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        marginHorizontal: 8,
    },
    userInfo: {
        marginVertical: 10,
        width: '100%',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    formContainer: {
        marginTop: 395,
        paddingHorizontal: 20,
    },
    sosButton: {
        display: 'flex',
        justifyContent: 'center',
        width: 'auto',
        height: 'auto',
        marginBottom: 90,
    },
    button: {
        marginVertical: 24,
        marginHorizontal: 16,
    },
    layoutSoS: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
