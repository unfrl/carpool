import React from "react";
import { GoogleLogin } from "react-google-login";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Divider,
    Paper,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { AuthStore, authProviderConfig } from "@carpool/core";
import { DocumentHead, EmailSent, NavLink } from "../components";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    spacer: {
        marginTop: theme.spacing(1),
    },
    actions: {
        marginTop: theme.spacing(2),
    },
    orDivider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    socialLogin: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        textTransform: "uppercase",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

export interface IAuthScreenProps {
    /**
     * Set to true for new user sign up otherwise defaults to sign in.
     */
    isSignUp?: boolean;
    authStore: AuthStore;
}

export interface IAuthScreenState {
    email: string;
    password: string;
    displayName: string;
    error?: string;
}
/**
 * TODOS:
 * - break out google auth flow into own container component
 * -- this will handle logic for displaying display name field if more info is required
 * -- ideally should include sign up vs sign in flow
 * - come up with better way of doing the redirect for signing in
 * - fix sign up links for create carpool route
 * -- ideally this could be a "protected" route that displays the default sign in required if user is not auth'd
 * - impl reset password page
 */

export const AuthScreen: React.FC<IAuthScreenProps> = observer(props => {
    const classes = useStyles();
    const { isSignUp, authStore } = props;
    const [state, setState] = React.useState<IAuthScreenState>({
        email: "",
        password: "",
        displayName: "",
        error: "",
    });
    const [signUpSuccess, setSignUpSuccess] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleGoogleSuccess = async response => {
        const idToken = response.Zi.id_token;
        if (!idToken) {
            console.error("Unable to extract google user idToken from login response");
        }
        // await props.onGoogleLogin(idToken);
    };

    const handleGoogleFailure = response => {
        console.log(`Failed to authenticate with google.`);
        console.log(response);
    };

    const handleClearError = () => {
        setState({ ...state, error: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        handleClearError();

        try {
            setLoading(true);

            if (isSignUp) {
                await authStore.signUp(state.email, state.password, state.displayName);
                setSignUpSuccess(true);
            } else {
                await authStore.signIn(state.email, state.password);
            }
        } catch (error) {
            setState({ ...state, error: error.message });
        } finally {
            setLoading(false);
        }
    };

    if (authStore.isAuthenticated) {
        return <Redirect to={"/"} />;
    }

    const renderBody = () => {
        if (isSignUp && signUpSuccess) {
            return <EmailSent />;
        }

        return (
            <form onSubmit={handleSubmit} className={classes.form}>
                <Typography variant="h3" align="center">
                    Welcome!
                </Typography>
                <div className={classes.spacer} />
                {state.error && (
                    <Alert severity="error" onClose={handleClearError}>
                        {state.error}
                    </Alert>
                )}
                {isSignUp && (
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
                {!isSignUp && (
                    <NavLink to="/reset-password">
                        <Typography align="right">Forgot password?</Typography>
                    </NavLink>
                )}
                <div className={classes.actions}>
                    <Button
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                    >
                        {isSignUp ? "Sign up" : "Sign in"}
                    </Button>
                    <div className={classes.spacer} />
                    {isSignUp ? (
                        <NavLink to="/sign-in">
                            <Button
                                fullWidth={true}
                                variant="outlined"
                                size="large"
                                style={{ marginTop: 8 }}
                            >
                                Existing account
                            </Button>
                        </NavLink>
                    ) : (
                        <NavLink to="/sign-up">
                            <Button
                                fullWidth={true}
                                variant="outlined"
                                size="large"
                                style={{ marginTop: 8 }}
                            >
                                Create an account
                            </Button>
                        </NavLink>
                    )}
                    {authProviderConfig.googleClientId && (
                        <>
                            <div className={classes.spacer} />
                            <div className={classes.orDivider}>
                                <Divider style={{ width: "40%" }} />
                                <Typography>OR</Typography>
                                <Divider style={{ width: "40%" }} />
                            </div>
                            <GoogleLogin
                                className={classes.socialLogin}
                                clientId={authProviderConfig.googleClientId}
                                onSuccess={handleGoogleSuccess}
                                onFailure={handleGoogleFailure}
                                cookiePolicy={"single_host_origin"}
                                buttonText={`Sign ${isSignUp ? "up" : "in"} with Google`}
                            />
                        </>
                    )}
                </div>
            </form>
        );
    };

    return (
        <Container maxWidth="xs" className={classes.root} component={Paper}>
            <DocumentHead
                screenTitle={isSignUp ? "Create an account" : "Sign in to your account"}
            />
            {renderBody()}
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
});
