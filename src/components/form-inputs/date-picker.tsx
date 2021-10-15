import React from 'react';
import { View } from 'react-native';
import { Datepicker, DatepickerProps as DPProps } from '@ui-kitten/components';
import { Control, useController } from 'react-hook-form';

export interface DatePickerProps extends DPProps {
    control: Control<any>;
    name: string;
}

const DatePicker = (props: DatePickerProps) => {
    const { name, control, label, ...rest } = props;
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <View>
            <Datepicker
                label={label}
                date={value}
                onSelect={onChange}
                onBlur={onBlur}
                caption={error?.message}
                status={invalid ? 'danger' : 'basic'}
                {...rest}
            />
        </View>
    );
};

export default DatePicker;
