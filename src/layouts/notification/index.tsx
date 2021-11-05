import React from 'react';
import { Avatar, Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Alert, Dimensions, ListRenderItemInfo, View } from 'react-native';
import { DoneAllIcon } from '../../components/Icons';
import { useAppDispatch, useAppSelector, useCurrentGPSPosition } from '../../services/hooks';
import { accidentsActions } from '../../actions/accidents-ations';
import { Accidents } from '../../services/requests/types';
import { DetailAccidentsAction } from '../../actions/details-accident-actions';
const Notification = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const { location } = useCurrentGPSPosition();
    const setAccidents = useAppSelector((state) => state.accidents.data);
    const getUser = useAppSelector((state) => state.users.currentUser.id);
    React.useEffect(() => {
        dispatch(accidentsActions.getAllAccidents());
    }, [dispatch]);

    const notifies: Accidents[] = setAccidents.results.map((pops) => ({
        id: pops.id,
        nameAccident: pops.nameAccident,
        description: pops.description,
        latitude: pops.latitude,
        longitude: pops.longitude,
        created_by: pops.created_by,
        modified_by: pops.modified_by,
        accidentType: pops.accidentType,
        timeStart: pops.timeStart,
    }));

    const setOnAccidents = (id: string): void => {
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
                        console.log(location.coords.latitude + ' ' + location.coords.latitude);
                        console.log(id);
                        console.log(getUser);
                        dispatch(
                            DetailAccidentsAction.creatDetails({
                                accident: id,
                                user: getUser,
                                latitude: String(location.coords.latitude),
                                longitude: String(location.coords.longitude),
                            })
                        );
                        console.log('Success');
                        onScreen();
                    }
                },
            },
        ]);
    };
    const onDetailProgress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Setting',
                params: { screen: 'DetailProgress' },
            });
        console.log('Susses');
        navigation && navigation.navigate('Setting');
    };

    const renderItemFooter = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <View style={styles.itemFooter}>
            <Text category="s1">{'Time created: ' + info.item?.timeStart}</Text>
            <Button
                style={styles.iconButton}
                size="small"
                accessoryLeft={DoneAllIcon}
                // onPress={() => {
                //     setOnAccidents(info.item.id);
                // }}
                onPress={onDetailProgress}
            />
        </View>
    );

    const renderNotifies = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <Card footer={() => renderItemFooter(info)}>
            <View style={styles.itemHeader}>
                <Avatar size="giant" source={require('../../assets/images/icon-avatar.png')} />
                <View>
                    <Text category="s2">{'Name Accident: ' + info.item?.nameAccident}</Text>
                    <Text category="s1">{'User created: ' + info.item?.created_by}</Text>
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
