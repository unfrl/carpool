import React from "react";
import { GoogleLogin } from "react-google-login";
import { observer } from "mobx-react";
import {
    Button,
    Container,
    Divider,
    Paper,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { AuthStore, authProviderConfig } from "@carpool/core";
import { DocumentHead, NavLink } from "../components";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
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
}));

export interface IAuthenticationScreenProps {
    /**
     * Set to true for new user sign up otherwise defaults to sign in.
     */
    isSignUp?: boolean;
    authStore: AuthStore;
}

export interface IAuthenticationScreenState {
    email: string;
    password: string;
    displayName: string;
    error?: string;
}

export const AuthenticationScreen: React.FC<IAuthenticationScreenProps> = observer(props => {
    const classes = useStyles();
    const { isSignUp, authStore } = props;
    const [state, setState] = React.useState<IAuthenticationScreenState>({
        email: "",
        password: "",
        displayName: "",
        error: "",
    });

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

    return (
        <Container maxWidth="xs" className={classes.root} component={Paper}>
            <DocumentHead
                screenTitle={isSignUp ? "Create an account" : "Sign in to your account"}
            />
            <Typography variant="h3" align="center">
                Welcome!
            </Typography>
            <div className={classes.spacer} />
            {state.error && <Alert severity="error">{state.error}</Alert>}
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
                <Button fullWidth={true} variant="contained" color="primary" size="large">
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
        </Container>
    );
});
