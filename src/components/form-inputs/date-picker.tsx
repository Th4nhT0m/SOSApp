import React from 'react';
import { Datepicker as DatePickerRN, DatepickerProps as DatepickerPropsRN } from '@ui-kitten/components';
import { FieldProps, getIn } from 'formik';
import { View, ViewProps } from 'react-native';

export interface DatePickerProps {
    handleChange: () => void;
    handleBlur: () => void;
    containerProps?: ViewProps;
}

const DatePicker: React.FC<FieldProps<DatepickerPropsRN> & DatepickerPropsRN & DatePickerProps> = (props) => {
    const isTouched = getIn(props.form.touched, props.field.name);
    const errorMessage = getIn(props.form.errors, props.field.name);

    const { caption, label, handleBlur, handleChange, containerProps, ...rest } = props;

    return (
        <View {...containerProps}>
            <DatePickerRN
                label={label ?? 'DatePicker'}
                style={{ width: '100%' }}
                status={isTouched && errorMessage ? 'danger' : 'basic'}
                caption={caption ?? (isTouched && errorMessage ? errorMessage : undefined)}
                onBlur={handleBlur}
                onSelect={() => handleChange()}
                date={props.field.value.date}
                {...rest}
            />
        </View>
    );
};

export default DatePicker;
