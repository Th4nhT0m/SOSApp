import React from 'react';
import { useAppSelector } from '../../../services/hooks';
import { Helpers } from '../../../services/requests/types';
import { Dimensions, Image, ListRenderItemInfo, View } from 'react-native';
import { Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { ArrowForwardIconOutLineLeftSide } from '../../users/view-user/extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { DoneAllIcon } from '../../../components/Icons';
// import call from 'react-native-phone-call';

const HelperHistoryByAccident = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);

    const setHelper = useAppSelector((state) => state.helpersReducer.dateList);

    const helpers: Helpers[] = setHelper.results.map((pops) => ({
        id: pops.id,
        user: pops.user,
        accident: pops.accident,
        status: pops.status,
        helperLatitude: pops.helperLatitude,
        helperLongitude: pops.helperLongitude,
        accidentLatitude: pops.accidentLatitude,
        accidentLongitude: pops.accidentLongitude,
        content: pops.content,
        createTime: pops.createTime,
        UpdateTime: pops.UpdateTime,
        timeOut: pops.timeOut,
    }));

    const setbackButtonPress = () => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Settings',
                params: {
                    screen: 'AccidentHistory',
                },
            });
    };

    // const tell = (args: string | undefined) => {
    //     call(args);
    // };

    const renderNotifies = (info: ListRenderItemInfo<Helpers>): React.ReactElement => (
        <Card style={styles.list}>
            <Text>{'Name : ' + info.item?.user?.name}</Text>
            <Text>{'Status : ' + info.item?.status}</Text>
            <Text>{'Number phone: ' + info.item?.user?.numberPhone}</Text>
            <Text>{'Address : ' + info.item?.user?.address}</Text>

            {/*<Button*/}
            {/*    style={styles.iconButton}*/}
            {/*    size="small"*/}
            {/*    accessoryLeft={DoneAllIcon}*/}
            {/*    onPress={() => tell(info.item?.user?.address)}*/}
            {/*/>*/}
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer as any}>
                <Button
                    style={styles.backButton}
                    appearance="ghost"
                    status="control"
                    size="giant"
                    accessoryLeft={ArrowForwardIconOutLineLeftSide}
                    onPress={setbackButtonPress}
                >
                    Back
                </Button>
            </View>

            <Image
                source={require('./assets/List.png')}
                style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 20 }}
            />

            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h4">
                    List Helper
                </Text>
                <Divider style={styles.divider} />
            </View>

            <List contentContainerStyle={styles.notifyList} data={helpers} numColumns={1} renderItem={renderNotifies} />
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
        marginTop: 20,
    },
    divider: {
        flex: 1,
    },
    list: {
        marginTop: 20,
    },
    headerContainer: {
        minHeight: 20,
        paddingHorizontal: 16,
        backgroundColor: '#20b2aa',
    },
    orLabel: {
        marginHorizontal: 8,
    },
    notifyList: {
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    backButton: {
        maxWidth: 80,
        paddingHorizontal: 0,
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

export default HelperHistoryByAccident;
