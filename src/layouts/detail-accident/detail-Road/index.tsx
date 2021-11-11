import React from 'react';
import { Dimensions, View } from 'react-native';
import { Button, StyleService } from '@ui-kitten/components';
import { useAppSelector } from '../../../services/hooks';
import MapView, { MapViewProps as MVProps, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const DetailAccidentProgress = (
    { navigation }: any,
    pops: { latitude: string; longitude: string }
): React.ReactElement => {
    const onNotification = () => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Notification',
                params: { screen: 'NotificationAccidents' },
            });
        console.log('Susses');
    };

    const [coordinates] = React.useState([
        {
            latitude: Number(useAppSelector((state) => state.detailAccidents.data.latitude)),
            longitude: Number(useAppSelector((state) => state.detailAccidents.data.longitude)),
        },
        {
            latitude: Number(pops.latitude),
            longitude: Number(pops.longitude),
        },
    ]);
    const GOOGLE_API_KEY = 'AIzaSyDWTx7bREpM5B6JKdbzOvMW-RRlhkukmVE';
    return (
        <View style={styles.container}>
            <Button />
            <MapView
                style={styles.maps}
                initialRegion={{
                    latitude: coordinates[0].latitude,
                    longitude: coordinates[0].longitude,
                    latitudeDelta: coordinates[1].latitude,
                    longitudeDelta: coordinates[1].longitude,
                }}
            >
                <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={GOOGLE_API_KEY} // insert your API Key here
                    strokeWidth={4}
                    strokeColor="#111111"
                />
            </MapView>
            <View>
                <Button onPress={onNotification} />
            </View>
        </View>
    );
};

const styles = StyleService.create({
    container: {
        flex: 1,
        // alignItems: 'flex-start',
        justifyContent: 'center',
    },
    maps: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});
export default DetailAccidentProgress;
