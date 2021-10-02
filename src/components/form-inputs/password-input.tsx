import React from 'react';
import { FieldProps, getIn } from 'formik';
import { TouchableWithoutFeedback, View, ViewProps } from 'react-native';
import { Icon, IconProps, Input } from '@ui-kitten/components';
import { InputProps } from '@ui-kitten/components/ui/input/input.component';

interface InputFieldProps {
    handleChange: () => void;
    handleBlur: () => void;
    containerProps?: ViewProps;
}

const PasswordInput: React.FC<FieldProps<InputProps> & InputProps & InputFieldProps> = (props) => {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const isTouched = getIn(props.form.touched, props.field.name);
    const errorMessage = getIn(props.form.errors, props.field.name);

    const { caption, label, handleChange, handleBlur, containerProps, ...rest } = props;

    const renderIcon = (p: IconProps) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...p} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    return (
        <View {...containerProps}>
            <Input
                label={label ?? 'Password'}
                status={isTouched && errorMessage ? 'danger' : 'basic'}
                caption={caption ?? (isTouched && errorMessage ? errorMessage : undefined)}
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                onBlur={handleBlur}
                onChange={handleChange}
                onChangeText={handleChange}
                value={props.field.value.value}
                {...rest}
            />
        </View>
    );
};
export default PasswordInput;
