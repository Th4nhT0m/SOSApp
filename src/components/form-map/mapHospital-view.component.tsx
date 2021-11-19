import React, { useState } from 'react';
import { Dimensions, PermissionsAndroid, StyleSheet, View, Image } from 'react-native';
import MapView, { MapViewProps as MVProps, Marker } from 'react-native-maps';
import { useCurrentGPSPosition } from '../../services/hooks';
import { markers } from './mapData/mapData';

const window = Dimensions.get('window');

export interface MapViewProps extends Omit<MVProps, 'maximumAge'> {
    height?: number;
    width?: number;
}
//MapHospitalViewComponent

const MapHospitalViewComponent = (props: MapViewProps) => {
    const { height, width, style, ...rest } = props;
    const SCREEN_HEIGHT = height ?? window.height;
    const SCREEN_WIDTH = width ?? window.width;
    const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const { location } = useCurrentGPSPosition();

    const [paddingTop, setPadding] = useState<any>(1);

    const [initialPosition, setPosition] = React.useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const [initialMarkers] = React.useState({ markers });

    const onMapReady = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(() => {
            setPadding(0);
        });
    };

    React.useEffect(() => {
        if (location !== null && location !== undefined) {
            const { latitude, longitude } = location.coords;
            setPosition({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            });
        }
    }, [LONGITUDE_DELTA, location]);

    const renderMap = () => (
        <MapView
            style={[{ ...styles.map, width: width ?? window.width, height: height ?? window.height }, style]}
            onMapReady={onMapReady}
            provider="google"
            mapType="standard"
            showsScale={true}
            showsCompass={true}
            {...rest}
            initialRegion={{
                latitude: initialPosition.latitude,
                longitude: initialPosition.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
        >
            <Marker coordinate={initialPosition}>
                <Image source={require('../../assets/images/mapUser.png')} style={{ height: 40, width: 40 }} />
            </Marker>

            {initialMarkers.markers.map((post) => {
                const map = {
                    latitude: post.latitude,
                    longitude: post.longitude,
                };
                return <Marker coordinate={map} title={post.title} description={post.description} />;
            })}
        </MapView>
    );
    return <View style={{ ...styles.container, paddingTop: paddingTop }}>{renderMap()}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
    },
});

export default MapHospitalViewComponent;
