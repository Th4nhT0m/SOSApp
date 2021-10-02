import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import { SpinnerProps } from '@ui-kitten/components/ui/spinner/spinner.component';

export interface LoadingIndicatorProps {
    style?: ViewStyle;
    spinnerProps?: SpinnerProps;
    isLoading?: boolean;
}

export const LoadingIndicator = (props: LoadingIndicatorProps): any =>
    props.isLoading ? (
        <View style={[props.style, styles.indicator]}>
            <Spinner size="small" {...props.spinnerProps} />
        </View>
    ) : null;

const styles = StyleSheet.create({
    button: {
        margin: 2,
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
