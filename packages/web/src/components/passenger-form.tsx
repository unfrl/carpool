import React, { FunctionComponent, useState } from "react";
import { Typography, makeStyles } from "@material-ui/core";

import { UpsertPassengerDto, isValidPhoneNumber } from "@carpool/core";
import { AddressSearch, FormActions, PhoneNumberInput } from ".";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2, 0),
    },
}));

export interface IPassengerFormProps {
    onSave: (dto: UpsertPassengerDto) => void;
    onCancel: () => void;
}

export interface IPassengerFormState {
    phoneNumber: string;
    address: string;
}

export const PassengerForm: FunctionComponent<IPassengerFormProps> = props => {
    const classes = useStyles();
    const [state, setState] = useState<IPassengerFormState>({
        phoneNumber: "",
        address: "",
    });

    const canSave = () => {
        if (!state.address) {
            return false;
        }

        if (!state.phoneNumber) {
            return true; // phone number not required
        }

        // but if it's supplied, it needs to be in correct format
        return isValidPhoneNumber(state.phoneNumber);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (canSave()) {
            props.onSave(state);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <Typography align="center" variant="subtitle1">
                Almost ready to join! <br />
                We just need a few details for the driver.
            </Typography>
            <AddressSearch
                value={state.address}
                onChange={val => setState({ ...state, address: val })}
                required={true}
                placeholder="Search for your pickup location"
                autoFocus={true}
            />
            <PhoneNumberInput
                value={state.phoneNumber}
                onChange={val => setState({ ...state, phoneNumber: val })}
                label="Phone Number"
            />
            <FormActions onCancel={props.onCancel} canSave={canSave()} confirmText="Join" />
        </form>
    );
};
