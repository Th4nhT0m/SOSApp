import { Alert, Dimensions, Image, View } from 'react-native';
import { Button, Divider, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../../services/hooks';
import React, { useState } from 'react';
import MapDirectionsViewComponent from '../../../components/form-map/map-directions-view.component';
import { HelperAction } from '../../../actions/helper-actions';
import { handbookActions } from '../../../actions/handbook-actions';
import { accidentsActions } from '../../../actions/accidents-ations';
import { Accidents, HelperByUserId } from '../../../services/requests/types';
import call from 'react-native-phone-call';
import { phoneIcon } from '../../../components/Icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const window = Dimensions.get('window');

const DetailAccidentProgress = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();
    const getID = useAppSelector((state) => state.helpersReducer.dateGet.id);
    const getLatitude = useAppSelector((state) => state.helpersReducer.dateGet.accidentLatitude);
    const getLongitude = useAppSelector((state) => state.helpersReducer.dateGet.accidentLongitude);

    const getNumber = useAppSelector((state) => state.accidents.dataGet.created_by?.numberPhone);
    const getAccident = useAppSelector((state) => state.helpersReducer.dateGet.accident);

    React.useEffect(() => {
        dispatch(accidentsActions.getAccidentByID(getAccident));
    }, [dispatch]);

    const styles = useStyleSheet(themedStyles);

    // const { location } = useCurrentGPSPosition();
    const onNotification = () => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Notification',
                params: { screen: 'NotificationAccidents' },
            });
    };

    const onPatchHelper = () => {
        Alert.alert('Confirm Complete', 'You have completed?', [
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
                                id: getID,
                                props: {
                                    status: 'Success',
                                    accidentLongitude: getLongitude,
                                    accidentLatitude: getLatitude,
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
                                id: getID,
                                props: {
                                    status: 'Cancel',
                                    accidentLongitude: getLongitude,
                                    accidentLatitude: getLatitude,
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
    };

    const triggerCall = (inputValue: string | undefined) => {
        const args = {
            number: inputValue,
            prompt: true,
        };
        call(args).catch(console.error);
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

            <TouchableOpacity style={styles.layoutPhone} onPress={() => triggerCall(getNumber)}>
                <Image source={require('./assets/phone.png')} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>

            <MapDirectionsViewComponent
                style={styles.maps}
                height={window.height * 0.5}
                loadingEnabled={true}
                showsMyLocationButton={true}
                endLatitude={Number(getLatitude)}
                endLongitude={Number(getLongitude)}
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
