import React from 'react';
import { View, Alert, Image } from 'react-native';
import { Button, Divider, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const ViewUtilities = ({ navigation }: any): React.ReactElement => {
    const styles = useStyleSheet(themedStyles);

    const onBackButtonPress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Settings',
                params: {
                    screen: 'Setting',
                },
            });
    };

    const onHandbookButtonPress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Utilities',
                params: {
                    screen: 'GetHandbook',
                },
            });
    };

    const onHospitalButtonPress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Utilities',
                params: {
                    screen: 'Hospitals',
                },
            });
    };

    const onAccidentButtonPress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Utilities',
                params: {
                    screen: 'Accidents',
                },
            });
    };

    const onCarRepairButtonPress = (): void => {
        navigation &&
        navigation.navigate('Home', {
            screen: 'Utilities',
            params: {
                screen: 'ViewCarRepair',
            },
        });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image
                source={require('./assets/menu2.png')}
                style={{ width: 110, height: 110, alignSelf: 'center', marginTop: 30 }}
            />

            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h3">
                    Utilities
                </Text>
                <Divider style={styles.divider} />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.circle}>
                <View>
                    <TouchableOpacity style={styles.layoutCircle} onPress={onAccidentButtonPress}>
                        <Image source={require('./assets/handshake.png')} style={{ height: 55, width: 55 }} />
                    </TouchableOpacity>
                    <Text style={{ alignSelf: 'center', marginTop: 4, left: 15 }}>Accident</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.layoutHandbook} onPress={onHandbookButtonPress}>
                        <Image source={require('./assets/books.png')} style={{ height: 45, width: 45 }} />
                    </TouchableOpacity>
                    <Text style={{ alignSelf: 'center', marginTop: 4 }}>Handbook</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.layoutMapHospital} onPress={onHospitalButtonPress}>
                        <Image source={require('./assets/hospital.png')} style={{ height: 45, width: 45 }} />
                    </TouchableOpacity>
                    <Text style={{ alignSelf: 'center', marginTop: 4 }}>Hospital</Text>
                </View>
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.circle2}>
                <View>
                    <TouchableOpacity style={styles.layoutRepairsMoto} onPress={onCarRepairButtonPress}>
                        <Image source={require('./assets/bike.png')} style={{ height: 55, width: 55 }} />
                    </TouchableOpacity>
                    <Text style={{ alignSelf: 'center', marginTop: 4, left: 15 }}>Car Repair</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.layoutFuel}>
                        <Image source={require('./assets/fuel-pump.png')} style={{ height: 45, width: 45 }} />
                    </TouchableOpacity>
                    <Text style={{ alignSelf: 'center', marginTop: 4 }}>Fuel</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    headerContainer: {
        minHeight: 20,
        paddingHorizontal: 16,
        backgroundColor: '#20b2aa',
    },
    backButton: {
        maxWidth: 80,
        paddingHorizontal: 0,
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
    circle: {
        marginRight: -40,
        marginTop: 30,
    },
    circle2: {
        marginRight: -20,
        marginTop: -60,
    },
    layoutCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: '#5facdb',
        marginLeft: 30,
    },
    layoutRepairsMoto: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: '#ee82ee',
        marginLeft: 30,
    },
    layoutHandbook: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: '#ff5c83',
        marginRight: 30,
        marginLeft: 30,
    },
    layoutFuel: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: '#00ffff',
        marginRight: 30,
        marginLeft: 30,
    },
    layoutMapHospital: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: '#ffa06c',
    },
});

export default ViewUtilities;
