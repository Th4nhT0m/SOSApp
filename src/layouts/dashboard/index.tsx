import React from 'react';
import { Dimensions, Image, View, Vibration } from 'react-native';
import { Avatar, Card, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../services/hooks';
import MapViewComponent from '../../components/form-map/map-view.component';
import { usersActions } from '../../actions/user-actions';
import { accidentsActions } from '../../actions/accidents-ations';
import { TouchableOpacity } from 'react-native-gesture-handler';
const window = Dimensions.get('window');
import Torch from 'react-native-torch';

const Dashboard = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();
    const ONE_SECOND_IN_MS = 10;
    const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];

    const userInfo = useAppSelector((state) => state.users);
    const getAccidents = useAppSelector((state) => state.accidents.dataGet.id);
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
            console.log(getAccidents);
        }
        setTimeout(() => {
            navigation &&
                navigation.navigate('Home', {
                    screen: 'Dashboard',
                    params: { screen: 'DetailHelper' },
                });
            handlePress();
        }, 1000);
    };

    const handlePress = () => {
        Torch.switchState(true);
        Vibration.vibrate(PATTERN, true);
    };
    return (
        <View style={[styles.container]}>
            <Card style={{ ...styles.userInfo }} status={'primary'}>
                <View style={styles.infoContainer}>
                    <Avatar size={'giant'} source={require('../../assets/images/icon-avatar.png')} />
                    <Text>Hello, {userInfo.currentUser.name}</Text>
                    <Image source={require('./extra/notification.png')} style={{ width: 37, height: 37, left: 155 }} />
                </View>
            </Card>

            <MapViewComponent
                height={window.height * 0.78}
                loadingEnabled={true}
                showsMyLocationButton={true}
                onUserLocationChange={(event) => console.log(event.nativeEvent.coordinate)}
            />

            <View style={[themedStyles.formContainer, themedStyles.container]}>
                <TouchableOpacity style={styles.layoutSoS} onPress={onAccidentsButtonPress}>
                    <Image source={require('./extra/sosư.png')} style={{ height: 110, width: 110 }} />
                </TouchableOpacity>
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
        width: '100%',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    formContainer: {
        marginTop: 395,
        paddingHorizontal: 20,
    },
    sosButton: {
        display: 'flex',
        justifyContent: 'center',
        width: 'auto',
        height: 'auto',
        marginBottom: 90,
    },
    button: {
        marginVertical: 24,
        marginHorizontal: 16,
    },
    layoutSoS: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
