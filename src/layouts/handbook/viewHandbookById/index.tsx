import { Dimensions, View } from 'react-native';
import { Button, Divider, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import React from 'react';
import { KeyboardAvoidingView } from './axtra/3rd-party';
import { ArrowForwardIconOutLineLeftSide } from './axtra/incons';

const window = Dimensions.get('window');

const ViewHandbookById = ({ navigation }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const getDateHandbook = useAppSelector((state) => state.handbooks.dateGet);
    const styles = useStyleSheet(themedStyles);

    const onBackButtonPress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Utilities',
                params: {
                    screen: 'GetHandbook',
                },
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
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

            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h4">
                    {getDateHandbook.nameHandbook}
                </Text>
                <Divider style={styles.divider} />
            </View>

            <View style={styles.orContainerSeverity}>
                <Text style={styles.orLabel} category="h6">
                    {getDateHandbook.severity}
                </Text>
            </View>

            <View style={styles.orContainerUtensil}>
                <Text style={styles.orLabel}>
                    <Text style={styles.orLabelUtensil} category="h6">
                        Utensil
                    </Text>
                    <Text style={styles.onLabelConduct}>: {getDateHandbook.utensil}</Text>
                </Text>
            </View>

            <View style={styles.orContainerContent}>
                <Text style={styles.orLabel}>
                    <Text style={styles.orLabelUtensil} category="h6">
                        Conduct :
                    </Text>
                </Text>
            </View>

            <View style={styles.orLabelText}>
                <Text style={styles.orLabel}>
                    <Text style={styles.orLabel}>{getDateHandbook.content}</Text>
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ViewHandbookById;

const themedStyles = StyleService.create({
    backButton: {
        maxWidth: 80,
        paddingHorizontal: 0,
    },
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    divider: {
        flex: 1,
    },
    divide: {
        flex: 1,
        marginTop: 20,
        //  backgroundColor: '#20b2aa',
    },
    orLabel: {
        marginHorizontal: 15,
    },
    orLabelText: {
        marginHorizontal: 40,
    },
    onLabelConduct: {
        marginHorizontal: 12,
    },
    headerContainer: {
        minHeight: 20,
        paddingHorizontal: 16,
        backgroundColor: '#20b2aa',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 30,
    },
    orLabelUtensil: {
        marginHorizontal: 12,
        fontWeight: 'bold',
    },
    orContainerSeverity: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginHorizontal: 15,
        marginTop: 20,
    },
    orContainerUtensil: {
        flexDirection: 'row',
        marginTop: 50,
        marginHorizontal: 15,
    },
    orContainerContent: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginTop: 10,
    },
});
