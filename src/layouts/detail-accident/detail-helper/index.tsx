import React from 'react';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../../services/hooks';
import { Helper } from '../../../services/requests/types';
import { HelperAction } from '../../../actions/helper-actions';
import { Alert, Dimensions, ListRenderItemInfo, View } from 'react-native';
import { Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { accidentsActions } from '../../../actions/accidents-ations';
import { io } from 'socket.io-client';

const DetailHelper = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const styles = useStyleSheet(themedStyles);
    const getAccidents = useAppSelector((state) => state.accidents.dataGet);
    const { location } = useCurrentGPSPosition();
    const socket = io('http://192.168.1.6:1945');
    React.useEffect(() => {
        dispatch(HelperAction.getHelperByIDAccident(getAccidents.id));
        dispatch(HelperAction.getAllHelper);
        socket.on('helper', () => {
            console.log('Connect Socket and ID : ' + socket.id);
            // socket.on('getHelper', () => {
            //     socket.on('AllAccidents', (data) => {
            //         console.log(data);
            // });
        });
    }, [dispatch, getAccidents.id, socket]);
    const setHelper = useAppSelector((state) => state.helpersReducer.dateList);

    const helpers: Helper[] = setHelper.results.map((pops) => ({
        id: pops.id,
        status: pops.status,
        user: pops.user,
        accident: pops.accident,
        helperLatitude: pops.helperLatitude,
        helperLongitude: pops.helperLongitude,
        accidentLatitude: pops.accidentLatitude,
        accidentLongitude: pops.accidentLongitude,
        content: pops.content,
        timeOut: pops.timeOut,
    }));
    const onBackPress = () => {
        Alert.alert('Confirm help', 'Are you sure you got help?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    if (location !== undefined) {
                        dispatch(
                            accidentsActions.patchAllAccident({
                                id: getAccidents.id,
                                props: {
                                    status: 'Cancel',
                                    latitude: String(location.coords.latitude),
                                    longitude: String(location.coords.longitude),
                                },
                            })
                        );
                        navigation &&
                            navigation.navigate('Home', {
                                screen: 'Dashboard',
                                params: { screen: 'DashboardHome' },
                            });
                    }
                },
            },
        ]);
    };
    const renderNotifies = (info: ListRenderItemInfo<Helper>): React.ReactElement => (
        <Card style={styles.itemFooter}>
            <Text>{'Name Helper: ' + info.item?.user}</Text>
            <Text>{'Status : ' + info.item?.status}</Text>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h5">
                    List Helper
                </Text>
                <Divider style={styles.divider} />
            </View>

            <List contentContainerStyle={styles.notifyList} data={helpers} numColumns={1} renderItem={renderNotifies} />
            <View>
                <Button onPress={onBackPress}>Helped</Button>
            </View>
        </View>
    );
};
const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 2,
    },
    divider: {
        flex: 1,
    },
    orLabel: {
        marginHorizontal: 8,
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
    },
    iconButton: {
        paddingHorizontal: 0,
    },
});

export default DetailHelper;
