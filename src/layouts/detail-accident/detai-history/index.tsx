import React from 'react';
import { Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Dimensions, ListRenderItemInfo, View, Image } from 'react-native';
import { Helpers } from '../../../services/requests/types';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { HelperAction } from '../../../actions/helper-actions';
import moment from 'moment';
import { ArrowForwardIconOutLineLeftSide } from '../../users/view-user/extra/icons';

const ViewHistoryHelper = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themeStyles);
    const dispatch = useAppDispatch();

    const setHistoryHelper = useAppSelector((state) => state.helpersReducer.dateList);

    React.useEffect(() => {
        dispatch(HelperAction.getMyHistoryHelper());
    }, [dispatch]);

    const historyHelperNotifies: Helpers[] = setHistoryHelper.results.map((props) => ({
        id: props.id,
        user: props.user,
        accident: props.accident,
        status: props.status,
        helperLatitude: props.helperLatitude,
        helperLongitude: props.helperLongitude,
        accidentLatitude: props.accidentLatitude,
        accidentLongitude: props.accidentLongitude,
        content: props.content,
        timeOut: props.timeOut,
        createTime: props.createTime,
        UpdateTime: props.UpdateTime,
    }));

    const renderNotifies = (info: ListRenderItemInfo<Helpers>): React.ReactElement => (
        <Card style={styles.list}>
            <View style={styles.itemHeader}>
                <View>
                    <Text category="h6">{'Name accident: ' + info.item?.content}</Text>
                    <Text category="p2">{'Status: ' + info.item?.status}</Text>
                    <Text category="p2">{'Name: ' + info.item?.user?.name}</Text>
                </View>
            </View>
            <Divider />
            <View style={{ marginTop: 15 }}>
                <Text>{'Time : ' + moment(info.item?.createTime).format('DD/MM/YYYY hh:mm:ss a')}</Text>
            </View>
        </Card>
    );

    const onBackButtonPress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Settings',
                params: {
                    screen: 'Setting',
                },
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer as any}>
                <Button
                    style={styles.backButton}
                    appearance="ghost"
                    status="control"
                    size="giant"
                    accessoryLeft={ArrowForwardIconOutLineLeftSide}
                    onPress={onBackButtonPress}
                >
                    Back
                </Button>
            </View>

            <Image
                source={require('./assets/historyHelper.png')}
                style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 10 }}
            />

            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h3">
                    Helper history
                </Text>
                <Divider style={styles.divider} />
            </View>

            <List
                contentContainerStyle={styles.notifyList}
                data={historyHelperNotifies}
                numColumns={1}
                renderItem={renderNotifies}
            />
        </View>
    );
};

const themeStyles = StyleService.create({
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
    notifyList: {
        paddingHorizontal: 8,
        paddingVertical: 16,
    },
    divider: {
        flex: 1,
    },
    orLabel: {
        marginHorizontal: 8,
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
    divi: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#20b2aa',
    },

    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    list: {
        marginTop: 20,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    backButton: {
        maxWidth: 80,
        paddingHorizontal: 0,
    },
    textR: {
        marginTop: 20,
        alignItems: 'center',
    },
    headerContainer: {
        minHeight: 20,
        paddingHorizontal: 16,
        backgroundColor: '#20b2aa',
    },
});

export default ViewHistoryHelper;
