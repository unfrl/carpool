import React, { FunctionComponent, useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { AppDialog } from "./";

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

export interface IUserDialogProps {
    /**
     * Callback requesting the dialog to be closed.
     */
    onClose: () => void;
    /**
     * Callback requesting to sign in.
     */
    onSignIn: (email: string, password: string) => void;
    /**
     * Callback requesting to sign up.
     */
    onSignUp: (email: string, password: string, displayName: string) => void;
}

export interface IUserDialogState {
    signUp: boolean;
    email: string;
    password: string;
    displayName: string;
}

export const UserDialog: FunctionComponent<IUserDialogProps> = props => {
    const classes = useStyles();
    const [state, setState] = useState<IUserDialogState>({
        signUp: false,
        email: "",
        password: "",
        displayName: "",
    });

    const handleToggleSignUp = () => {
        setState({ ...state, signUp: !state.signUp });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!state.email || !state.password) {
            return;
        }

        if (state.signUp) {
            if (!state.displayName) {
                return;
            }

            props.onSignUp(state.email, state.password, state.displayName);
        } else {
            props.onSignIn(state.email, state.password);
        }
    };

    return (
        <AppDialog title={state.signUp ? "Sign Up" : "Sign In"} onClose={props.onClose}>
            <form onSubmit={handleSubmit} className={classes.form}>
                {state.signUp && (
                    <TextField
                        label="Display name"
                        required={true}
                        value={state.displayName}
                        onChange={e => setState({ ...state, displayName: e.target.value })}
                        variant="outlined"
                        margin="normal"
                    />
                )}
                <TextField
                    label="Email address"
                    required={true}
                    type="email"
                    value={state.email}
                    onChange={e => setState({ ...state, email: e.target.value })}
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    label="Password"
                    required={true}
                    type="password"
                    value={state.password}
                    onChange={e => setState({ ...state, password: e.target.value })}
                    variant="outlined"
                    margin="normal"
                />
                <div className={classes.actions}>
                    <Button variant="contained" color="primary" type="submit">
                        {state.signUp ? "Sign up" : "Sign in"}
                    </Button>
                    <Button variant="text" className={classes.account} onClick={handleToggleSignUp}>
                        {state.signUp ? "Existing account" : "Create account"}
                    </Button>
                </div>
            </form>
        </AppDialog>
    );
};
