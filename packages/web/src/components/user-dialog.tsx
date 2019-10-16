import React, { FunctionComponent, useState } from "react";
import {
    TextField,
    Button,
    Typography,
    makeStyles,
    Link,
    CircularProgress,
} from "@material-ui/core";
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
    link: {
        cursor: "pointer",
    },
    loader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 250,
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

    /**
     * Callback requesting a password email to be sent.
     */
    onRequestPasswordReset: (email: string) => Promise<void>;
}

export interface IUserDialogState {
    mode: DialogMode;
    email: string;
    password: string;
    displayName: string;
    error?: string;
}

enum DialogMode {
    signIn,
    signUp,
    signUpSuccess,
    passwordReset,
    passwordResetSuccess,
    loading,
}

export const UserDialog: FunctionComponent<IUserDialogProps> = props => {
    const classes = useStyles();
    const [state, setState] = useState<IUserDialogState>({
        mode: DialogMode.signIn,
        email: "",
        password: "",
        displayName: "",
    });

    const handleToggleForgotPassword = () => {
        setState({
            ...state,
            mode:
                state.mode === DialogMode.passwordReset
                    ? DialogMode.signIn
                    : DialogMode.passwordReset,
            error: undefined,
        });
    };

    const handleToggleSignUp = () => {
        setState({
            ...state,
            mode: state.mode === DialogMode.signUp ? DialogMode.signIn : DialogMode.signUp,
            error: undefined,
        });
    };

    const clearError = () => {
        setState({ ...state, error: undefined });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        clearError();

        try {
            switch (state.mode) {
                case DialogMode.signUp:
                    setState({ ...state, mode: DialogMode.loading });
                    await props.onSignUp(state.email, state.password, state.displayName);
                    setState({ ...state, mode: DialogMode.signUpSuccess });
                    break;
                case DialogMode.signIn:
                    setState({ ...state, mode: DialogMode.loading });
                    await props.onSignIn(state.email, state.password);
                    break;
                case DialogMode.passwordReset:
                    setState({ ...state, mode: DialogMode.loading });
                    await props.onRequestPasswordReset(state.email);
                    setState({ ...state, mode: DialogMode.passwordResetSuccess });
                    break;
            }
        } catch (error) {
            setState({ ...state, error: error.message });
        }
    };

    const getDialogTitle = () => {
        switch (state.mode) {
            case DialogMode.signIn:
                return "Sign In";
            case DialogMode.signUp:
            case DialogMode.signUpSuccess:
                return "Sign Up";
            case DialogMode.passwordReset:
            case DialogMode.passwordResetSuccess:
                return "Password Reset";
            case DialogMode.loading:
                return "Loading";
        }
    };

    const renderForm = () => {
        switch (state.mode) {
            case DialogMode.signIn:
            case DialogMode.signUp:
            case DialogMode.signUpSuccess:
                return renderSignInUpForm();
            case DialogMode.passwordReset:
            case DialogMode.passwordResetSuccess:
                return renderPasswordResetForm();
            case DialogMode.loading:
                return (
                    <div className={classes.loader}>
                        <CircularProgress />
                    </div>
                );
        }
    };

    const renderPasswordResetForm = () => {
        return (
            <form onSubmit={handleSubmit} className={classes.form}>
                {state.mode === DialogMode.passwordResetSuccess ? (
                    <Typography variant="h6" align="center">
                        Password reset email sent!
                    </Typography>
                ) : (
                    <React.Fragment>
                        <TextField
                            label="Email address"
                            required={true}
                            type="email"
                            value={state.email}
                            onChange={e => setState({ ...state, email: e.target.value })}
                            variant="outlined"
                            margin="normal"
                        />
                        {state.error && (
                            <Typography className={classes.error}>{state.error}</Typography>
                        )}
                    </React.Fragment>
                )}
                <div className={classes.actions}>
                    {state.mode === DialogMode.passwordResetSuccess ? (
                        <Button variant="contained" color="primary" onClick={props.onClose}>
                            Close
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" type="submit">
                            Request Password Reset
                        </Button>
                    )}
                </div>
            </form>
        );
    };

    const renderSignInUpForm = () => {
        return (
            <form onSubmit={handleSubmit} className={classes.form}>
                {state.mode === DialogMode.signUpSuccess ? (
                    <Typography variant="h6" align="center">
                        Sign up successful! <br /> Please click the verification link sent to your
                        email.
                    </Typography>
                ) : (
                    <React.Fragment>
                        {state.mode === DialogMode.signUp && (
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
                        {state.mode === DialogMode.signIn && (
                            <Link onClick={handleToggleForgotPassword} className={classes.link}>
                                Forgot your password?
                            </Link>
                        )}
                    </React.Fragment>
                )}
                {state.error && <Typography className={classes.error}>{state.error}</Typography>}
                <div className={classes.actions}>
                    {state.mode === DialogMode.signUpSuccess ? (
                        <Button variant="contained" color="primary" onClick={props.onClose}>
                            Close
                        </Button>
                    ) : (
                        <React.Fragment>
                            <Button variant="contained" color="primary" type="submit">
                                {state.mode === DialogMode.signUp ? "Sign up" : "Sign in"}
                            </Button>
                            <Button
                                variant="text"
                                className={classes.account}
                                onClick={handleToggleSignUp}
                            >
                                {state.mode === DialogMode.signUp
                                    ? "Existing account"
                                    : "Create account"}
                            </Button>
                        </React.Fragment>
                    )}
                </div>
            </form>
        );
    };

    return (
        <AppDialog title={getDialogTitle()} onClose={props.onClose} maxWidth="xs" fullWidth={true}>
            {renderForm()}
        </AppDialog>
    );
};
