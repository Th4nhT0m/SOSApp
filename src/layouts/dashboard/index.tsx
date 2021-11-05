import React from 'react';
import { Dimensions, View } from 'react-native';
import { Avatar, Button, Card, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../services/hooks';
import MapViewComponent from '../../components/map-view.component';
import { SOSIcon } from './extra/icons';
import { usersActions } from '../../actions/user-actions';
import { accidentsActions } from '../../actions/accidents-ations';

const window = Dimensions.get('window');

const Dashboard = () => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();

    const userInfo = useAppSelector((state) => state.users);

    React.useEffect(() => {
        dispatch(usersActions.getCurrentUserInfo());
    }, [dispatch]);

    const onAccidentsButtonPress = () => {
        if (location !== undefined) {
            dispatch(
                accidentsActions.createUrgent({
                    //locationName: faker.address.cityName(),
                    latitude: String(location.coords.latitude),
                    //user: userInfo.currentUser.id,
                    longitude: String(location.coords.longitude),
                })
            );
        }
    };

    return (
        <View style={[styles.container]}>
            <Card style={{ ...styles.userInfo }} status={'primary'}>
                <View style={styles.infoContainer}>
                    <Avatar size={'giant'} source={require('../../assets/images/icon-avatar.png')} />
                    <Text>Hello, {userInfo.currentUser.name}</Text>
                </View>
            </Card>

            <MapViewComponent
                height={window.height * 0.5}
                loadingEnabled={true}
                showsMyLocationButton={true}
                onUserLocationChange={(event) => console.log(event.nativeEvent.coordinate)}
            />
            <View style={styles.sosButton}>
                <Button appearance="ghost" status="danger" accessoryLeft={SOSIcon} onPress={onAccidentsButtonPress} />
            </View>
        </View>
    );
};

export default Dashboard;

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        // alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        marginHorizontal: 8,
    },
    userInfo: {
        marginVertical: 10,
        width: '80%',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    sosButton: {
        display: 'flex',
        justifyContent: 'center',
        width: 'auto',
        height: 'auto',
        marginBottom: 90,
    },
});
