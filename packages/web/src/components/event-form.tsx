import React, { FunctionComponent, useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
    },
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

export interface IEventFormState {
    name: string;
    date: Date;
}

export const EventForm: FunctionComponent = () => {
    const classes = useStyles();
    const [state, setState] = useState<IEventFormState>({
        name: "",
        date: new Date(),
    });

    const canSave = Boolean(state.name && state.date);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className={classes.root}>
            <TextField
                label="Name"
                value={state.name}
                onChange={e => setState({ ...state, name: e.target.value })}
                variant="outlined"
                margin="normal"
                fullWidth={true}
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
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    type="submit"
                    disabled={!canSave}
                >
                    Create
                </Button>
                <Button variant="text" size="small" className={classes.cancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
