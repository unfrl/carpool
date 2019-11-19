import React, { FunctionComponent, useState } from "react";
import { AppDialog } from ".";
import { makeStyles, TextField, Button, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

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
    error: {
        fontWeight: 700,
        color: red[500],
        textAlign: "center",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
    onSubmitAdditionalInfo: (data: IAdditionalInfoData) => void;
}

export interface IAdditionalInfoData {
    displayName: string;
}

export interface IAdditionalInfoDialogState extends IAdditionalInfoData {
    error?: string;
}

export const AdditionalInfoDialog: FunctionComponent<IAdditionalInfoDialogProps> = props => {
    const classes = useStyles();
    const [state, setState] = useState<IAdditionalInfoDialogState>({
        displayName: "",
        error: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await props.onSubmitAdditionalInfo({ displayName: state.displayName });
        } catch (error) {
            setState({ ...state, error: error.message });
        }
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
                {state.error && <Typography className={classes.error}>{state.error}</Typography>}
            </form>
        </AppDialog>
    );
};
