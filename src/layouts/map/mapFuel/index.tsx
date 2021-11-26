import React from 'react';
import { Dimensions, View } from 'react-native';
import { Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import MapFuelViewComponent from '../../../components/form-map/mapFuel-view.component';
import MapViewComponent from '../../../components/form-map/map-view.component';
import { ArrowForwardIconOutLineLeftSide } from '../../users/view-user/extra/icons';
const window = Dimensions.get('window');

const MapFuel = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);

    const onBackButtonPress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Utilities',
                params: {
                    screen: 'ViewUtilities',
                },
            });
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.headerContainer as any}>
                <Button
                    style={styles.backButton}
                    appearance="ghost"
                    status="control"
                    size="giant"
                    accessoryLeft={ArrowForwardIconOutLineLeftSide}
                    onPress={onBackButtonPress}
                >
                    Back
                </Button>
            </View>

            <MapFuelViewComponent
                height={window.height * 0.78}
                loadingEnabled={true}
                showsMyLocationButton={true}
                onUserLocationChange={(event) => console.log(event.nativeEvent.coordinate)}
            />
        </View>
    );
};

export default MapFuel;

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headerContainer: {
        minHeight: 20,
        paddingHorizontal: 16,
        backgroundColor: '#20b2aa',
    },
    backButton: {
        maxWidth: 80,
        paddingHorizontal: 0,
    },
});
