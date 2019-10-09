import React, { FunctionComponent, useState } from "react";
import { TextField, Button, Typography, makeStyles } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
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
    error: {
        fontWeight: 700,
        color: red[500],
        textAlign: "center",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
    onSignIn: (email: string, password: string) => Promise<void>;
    /**
     * Callback requesting to sign up.
     */
    onSignUp: (email: string, password: string, displayName: string) => Promise<void>;
}

export interface IUserDialogState {
    signUp: boolean;
    signUpSuccessful: boolean;
    email: string;
    password: string;
    displayName: string;
    error?: string;
}

export const UserDialog: FunctionComponent<IUserDialogProps> = props => {
    const classes = useStyles();
    const [state, setState] = useState<IUserDialogState>({
        signUp: false,
        signUpSuccessful: false,
        email: "",
        password: "",
        displayName: "",
    });

    const handleToggleSignUp = () => {
        setState({ ...state, signUp: !state.signUp });
    };

    const clearError = () => {
        setState({ ...state, error: undefined });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        clearError();

        try {
            if (state.signUp) {
                await props.onSignUp(state.email, state.password, state.displayName);

                setState({ ...state, signUpSuccessful: true });
            } else {
                await props.onSignIn(state.email, state.password);
            }
        } catch (error) {
            setState({ ...state, error: error.message });
        }
    };

    return (
        <AppDialog title={state.signUp ? "Sign Up" : "Sign In"} onClose={props.onClose}>
            <form onSubmit={handleSubmit} className={classes.form}>
                {state.signUpSuccessful ? (
                    <Typography variant="h6" align="center">
                        Sign up successful! <br /> Please click the verification link sent to your
                        email.
                    </Typography>
                ) : (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
                {state.error && <Typography className={classes.error}>{state.error}</Typography>}
                <div className={classes.actions}>
                    {state.signUpSuccessful ? (
                        <Button variant="contained" color="primary" onClick={props.onClose}>
                            Close
                        </Button>
                    ) : (
                        <React.Fragment>
                            <Button variant="contained" color="primary" type="submit">
                                {state.signUp ? "Sign up" : "Sign in"}
                            </Button>
                            <Button
                                variant="text"
                                className={classes.account}
                                onClick={handleToggleSignUp}
                            >
                                {state.signUp ? "Existing account" : "Create account"}
                            </Button>
                        </React.Fragment>
                    )}
                </div>
            </form>
        </AppDialog>
    );
};
