import { Alert, Dimensions, View } from 'react-native';
import { Button, StyleService } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import React from 'react';
import MapDirectionsViewComponent from '../../../components/form-map/map-directions-view.component';
import { HelperAction } from '../../../actions/helper-actions';
const window = Dimensions.get('window');
const DetailAccidentProgress = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const getID = useAppSelector((state) => state.helpersReducer.dataCreate.user);
    const getLatitude = useAppSelector((state) => state.helpersReducer.dataCreate.accidentLatitude);
    const getLongitude = useAppSelector((state) => state.helpersReducer.dataCreate.accidentLongitude);

    // const { location } = useCurrentGPSPosition();
    const onNotification = () => {
        navigation &&
            navigation.babel('Home', {
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
                    // dispatch(
                    //     HelperAction.patchHelper({
                    //         id: getID,
                    //         props: {},
                    //     })
                    // );
                    onNotification();
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
                    onNotification();
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <MapDirectionsViewComponent
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
