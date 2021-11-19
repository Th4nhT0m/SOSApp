import React from 'react';
import { Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Dimensions, ListRenderItemInfo, View, Image } from 'react-native';
import { handbookActions } from '../../../actions/handbook-actions';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { Handbook } from '../../../services/requests/types';
import { KeyboardAvoidingView } from './extra/3rd-party';

const ViewHandbook = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);
    const dispatch = useAppDispatch();
    const setHandbooks = useAppSelector((state) => state.handbooks.data);

    React.useEffect(() => {
        dispatch(handbookActions.getAllHandBook());
    }, [dispatch]);

    const handbookNotifies: Handbook[] = setHandbooks.results.map((props) => ({
        id: props.id,
        content: props.content,
        nameHandbook: props.nameHandbook,
        severity: props.severity,
        icon: props.icon,
        utensil: props.utensil,
    }));

    const setOnHandbook = (id: string): void => {
        dispatch(handbookActions.getHandbookById(id));
        navigation &&
            navigation.navigate('Home', {
                screen: 'Handbook',
                params: {
                    screen: 'HandbookById',
                },
            });
    };

    const renderNotifies = (info: ListRenderItemInfo<Handbook>): React.ReactElement => (
        <Card
            onPress={() => {
                setOnHandbook(info.item.id);
            }}
        >
            <View style={styles.itemHeader}>
                <View>
                    <Text category="s1">{info.item?.nameHandbook}</Text>
                    <Text category="s2">{'Severity:  ' + info.item?.severity}</Text>
                </View>
            </View>
        </Card>
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h5">
                    First aid handbook
                </Text>
                <Divider style={styles.divider} />
            </View>

            <Image
                source={require('./assets/bookIcon.png')}
                style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 30 }}
            />

            <View style={styles.divide}>
                <Divider style={styles.divideColor} />
            </View>

            <List
                contentContainerStyle={styles.notifyList}
                data={handbookNotifies}
                numColumns={1}
                renderItem={renderNotifies}
            />
        </KeyboardAvoidingView>
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
        marginTop: 20,
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
        padding: 10,
        marginBottom: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    divide: {
        marginTop: 40,
        backgroundColor: '#20b2aa',
    },
    divideColor: {
        backgroundColor: '#20b2aa',
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

export default ViewHandbook;