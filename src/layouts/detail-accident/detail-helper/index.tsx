import React from 'react';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../../services/hooks';
import { Helpers } from '../../../services/requests/types';
import { HelperAction } from '../../../actions/helper-actions';
import { Alert, Dimensions, ListRenderItemInfo, View, Vibration, Image } from 'react-native';
import { Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { accidentsActions } from '../../../actions/accidents-ations';
import Torch from 'react-native-torch';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const DetailHelper = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const styles = useStyleSheet(themedStyles);
    const { location } = useCurrentGPSPosition();

    const getAccidents = useAppSelector((state) => state.accidents.dataGet.id);
    const setHelper = useAppSelector((state) => state.helpersReducer.dateList);
    const socket = io('http://192.168.1.6:3000');
    let sound1: Sound;

    React.useEffect(() => {
        dispatch(HelperAction.getHelperByIDAccident(getAccidents));
    }, [dispatch, socket]);

   // }, [dispatch, getAccidents]);
    // React.useEffect(() => {
    //     start();
    // }, []);


    const helpers: Helpers[] = setHelper.results.map((pops) => ({
        id: pops.id,
        status: pops.status,
        user: pops.user,
        accident: pops.accident,
        helperLatitude: pops.helperLatitude,
        helperLongitude: pops.helperLongitude,
        accidentLatitude: pops.accidentLatitude,
        accidentLongitude: pops.accidentLongitude,
        content: pops.content,
        createTime: pops.createTime,
        UpdateTime: pops.UpdateTime,
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
                                id: getAccidents,
                                props: {
                                    status: 'Success',
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
                    onCancel();
                },
            },
        ]);
    };

    const onCancel = () => {
        Torch.switchState(false);
        Vibration.cancel();
    };

    const renderNotifies = (info: ListRenderItemInfo<Helpers>): React.ReactElement => (
        <Card style={styles.itemFooter}>
            <Text>{'Name Helper: ' + info.item?.user?.name}</Text>
            <Text>{'Status: ' + info.item?.status}</Text>
            <Text>{'Number phone: ' + info.item?.user?.numberPhone}</Text>
        </Card>
    );

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.circle}>
                <View>
                    <TouchableOpacity style={styles.layoutCircle} onPress={onCancel}>
                        <Image source={require('./assets/power-on.png')} style={{ height: 48, width: 48 }} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Image
                source={require('./assets/listHelper.png')}
                style={{ width: 120, height: 120, alignSelf: 'center', marginTop: -400 }}
            />

            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h3">
                    List Helper
                </Text>
                <Divider style={styles.divider} />
            </View>

            <List contentContainerStyle={styles.notifyList} data={helpers} numColumns={1} renderItem={renderNotifies} />
            <View>
                <Button style={styles.updateButton} size="large" onPress={onBackPress}>
                    Helped
                </Button>
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
        marginTop: 15,
    },
    divider: {
        flex: 1,
    },
    updateButton: {
        marginVertical: 24,
        marginHorizontal: 16,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    circle: {
        marginRight: -40,
        marginTop: 10,
    },
    layoutCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: 70,
        borderRadius: 30,
        marginLeft: 330,
    },
});

export default DetailHelper;
