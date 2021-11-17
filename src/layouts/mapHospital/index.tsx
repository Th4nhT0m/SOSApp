import React from 'react';
import { Dimensions, View } from 'react-native';
import { useAppDispatch, useCurrentGPSPosition } from '../../services/hooks';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import MapHospitalViewComponent from '../../components/form-map/mapHospital-view.component';
//import MapViewComponent from '../../components/form-map/map-view.component';
const window = Dimensions.get('window');

const MapHospital = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();

    return (
        <View style={[styles.container]}>
            <MapHospitalViewComponent
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
