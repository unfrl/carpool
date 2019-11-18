import React, { FunctionComponent, useState } from "react";
import { AppDialog } from ".";
import { makeStyles, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    actions: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
    },
    account: {
        marginRight: theme.spacing(1),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2, 0),
    },
}));

export interface IAdditionalInfoDialogProps {
    /**
     * Callback requesting the dialog to be closed.
     */
    onClose: () => void;
    /**
     * Callback that exposes the additional info provided.
     */
    onSubmitAdditionalInfo: (displayName: IAdditionalInfoDialogState) => void;
}

export interface IAdditionalInfoDialogState {
    displayName: string;
}

export const AdditionalInfoDialog: FunctionComponent<IAdditionalInfoDialogProps> = props => {
    const classes = useStyles();
    const [state, setState] = useState<IAdditionalInfoDialogState>({
        displayName: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.onSubmitAdditionalInfo({ displayName: state.displayName });
    };

    return (
        <AppDialog
            title="Set your Display Name"
            onClose={props.onClose}
            maxWidth="xs"
            fullWidth={true}
        >
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    label="Display Name"
                    required={true}
                    value={state.displayName}
                    onChange={e => setState({ ...state, displayName: e.target.value })}
                    variant="outlined"
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </AppDialog>
    );
};
