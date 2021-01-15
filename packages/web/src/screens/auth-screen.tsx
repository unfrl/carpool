import React from "react";
import { GoogleLogin } from "react-google-login";
import { Redirect, RouteComponentProps } from "react-router-dom";
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

import { AuthStore, SocialLoginSteps, authProviderConfig } from "@carpool/core";
import { Conditional, DocumentHead, EmailSent, NavLink } from "../components";

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

export interface IAuthScreenProps extends RouteComponentProps {
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
}

export const AuthScreen: React.FC<IAuthScreenProps> = observer(props => {
    const classes = useStyles();
    const { isSignUp, authStore } = props;
    const [state, setState] = React.useState<IAuthScreenState>({
        email: "",
        password: "",
        displayName: "",
    });
    const [error, setError] = React.useState("");
    const [signUpSuccess, setSignUpSuccess] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [googleLoginState, setGoogleLoginState] = React.useState({
        idToken: "",
        displayName: "",
        additionalInfoRequired: false,
    });

    const handleGoogleSuccess = async response => {
        console.log("SUCCESS!!!", response);
        const idToken = response.Zi.id_token;
        if (!idToken) {
            console.error("Unable to extract google user idToken from login response");
        }

        const result = await authStore.signInWithGoogle(idToken);
        if (result.nextStep === SocialLoginSteps.DisplayNameRequired) {
            setGoogleLoginState({ idToken, displayName: "", additionalInfoRequired: true });
        }
    };

    const handleGoogleFailure = response => {
        console.log(`Failed to authenticate with google.`);
        console.log(response);
    };

    const handleFinishGoogleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            await authStore.signInWithGoogle(
                googleLoginState.idToken,
                googleLoginState.displayName
            );
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClearError = () => {
        setError("");
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
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (authStore.isAuthenticated) {
        const { search } = props.location;
        const returnTo = new URLSearchParams(search).get("return-to");

        return <Redirect to={returnTo || "/"} />;
    }

    const renderBody = () => {
        if (isSignUp && signUpSuccess) {
            return (
                <EmailSent description="Please click the verification email we sent you to finish setting up your account." />
            );
        }

        if (googleLoginState.additionalInfoRequired) {
            return (
                <form onSubmit={handleFinishGoogleLogin} className={classes.form}>
                    <Typography variant="h3" align="center">
                        Last step!
                    </Typography>
                    <div className={classes.spacer} />
                    <Typography align="center">
                        Please enter a display name to create your account.
                    </Typography>
                    <div className={classes.spacer} />
                    <Conditional shouldDisplay={!!error}>
                        <Alert severity="error" onClose={handleClearError}>
                            {error}
                        </Alert>
                    </Conditional>
                    <TextField
                        label="Display name"
                        required={true}
                        value={googleLoginState.displayName}
                        onChange={e =>
                            setGoogleLoginState({
                                ...googleLoginState,
                                displayName: e.target.value,
                            })
                        }
                        variant="outlined"
                        margin="normal"
                    />
                    <div className={classes.actions}>
                        <Button
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                        >
                            Finish
                        </Button>
                    </div>
                </form>
            );
        }

        return (
            <form onSubmit={handleSubmit} className={classes.form}>
                <Typography variant="h3" align="center">
                    Welcome!
                </Typography>
                <div className={classes.spacer} />
                <Conditional shouldDisplay={!!error}>
                    <Alert severity="error" onClose={handleClearError}>
                        {error}
                    </Alert>
                </Conditional>
                <Conditional shouldDisplay={isSignUp}>
                    <TextField
                        label="Display name"
                        required={true}
                        value={state.displayName}
                        onChange={e => setState({ ...state, displayName: e.target.value })}
                        variant="outlined"
                        margin="normal"
                    />
                </Conditional>
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
                <Conditional shouldDisplay={!isSignUp}>
                    <NavLink to="/reset-password">
                        <Typography align="right">Forgot password?</Typography>
                    </NavLink>
                </Conditional>
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
                    <Conditional shouldDisplay={isSignUp}>
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
                    </Conditional>
                    <Conditional shouldDisplay={!isSignUp}>
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
                    </Conditional>
                    <Conditional shouldDisplay={!!authProviderConfig.googleClientId}>
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
                    </Conditional>
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

export default AuthScreen;
