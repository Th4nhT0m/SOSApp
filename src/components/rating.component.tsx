import React from 'react';
import { Dimensions, ListRenderItemInfo, View } from 'react-native';
import { Avatar, Button, Card, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Rating } from 'react-native-ratings';
export interface RatingProps {
    rating: number;
    name: string;
    id: string;
}
export interface ListProps {
    list: RatingProps[];
}
const RatingComponent = (props: ListProps): React.ReactElement => {
    // const { rating, name, ...rest } = props;
    const styles = useStyleSheet(themedStyles);
    React.useEffect(() => {});
    let ratingList: RatingProps[] = props.list.map((prop) => ({
        rating: prop.rating,
        name: prop.name,
        id: prop.id,
    }));

    const ratingCompleted = (rating: number) => {
        console.log('Rating is: ' + rating);
    };

    const renderNotifies = (info: ListRenderItemInfo<RatingProps>): React.ReactElement => (
        <Card style={styles.list}>
            <View style={styles.itemHeader}>
                <Avatar size="giant" source={require('../../assets/images/icon-avatar.png')} />
                <View style={styles.name}>
                    <Text category="s1">{'User name: ' + info.item?.name}</Text>
                </View>
            </View>
            <Divider />
            <Rating
                showRating
                imageSize={40}
                ratingCount={3}
                onFinishRating={ratingCompleted}
                style={{ paddingVertical: 10 }}
            />
        </Card>
    );

    return (
        <View>
            <List data={ratingList} renderItem={renderNotifies} />
        </View>
    );
};
const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
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
    headerContainer: {
        minHeight: 20,
        paddingHorizontal: 16,
        backgroundColor: '#20b2aa',
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
    loaderStyle: {
        marginVertical: 16,
        alignItems: 'center',
    },
});
export default RatingComponent;
