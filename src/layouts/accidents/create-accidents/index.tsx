import React from 'react';

import { KeyboardAvoidingView } from '../../auth/sign-in/extra/3rd-party';

import * as yup from 'yup';
import { Button, Divider, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { Image, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/form-inputs/input-field';
import { useAppDispatch, useCurrentGPSPosition } from '../../../services/hooks';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { ArrowForwardIconOutLineLeftSide } from '../../users/change-password/extra/icons';
import { AccidentsProps } from '../../../services/requests/types';
import { accidentsActions } from '../../../actions/accidents-ations';

const accidentsSchema = yup.object().shape({
    nameAccident: yup.string().required('Name Accidents is required'),
    description: yup.string().required('Description is required'),
});
const initValues: AccidentsProps = {
    nameAccident: '',
    description: '',
    latitude: '',
    longitude: '',
    accidentType: '618d6fdcd3efba10347ef4ab',
};

const CreateAccidents = ({ navigation }: any): React.ReactElement => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<AccidentsProps>({
        resolver: yupResolver(accidentsSchema),
        defaultValues: initValues,
    });
    const { location } = useCurrentGPSPosition();
    const dispatch = useAppDispatch();
    const styles = useStyleSheet(themedStyles);

    const onBackPress = (): void => {
        navigation &&
            navigation.navigate('Home', {
                screen: 'Utilities',
                params: {
                    screen: 'ViewUtilities',
                },
            });
    };

    const onCreatePress = (value: AccidentsProps) => {
        console.log(value);
        if (location !== undefined) {
            dispatch(
                accidentsActions.create({
                    nameAccident: value.nameAccident,
                    description: value.description,
                    latitude: String(location.coords.latitude),
                    longitude: String(location.coords.longitude),
                    accidentType: value.accidentType,
                })
            );
        }
        navigation &&
            navigation.navigate('Home', {
                screen: 'Dashboard',
                params: { screen: 'DetailHelper' },
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
                    onPress={onBackPress}
                >
                    Back
                </Button>
            </View>
            <Image
                source={require('./assets/healthy-care.png')}
                style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 15 }}
            />
            <View style={styles.orContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.orLabel} category="h3">
                    Accidents
                </Text>
                <Divider style={styles.divider} />
            </View>

            <View style={[styles.container, styles.formContainer]}>
                <InputField label={'Name Accidents'} name={'nameAccident'} control={control} />
                <InputField label={'Description'} name={'description'} control={control} />
            </View>

            <Button
                style={styles.createButton}
                size="large"
                onPress={handleSubmit(onCreatePress)}
                accessoryRight={() => LoadingIndicator({ isLoading: isSubmitting })}
            >
                Create
            </Button>
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
    socialAuthHintText: {
        alignSelf: 'center',
        marginBottom: 16,
    },
    formContainer: {
        marginTop: 48,
        paddingHorizontal: 16,
    },
    formInput: {
        marginTop: 16,
    },
    createButton: {
        marginVertical: 24,
        marginHorizontal: 16,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 15,
    },
    divider: {
        flex: 1,
    },
    orLabel: {
        marginHorizontal: 8,
    },

    backButton: {
        maxWidth: 80,
        paddingHorizontal: 0,
    },

    iconSetting: {
        maxWidth: 350,
        paddingHorizontal: 0,
        alignSelf: 'center',
        marginBottom: 16,
    },
});
export default CreateAccidents;
