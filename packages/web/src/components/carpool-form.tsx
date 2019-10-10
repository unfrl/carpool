import React, { FunctionComponent, useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import { NavLink, AddressSearch, LoadingButton } from ".";

const useStyles = makeStyles(theme => ({
    actions: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing(2),
    },
    cancel: {
        marginRight: theme.spacing(1),
    },
}));

export interface ICarpoolFormProps {
    onCreate: (name: string, date: Date, address: string) => void;
    creating: boolean;
}

export interface ICarpoolFormState {
    name: string;
    date: Date;
    address: string;
}

export const CarpoolForm: FunctionComponent<ICarpoolFormProps> = props => {
    const classes = useStyles();
    const [state, setState] = useState<ICarpoolFormState>({
        name: "",
        date: new Date(),
        address: "",
    });

    const canCreate = Boolean(state.name && state.date && state.address);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (canCreate) {
            props.onCreate(state.name, state.date, state.address);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={state.name}
                onChange={e => setState({ ...state, name: e.target.value })}
                variant="outlined"
                margin="normal"
                fullWidth={true}
                required={true}
                autoFocus={true}
            />
            <AddressSearch
                value={state.address}
                onChange={val => setState({ ...state, address: val })}
                required={true}
            />
            <DateTimePicker
                value={state.date}
                onChange={date => date && setState({ ...state, date: date.toDate() })}
                format="MM/DD/YYYY, hh:mm a"
                inputVariant="outlined"
                label="Date"
                required={true}
                showTodayButton={true}
                margin="normal"
                fullWidth={true}
            />
            <div className={classes.actions}>
                <LoadingButton
                    color="primary"
                    type="submit"
                    disabled={!canCreate}
                    text="Create"
                    loading={props.creating}
                />
                <NavLink to="/">
                    <Button variant="text" className={classes.cancel}>
                        Cancel
                    </Button>
                </NavLink>
            </div>
        </form>
    );
};
