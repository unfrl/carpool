import React, { FunctionComponent, useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import { CarpoolDto } from "@carpool/core";
import { AddressSearch, LoadingButton } from ".";

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
    onSave: (carpoolDto: CarpoolDto) => void;
    onCancel: () => void;
    saving: boolean;
    existingCarpool?: CarpoolDto;
}

export interface ICarpoolFormState extends CarpoolDto {}

export const CarpoolForm: FunctionComponent<ICarpoolFormProps> = props => {
    const classes = useStyles();
    const { existingCarpool } = props;
    const [state, setState] = useState<ICarpoolFormState>(
        existingCarpool || {
            carpoolName: "",
            dateTime: new Date(),
            destination: "",
        }
    );

    const isEditing = !!existingCarpool;
    const canSave = Boolean(state.carpoolName && state.dateTime && state.destination);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (canSave) {
            props.onSave(state);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={state.carpoolName}
                onChange={e => setState({ ...state, carpoolName: e.target.value })}
                variant="outlined"
                margin="normal"
                fullWidth={true}
                required={true}
                autoFocus={true}
            />
            <AddressSearch
                value={state.destination}
                onChange={val => setState({ ...state, destination: val })}
                required={true}
            />
            <DateTimePicker
                value={state.dateTime}
                onChange={date => date && setState({ ...state, dateTime: date.toDate() })}
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
                    disabled={!canSave}
                    text={isEditing ? "Save" : "Create"}
                    loading={props.saving}
                />
                <Button variant="text" className={classes.cancel} onClick={props.onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
