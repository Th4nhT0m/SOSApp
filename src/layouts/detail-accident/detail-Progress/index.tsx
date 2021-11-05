import React from 'react';
import { Dimensions, View } from 'react-native';
import { Button, StyleService } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import MapViewComponent from '../../../components/map-view.component';
import MapView, { MapViewProps as MVProps, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const DetailAccidentProgress = ({ navigation }: any): React.ReactElement => {
    const [coordinates] = React.useState([
        {
            latitude: Number(useAppSelector((state) => state.detailAccidents.data.latitude)),
            longitude: Number(useAppSelector((state) => state.detailAccidents.data.longitude)),
        },
        {
            latitude: 48.8323785,
            longitude: 2.3361663,
        },
    ]);
    const GOOGLE_API_KEY = 'AIzaSyDZA9nkOmeoAwvNLxn4sUfLNUS23eSSt_0';
    return (
        <View style={styles.container}>
            <Button />
            {/*<MapView*/}
            {/*    style={styles.maps}*/}
            {/*    initialRegion={{*/}
            {/*        latitude: coordinates[0].latitude,*/}
            {/*        longitude: coordinates[0].longitude,*/}
            {/*        latitudeDelta: 0.0622,*/}
            {/*        longitudeDelta: 0.0121,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <MapViewDirections*/}
            {/*        origin={coordinates[0]}*/}
            {/*        destination={coordinates[1]}*/}
            {/*        apikey={GOOGLE_API_KEY} // insert your API Key here*/}
            {/*        strokeWidth={4}*/}
            {/*        strokeColor="#111111"*/}
            {/*    />*/}
            {/*    <Marker coordinate={coordinates[0]} />*/}
            {/*    <Marker coordinate={coordinates[1]} />*/}
            {/*</MapView>*/}
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
