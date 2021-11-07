import React from 'react';
import { Alert, View } from 'react-native';
import { Button, StyleService, Text } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../../services/hooks';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { DetailAccidentsAction } from '../../../actions/details-accident-actions';
const DetailAccidentProgress = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const getID = useAppSelector((state) => state.detailAccidents.dataGet.id);
    const getContent = useAppSelector((state) => state.detailAccidents.dataGet.content);
    const getLatitude = useAppSelector((state) => state.detailAccidents.dataGet.latitude);
    const getLongitude = useAppSelector((state) => state.detailAccidents.dataGet.longitude);
    const { location } = useCurrentGPSPosition();
    const onNotification = () => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Notification',
                params: { screen: 'NotificationAccidents' },
            });
        console.log('Susses');
    };

    const onPatchDetailsAccident = () => {
        Alert.alert('Confirm Complete', 'You have completed?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    dispatch(
                        DetailAccidentsAction.patchDetails({
                            id: getID,
                            props: {
                                status: 'End',
                                timeOut: new Date().toISOString(),
                                content: getContent,
                                latitude: getLatitude,
                                longitude: getLongitude,
                            },
                        })
                    );
                    onNotification();
                    // console.log(getContent);
                    // console.log(getID);
                    // console.log(getLatitude);
                    // console.log(getLongitude);
                    // console.log(new Date().toISOString());
                },
            },
        ]);
    };
    const onDeleteDetailsAccident = () => {
        Alert.alert('Confirm Cancel', 'You have cancel?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    dispatch(DetailAccidentsAction.deleteDetails(getID));
                    onNotification();
                },
            },
        ]);
    };

    const [coordinates] = React.useState([
        {
            latitude: Number(useAppSelector((state) => state.detailAccidents.dataCreate.latitude)),
            longitude: Number(useAppSelector((state) => state.detailAccidents.dataCreate.longitude)),
            // latitude: 10.381755,
            // longitude: 106.881714,
        },
        {
            latitude: 10.381718,
            longitude: 106.88804,
        },
    ]);
    // const GOOGLE_API_KEY = 'AIzaSyA3kmYPyrnD6hcuXbag8DqvRCtZ8uHCNh4';
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.text} status="control">
                    Control
                </Text>
            </View>
            <MapView
                style={styles.maps}
                initialRegion={{
                    latitude: coordinates[0].latitude,
                    longitude: coordinates[0].longitude,
                    latitudeDelta: coordinates[1].latitude,
                    longitudeDelta: coordinates[1].longitude,
                }}
            >
                {/*<MapViewDirections*/}
                {/*    origin={coordinates[0]}*/}
                {/*    destination={coordinates[1]}*/}
                {/*    apikey={GOOGLE_API_KEY} // insert your API Key here*/}
                {/*    strokeWidth={4}*/}
                {/*    strokeColor="#111111"*/}
                {/*/>*/}
                <Marker coordinate={coordinates[0]} />
                <Marker coordinate={coordinates[1]} />
            </MapView>
            <View style={styles.Button}>
                <Button style={styles.buttons} onPress={onPatchDetailsAccident}>
                    Completed
                </Button>
                <Button style={styles.buttons} onPress={onDeleteDetailsAccident}>
                    Cancel
                </Button>
            </View>
        </View>
    );
};

const styles = StyleService.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    Button: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    maps: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginHorizontal: '1%',
        marginBottom: 6,
        minWidth: '48%',
        textAlign: 'center',
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
});
export default DetailAccidentProgress;
