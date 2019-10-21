import React, { FunctionComponent, useState, Fragment } from "react";
import { TextField, Typography, makeStyles } from "@material-ui/core";

import { CreateUserPassengerDto } from "@carpool/core";
import { AddressSearch, FormActions } from ".";

const useStyles = makeStyles(theme => ({
    heading: {
        marginBottom: theme.spacing(2),
    },
    root: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2, 0),
    },
}));

export interface IPassengerFormProps {
    onSave: (dto: CreateUserPassengerDto) => void;
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

    const canSave = Boolean(state.address);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (canSave) {
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
                label="Address"
                autoFocus={true}
            />
            {/**TODO: this needs to be a masked input!! */}
            <TextField
                value={state.phoneNumber}
                onChange={e => setState({ ...state, phoneNumber: e.target.value })}
                variant="outlined"
                margin="normal"
                label="Phone Number"
            />
            <FormActions onCancel={props.onCancel} canSave={canSave} confirmText="Join" />
        </form>
    );
};
