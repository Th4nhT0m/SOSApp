import React from 'react';
import { FieldProps, getIn } from 'formik';
import { InputProps } from '@ui-kitten/components/ui/input/input.component';
import { Input } from '@ui-kitten/components';
import { View, ViewProps } from 'react-native';

interface InputFieldProps {
    handleChange: () => void;
    handleBlur: () => void;
    containerProps?: ViewProps;
}

const InputField: React.FC<FieldProps<InputProps> & InputProps & InputFieldProps> = (props) => {
    const isTouched = getIn(props.form.touched, props.field.name);
    const errorMessage = getIn(props.form.errors, props.field.name);

    const { caption, label, handleBlur, handleChange, containerProps, ...rest } = props;

    return (
        <View {...containerProps}>
            <Input
                label={label ?? 'InputField'}
                style={{ width: '100%' }}
                status={isTouched && errorMessage ? 'danger' : 'basic'}
                caption={caption ?? (isTouched && errorMessage ? errorMessage : undefined)}
                onBlur={handleBlur}
                onChange={handleChange}
                onChangeText={handleChange}
                value={props.field.value.value}
                {...rest}
            />
        </View>
    );
};
export default InputField;
