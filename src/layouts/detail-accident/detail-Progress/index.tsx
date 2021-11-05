import React from 'react';
import { Dimensions, KeyboardAvoidingView, View } from 'react-native';
import { Button, StyleService, Text } from '@ui-kitten/components';
import { useAppDispatch } from '../../../services/hooks';
import MapViewComponent from '../../../components/map-view.component';
const window = Dimensions.get('window');
const CreateDetailAccident = () => {
    const dispatch = useAppDispatch();
    return (
        <View>
            <MapViewComponent
                height={window.height * 0.5}
                loadingEnabled={true}
                showsMyLocationButton={true}
                onUserLocationChange={(event) => console.log(event.nativeEvent.coordinate)}
            />

            <Button> </Button>
        </View>
    );
};

export default CreateDetailAccident;
const themedStyles = StyleService.create({});
