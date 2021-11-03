import React from 'react';
import { Avatar, Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Dimensions, ListRenderItemInfo, View } from 'react-native';
import { DoneAllIcon } from '../../components/Icons';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { accidentsActions } from '../../actions/accidents-ations';
import { Accidents } from '../../services/requests/types';
const Notification = (): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const setAccidents = useAppSelector((state) => state.accidents.data);

    React.useEffect(() => {
        dispatch(accidentsActions.getAllAccidents());
    }, [dispatch]);

    // const setOnAccidents = () => {
    //
    // };
    const notifies: Accidents[] = setAccidents.results.map((pops) => ({
        id: pops.id,
        nameAccident: pops.nameAccident,
        latitude: pops.latitude,
        longitude: pops.longitude,
        created_by: pops.created_by,
        modified_by: pops.modified_by,
        description: pops.description,
        timeStart: pops.timeStart,
    }));

    const renderItemFooter = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <View style={styles.itemFooter}>
            {/*<Text category="s1">{info.item?.latitude + ' ' + info.item?.longitude}</Text>*/}
            <Text category="s1">{info.item?.timeStart}</Text>
            <Button style={styles.iconButton} size="small" accessoryLeft={DoneAllIcon} />
        </View>
    );

    const renderNotifies = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <Card footer={() => renderItemFooter(info)}>
            <View style={styles.itemHeader}>
                <Avatar size="giant" source={require('../../assets/images/icon-avatar.png')} />
                <View>
                    <Text category="s2">{info.item?.nameAccident}</Text>
                    <Text category="s1">{info.item?.description}</Text>
                    <Text category="s1">{'User created: ' + info.item?.timeStart}</Text>
                </View>
            </View>
            <Divider />
            <Text style={{ marginTop: 15 }}>{'Status: ' + info.item?.status}</Text>
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
