import { Alert, Dimensions, Image, View } from 'react-native';
import { Button, Divider, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition, useSocket } from '../../../services/hooks';
import React from 'react';
import MapDirectionsViewComponent from '../../../components/form-map/map-directions-view.component';
import { HelperAction } from '../../../actions/helper-actions';
import { accidentsActions } from '../../../actions/accidents-ations';
const window = Dimensions.get('window');
import { TouchableOpacity } from 'react-native-gesture-handler';
// @ts-ignore
import call from 'react-native-phone-call';

const DetailAccidentProgress = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();
    // const socket = useSocket();
    const styles = useStyleSheet(themedStyles);
    const { id, accidentLatitude, accidentLongitude, accident } = useAppSelector(
        (state) => state.helpersReducer.dateGet
    );
    React.useEffect(() => {
        if (accident) {
            dispatch(
                accidentsActions.getAccidentByID({
                    data: accident,
                    onCreateAccident: (value) => {
                        console.log(value);
                    },
                })
            );
        } else {
            console.log('Dont data ');
        }
    }, [dispatch]);

    // React.useEffect(() => {
    //     if (socket) {
    //         const { accident: data } = socket;
    //         if (data) {
    //             console.log(data);
    //         }
    //     }
    // }, [socket]);

    const onNotification = () => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Notification',
                params: { screen: 'NotificationAccidents' },
            });
    };
    const onPatchHelper = () => {
        let params: string | undefined = '';
        if (accident) {
            dispatch(
                accidentsActions.getAccidentByID({
                    data: accident,
                    onCreateAccident: (value) => {
                        console.log(value.status);
                        params = value.status;
                        if (params === 'Success') {
                            Alert.alert('Confirm Complete', 'You have completed?', [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        if (location !== undefined) {
                                            dispatch(
                                                HelperAction.patchHelper({
                                                    id: id,
                                                    props: {
                                                        status: 'Success',
                                                        accidentLongitude: accidentLongitude,
                                                        accidentLatitude: accidentLatitude,
                                                        helperLatitude: String(location.coords.latitude),
                                                        helperLongitude: String(location.coords.longitude),
                                                        timeOut: new Date(),
                                                    },
                                                })
                                            );
                                            onNotification();
                                        }
                                    },
                                },
                            ]);
                        } else {
                            Alert.alert(
                                'Unfinished accident',
                                'The Accidents has not yet been confirmed complete by the requester',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => console.log('OK'),
                                    },
                                ]
                            );
                        }
                    },
                })
            );
        } else {
            console.log('');
        }
    };

    const triggerCall = () => {
        if (accident) {
            dispatch(
                accidentsActions.getAccidentByID({
                    data: accident,
                    onCreateAccident: (value) => {
                        const args = {
                            number: value.created_by?.numberPhone,
                            prompt: true,
                        };
                        call(args).catch(console.error);
                    },
                })
            );
        }
    };

    const onDeleteHelper = () => {
        Alert.alert('Confirm Cancel', 'You have cancel?', [
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
                            HelperAction.patchHelper({
                                id: id,
                                props: {
                                    status: 'Cancel',
                                    accidentLongitude: accidentLongitude,
                                    accidentLatitude: accidentLatitude,
                                    helperLatitude: String(location.coords.latitude),
                                    helperLongitude: String(location.coords.longitude),
                                    timeOut: new Date(),
                                },
                            })
                        );
                        // socket.emit('forceDisconnect');
                        onNotification();
                    }
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h3">
                    Progress
                </Text>
                <Divider style={styles.divider} />
            </View>

            <Image
                source={require('./assets/10637879451606261172-128.png')}
                style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20 }}
            />

            <TouchableOpacity style={styles.layoutPhone} onPress={() => triggerCall()}>
                <Image source={require('./assets/phone.png')} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>

            <MapDirectionsViewComponent
                style={styles.maps}
                height={window.height * 0.5}
                loadingEnabled={true}
                showsMyLocationButton={true}
                endLatitude={Number(accidentLatitude)}
                endLongitude={Number(accidentLongitude)}
                onUserLocationChange={() => {
                    if (location !== undefined) {
                        dispatch(
                            HelperAction.patchHelper({
                                id: id,
                                props: {
                                    accidentLongitude: accidentLongitude,
                                    accidentLatitude: accidentLatitude,
                                    helperLatitude: String(location.coords.latitude),
                                    helperLongitude: String(location.coords.longitude),
                                    timeOut: new Date(),
                                },
                            })
                        );
                    }
                }}
            />

            <View style={styles.Button}>
                <Button style={styles.buttons} onPress={onPatchHelper}>
                    Completed
                </Button>
                <Button style={styles.buttons} onPress={onDeleteHelper}>
                    Cancel
                </Button>
            </View>
        </View>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'background-basic-color-1',
    },
    Button: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 420,
    },
    maps: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 10,
    },
    divider: {
        flex: 1,
    },
    orLabel: {
        marginHorizontal: 8,
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 20,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginHorizontal: '1%',
        marginBottom: 35,
        minWidth: '48%',
        textAlign: 'center',
        marginTop: 20,
    },
    itemPhone: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        left: 330,
    },
    iconPhone: {
        paddingHorizontal: 0,
    },
    title: {
        borderRadius: 4,
        margin: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        margin: 5,
        color: 'black',
    },
    layoutPhone: {
        left: 350,
    },
});
export default DetailAccidentProgress;
