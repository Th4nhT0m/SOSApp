import React from 'react';
import ViewHandbook from '../../layouts/handbook/viewHandbook';
import { SafeAreaLayout } from '../../components/safe-area-layout';
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const HandbookViewScreen = ({ navigation }: any): React.ReactElement => <ViewHandbook navigation={navigation} />;
