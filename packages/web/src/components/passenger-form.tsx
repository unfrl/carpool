import React, { FunctionComponent, useState, Fragment } from "react";
import { TextField, Typography, makeStyles } from "@material-ui/core";

import { CreatePassengerDto, CreateUserPassengerDto } from "@carpool/core";
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
    isUserAuthenticated: boolean;
    onSave: (dto: CreatePassengerDto | CreateUserPassengerDto) => void;
    onCancel: () => void;
}

export interface IPassengerFormState {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
}

export const PassengerForm: FunctionComponent<IPassengerFormProps> = props => {
    const classes = useStyles();
    const [state, setState] = useState<IPassengerFormState>({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
    });

    const canSave = Boolean(
        state.address && (props.isUserAuthenticated || (state.name && state.email))
    );

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
            {!props.isUserAuthenticated && (
                <Fragment>
                    <TextField
                        value={state.name}
                        onChange={e => setState({ ...state, name: e.target.value })}
                        variant="outlined"
                        margin="normal"
                        required={true}
                        label="Name"
                    />
                    <TextField
                        value={state.email}
                        onChange={e => setState({ ...state, email: e.target.value })}
                        variant="outlined"
                        margin="normal"
                        type="email"
                        required={true}
                        label="Email"
                    />
                </Fragment>
            )}
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
