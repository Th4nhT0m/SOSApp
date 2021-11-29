import React from 'react';
import { Avatar, Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Alert, Dimensions, ListRenderItemInfo, View } from 'react-native';
import { DoneAllIcon } from '../../components/Icons';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../services/hooks';
import { accidentsActions } from '../../actions/accidents-ations';
import { Accidents } from '../../services/requests/types';
import getDistance from 'geolib/es/getPreciseDistance';
import { HelperAction } from '../../actions/helper-actions';
import { io } from 'socket.io-client';

const Notification = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();

    const setAccidents = useAppSelector((state) => state.accidents.dateList);
    const getUser = useAppSelector((state) => state.users.currentUser.id);
    React.useEffect(() => {
        const socket = io('http://192.168.1.6:1945');
        socket.on('connect', () => {
            console.log(socket.id);
        });
        dispatch(accidentsActions.getAllAccidents());
    }, []);

    // const getListSocket: Accidents[] = null;
    const notifies: Accidents[] = setAccidents.results.map((pops) => ({
        id: pops.id,
        nameAccident: pops.nameAccident,
        description: pops.description,
        latitude: pops.latitude,
        longitude: pops.longitude,
        created_by: pops.created_by,
        modified_by: pops.modified_by,
        accidentType: pops.accidentType,
        status: pops.status,
    }));

    const setOnAccidents = (id: string, latitude: string, longitude: string): void => {
        Alert.alert('Confirm help', 'Do you want to help?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    if (location != undefined) {
                        console.log(latitude + ' ' + longitude);
                        dispatch(
                            HelperAction.createHelper({
                                accident: id,
                                user: getUser,
                                accidentLatitude: latitude,
                                accidentLongitude: longitude,
                                helperLatitude: String(location.coords.latitude),
                                helperLongitude: String(location.coords.longitude),
                            })
                        );
                        onDetailProgress();
                    }
                },
            },
        ]);
    };
    //
    const calculateDistance = (latitude: string, longitude: string) => {
        if (location !== undefined) {
            const dis = getDistance(
                { latitude: Number(latitude), longitude: Number(longitude) },
                { latitude: location.coords.latitude, longitude: location.coords.longitude }
            );
            return dis;
        } else {
            return 0;
        }
    };

    const onDetailProgress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Notification',
                params: { screen: 'DetailProgress' },
            });
        console.log('Susses');
    };

    const renderItemFooter = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <View style={styles.itemFooter}>
            {/*<Text category="s1">{'Time created: ' + info.item?.timeStart}</Text>*/}
            <Text category="s1">
                {'Distance: ' + calculateDistance(info.item?.latitude, info.item?.longitude) / 1000 + ' KM'}
            </Text>
            <Button
                style={styles.iconButton}
                size="small"
                accessoryLeft={DoneAllIcon}
                onPress={() => {
                    setOnAccidents(info.item?.id, info.item?.latitude, info.item?.longitude);
                }}
                // onPress={onDetailProgress}
            />
        </View>
    );

    const renderNotifies = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <Card footer={() => renderItemFooter(info)}>
            <View style={styles.itemHeader}>
                <Avatar size="giant" source={require('../../assets/images/icon-avatar.png')} />
                <View>
                    <Text category="s2">{'Name Accident: ' + info.item?.nameAccident}</Text>
                    <Text category="s1">{'User Create: ' + info.item?.created_by}</Text>
                </View>
            </View>
            <Divider />
            <Text style={{ marginTop: 15 }}>{'Description: ' + info.item?.description}</Text>
        </Card>
    );

    return (
        <List contentContainerStyle={styles.notifyList} data={notifies} numColumns={1} renderItem={renderNotifies} />
    );
};
const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    notifyList: {
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    productItem: {
        flex: 1,
        margin: 8,
        maxWidth: Dimensions.get('window').width / 2 - 24,
        backgroundColor: 'background-basic-color-1',
    },
    itemHeader: {
        height: 80,
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
});

export default Notification;
