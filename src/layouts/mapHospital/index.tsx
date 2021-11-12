import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import Dashboard from '../../layouts/dashboard';
import { useAppDispatch, useCurrentGPSPosition } from '../../services/hooks';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import MapViewComponent from '../../components/map-view.component';

const window = Dimensions.get('window');

const MapHospital = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();

    return (
        <View style={[styles.container]}>
            <MapViewComponent
                height={window.height * 0.88}
                loadingEnabled={true}
                showsMyLocationButton={true}
                onUserLocationChange={(event) => console.log(event.nativeEvent.coordinate)}
            />
        </View>
    );
};

export default MapHospital;

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        // alignItems: 'flex-start',
        justifyContent: 'center',
    },
});
