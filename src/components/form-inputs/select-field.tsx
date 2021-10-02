import React from 'react';
import { FieldProps, getIn } from 'formik';
import { Layout, Select, SelectItem, SelectProps } from '@ui-kitten/components';
import { SelectItemProps } from '@ui-kitten/components/ui/select/selectItem.component';
import { ViewProps } from 'react-native';

export interface SelectFieldProps {
    options: {
        title: string;
        itemProps?: SelectItemProps;
    }[];
    handleChange: () => void;
    handleBlur: () => void;
    containerProps?: ViewProps;
}

const SelectField: React.FC<FieldProps<SelectProps> & SelectFieldProps> = (props) => {
    const isTouched = getIn(props.form.touched, props.field.name);
    const errorMessage = getIn(props.form.errors, props.field.name);

    const { options, field, handleBlur, handleChange, ...rest } = props;
    const { label, value, caption, ...fields } = field.value;

    return (
        <Layout level="1">
            <Select
                caption={caption ?? (isTouched && errorMessage ? errorMessage : undefined)}
                status={isTouched && errorMessage ? 'danger' : 'basic'}
                label={label ?? 'SelectField'}
                onSelect={handleChange}
                {...rest}
                value={value}
                onBlur={handleBlur}
            >
                {options.map((obj, index) => (
                    <SelectItem key={index} title={obj.title} {...obj.itemProps} />
                ))}
            </Select>
        </Layout>
    );
};

export default SelectField;
