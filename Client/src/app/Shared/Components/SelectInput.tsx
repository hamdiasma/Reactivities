import { useController, type FieldValues, type UseControllerProps } from "react-hook-form"
import Select, { type SelectProps } from "@mui/material/Select"
import { FormControl, FormHelperText, InputLabel, MenuItem } from "@mui/material"
import type { ReactNode } from "react";

type Item = {
    text: string;
    value: string;
    icon?: ReactNode; // ✅ icône par item
};

type Props<T extends FieldValues> = {
    items: Item[];
    label: string;
} & UseControllerProps<T> & SelectProps;

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });

    return (
        <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                value={field.value || ""}
                label={props.label}
                onChange={field.onChange}
                renderValue={(selected) => {
                    const option = props.items.find(item => item.value === selected);
                    return (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {option?.icon && <span style={{ marginRight: 8 }}>{option.icon}</span>}
                            {option?.text}
                        </div>
                    );
                }}
            >
                {props.items.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
                        {item.text}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
}
