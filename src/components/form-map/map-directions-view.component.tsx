import React, { useState } from 'react';
import { Dimensions, PermissionsAndroid, StyleSheet, View } from 'react-native';
import MapView, { MapViewProps as MVProps, Marker } from 'react-native-maps';
import { useCurrentGPSPosition } from '../../services/hooks';
import MapViewDirections from 'react-native-maps-directions';

export interface MapViewProps extends Omit<MVProps, 'maximumAge'> {
    height?: number;
    width?: number;
    endLatitude: number;
    endLongitude: number;
}

const window = Dimensions.get('window');

const MapDirectionsViewComponent = (props: MapViewProps) => {
    const { height, width, style, ...rest } = props;
    const SCREEN_HEIGHT = height ?? window.height;
    const SCREEN_WIDTH = width ?? window.width;
    const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const { location } = useCurrentGPSPosition();
    const [paddingTop, setPadding] = useState<any>(1);
    const [initialPosition, setPosition] = React.useState([
        {
            latitude: 0,
            longitude: 0,
        },
        {
            latitude: 0,
            longitude: 0,
        },
    ]);

    const onMapReady = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(() => {
            setPadding(0);
        });
    };

    React.useEffect(() => {
        if (location !== null && location !== undefined) {
            const { latitude, longitude } = location.coords;
            setPosition([
                {
                    latitude: latitude,
                    longitude: longitude,
                },

                {
                    latitude: props.endLatitude,
                    longitude: props.endLongitude,
                },
            ]);
        }
    }, [location, props.endLatitude, props.endLongitude]);

    const renderMap = () => (
        <MapView
            showsUserLocation
            followsUserLocation={true}
            style={[{ ...styles.map, width: width ?? window.width, height: height ?? window.height }, style]}
            onMapReady={onMapReady}
            provider="google"
            mapType="standard"
            showsScale={true}
            showsCompass={true}
            {...rest}
            initialRegion={{
                latitude: initialPosition[0].latitude,
                longitude: initialPosition[0].longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
        >
            {/*<Marker coordinate={initialPosition[0]} />*/}
            <Marker coordinate={initialPosition[1]} />
            {/*<MapViewDirections*/}
            {/*    origin={initialPosition[0]}*/}
            {/*    destination={initialPosition[1]}*/}
            {/*    apikey="AIzaSyBQpNl4USbR6UnlA0MoeWa9N" // insert your API Key here*/}
            {/*    strokeWidth={4}*/}
            {/*    strokeColor="#111111"*/}
            {/*/>*/}
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
export default MapDirectionsViewComponent;
