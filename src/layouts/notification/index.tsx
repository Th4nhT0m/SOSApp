import React from 'react';
import { Avatar, Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Alert, Dimensions, ListRenderItemInfo, View } from 'react-native';
import { DoneAllIcon, phoneIcon, reload } from '../../components/Icons';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../services/hooks';
import { accidentsActions } from '../../actions/accidents-ations';
import { Accidents } from '../../services/requests/types';
import getDistance from 'geolib/es/getPreciseDistance';
import { HelperAction } from '../../actions/helper-actions';
import moment from 'moment';
import call from 'react-native-phone-call';
// import { io } from 'socket.io-client';
import { ArrowForwardIconOutLineLeftSide } from '../users/view-user/extra/icons';

const Notification = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();
    // const socket = io('http://192.168.1.9:3000');
    const setAccidents = useAppSelector((state) => state.accidents.dateList);
    const getUser = useAppSelector((state) => state.users.currentUser.id);
    const nullAccident: Accidents[] = [];
    const [acc, setAcc] = React.useState(nullAccident);
    let cont = 1;
    React.useEffect(() => {
        dispatch(accidentsActions.getAllAccidents());
    }, [dispatch]);
    // React.useEffect(() => {
    //     while (cont !== 0) {
    //         onBackButtonPress();
    //     }
    // }, []);    // React.useEffect(() => {
    //     while (cont !== 0) {
    //         onBackButtonPress();
    //     }
    // }, []);

    let notifies: Accidents[] = setAccidents.results.map((pops) => ({
        id: pops.id,
        nameAccident: pops.nameAccident,
        description: pops.description,
        latitude: pops.latitude,
        longitude: pops.longitude,
        created_by: pops.created_by,
        modified_by: pops.modified_by,
        accidentType: pops.accidentType,
        status: pops.status,
        createTime: pops.createTime,
        UpdateTime: pops.UpdateTime,
    }));

    notifies = notifies
        .filter(function (item) {
            return item.status === 'Waiting' && item.created_by?.id !== getUser;
        })
        .map(function ({
            id,
            nameAccident,
            description,
            latitude,
            longitude,
            created_by,
            modified_by,
            accidentType,
            status,
            createTime,
            UpdateTime,
        }) {
            return {
                id,
                nameAccident,
                description,
                latitude,
                longitude,
                created_by,
                modified_by,
                accidentType,
                status,
                createTime,
                UpdateTime,
            };
        });

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
                        // socket.disconnect();
                        navigation &&
                            navigation.navigate('Home', {
                                screen: 'Notification',
                                params: { screen: 'DetailProgress' },
                            });
                        cont = 0;
                        // notifies = [];
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

    const triggerCall = (inputValue: string | undefined) => {
        const args = {
            number: inputValue,
            prompt: true,
        };
        call(args).catch(console.error);
    };

    const onBackButtonPress = (): void => {
        dispatch(accidentsActions.getAllAccidents());
    };

    const renderItemFooter = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <View style={styles.itemFooter}>
            <Text category="s1">
                {'Distance: ' + calculateDistance(info.item?.latitude, info.item?.longitude) / 1000 + ' KM'}
            </Text>
            <Button
                style={styles.iconButton}
                size="small"
                accessoryLeft={DoneAllIcon}
                onPress={() => {
                    setOnAccidents(info.item.id, info.item?.latitude, info.item?.longitude);
                }}
            />
        </View>
    );

    const renderNotifies = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <Card style={styles.list} footer={() => renderItemFooter(info)}>
            <View style={styles.itemHeader}>
                <Avatar size="giant" source={require('../../assets/images/icon-avatar.png')} />
                <View style={styles.name}>
                    <Text category="s1">{'User name: ' + info.item?.created_by?.name}</Text>
                    <Text category="s1">
                        {'Time: ' + moment(info.item?.createTime).format('DD/MM/YYYY hh:mm:ss a')}
                    </Text>
                </View>
            </View>

            <Divider />
            <View style={styles.itemPhone}>
                <Text category="s1">{'Name accident: ' + info.item?.nameAccident}</Text>
                <Button
                    style={styles.iconPhone}
                    size="small"
                    accessoryLeft={phoneIcon}
                    onPress={() => {
                        triggerCall(info.item.created_by?.numberPhone);
                    }}
                />
            </View>
            <Text style={{ marginTop: 15 }}>{'Status: ' + info.item?.status}</Text>
            <Text style={{ marginTop: 15 }}>{'Description: ' + info.item?.description}</Text>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Button
                style={styles.backButton}
                appearance="ghost"
                status="control"
                size="giant"
                accessoryLeft={reload}
                onPress={onBackButtonPress}
            >
            </Button>
            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h3">
                    List Accident
                </Text>
                <Divider style={styles.divider} />
            </View>

            <List
                contentContainerStyle={styles.notifyList}
                data={notifies}
                numColumns={1}
                renderItem={renderNotifies}
            />
        </View>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    backButton: {
        maxWidth: 90,
        paddingHorizontal: 0,
    },
    orLabel: {
        marginHorizontal: 8,
    },
    notifyList: {
        paddingHorizontal: 8,
        paddingVertical: 16,
        marginTop: 10,
    },
    divider: {
        flex: 1,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 20,
    },
    productItem: {
        flex: 1,
        margin: 8,
        maxWidth: Dimensions.get('window').width / 2 - 24,
        backgroundColor: 'background-basic-color-1',
    },
    itemHeader: {
        height: 80,
        padding: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    list: {
        marginTop: 30,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },

    itemPhone: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    name: {
        left: 10,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    iconPhone: {
        paddingHorizontal: 0,
        left: 4,
    },
});

export default Notification;
