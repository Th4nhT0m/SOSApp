import React from 'react';
import { Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Dimensions, ListRenderItemInfo, View, Image } from 'react-native';
import { accidentsActions } from '../../../actions/accidents-ations';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { Accidents } from '../../../services/requests/types';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { ArrowForwardIconOutLineLeftSide } from '../../users/view-user/extra/icons';
import moment from 'moment';
import { HelperAction } from '../../../actions/helper-actions';

const ViewHistoryAccident = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const setHistoryAccident = useAppSelector((state) => state.accidents.dateList);

    React.useEffect(() => {
        dispatch(accidentsActions.getHistoryAccident());
    }, [dispatch]);

    const historyAccidentNotifies: Accidents[] = setHistoryAccident.results.map((props) => ({
        id: props.id,
        status: props.status,
        nameAccident: props.nameAccident,
        description: props.description,
        accidentType: props.accidentType,
        latitude: props.latitude,
        longitude: props.longitude,
        created_by: props.created_by,
        modified_by: props.modified_by,
        createTime: props.createTime,
        UpdateTime: props.UpdateTime,
    }));

    const setOnHelper = (id: string): void => {
        dispatch(HelperAction.getHelperByIDAccident(id));
        navigation &&
            navigation.navigate('Home', {
                screen: 'Settings',
                params: {
                    screen: 'HelperHistoryInAccident',
                },
            });
    };

    const renderNotifies = (info: ListRenderItemInfo<Accidents>): React.ReactElement => (
        <Card
            style={styles.list}
            onPress={() => {
                setOnHelper(info.item.id);
            }}
        >
            <View style={styles.itemHeader}>
                <View>
                    <Text category="h6">{info.item?.nameAccident}</Text>
                    <Text category="p2">{'Status:  ' + info.item?.status}</Text>
                </View>
            </View>
            <Divider />

            <View style={{ marginTop: 15 }}>
                <Text>{'Description: ' + info.item?.description}</Text>
                <Text>{'Time created: ' + moment(info.item?.createTime).format('DD/MM/YYYY hh:mm:ss a')}</Text>
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
                source={require('./assets/accidentIcon.png')}
                style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20 }}
            />

            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h3">
                    Accident history
                </Text>
                <Divider style={styles.divider} />
            </View>

            <List
                contentContainerStyle={styles.notifyList}
                data={historyAccidentNotifies}
                numColumns={1}
                renderItem={renderNotifies}
            />
        </View>
    );
};
export default ViewHistoryAccident;

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
        marginTop: 40,
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

    headerContainer: {
        minHeight: 20,
        paddingHorizontal: 16,
        backgroundColor: '#20b2aa',
    },
});
