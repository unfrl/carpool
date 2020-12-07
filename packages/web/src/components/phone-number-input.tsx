import React, { FunctionComponent } from "react";
import { TextField } from "@material-ui/core";
import MaskedInput from "react-text-mask";

export interface IPhoneNumberInputProps {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    style?: React.CSSProperties;
    label?: string;
}

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[1-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={"\u2000"}
            showMask={false}
        />
    );
}

export const PhoneNumberInput: FunctionComponent<IPhoneNumberInputProps> = props => {
    const { value, onChange, ...rest } = props;

    return (
        <TextField
            value={value}
            onChange={e => onChange(e.target.value)}
            InputProps={{ inputComponent: TextMaskCustom }}
            variant="outlined"
            margin="normal"
            // {...rest}
        />
    );
};
