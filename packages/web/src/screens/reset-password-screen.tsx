import React from "react";
import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Paper,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { AuthStore } from "@carpool/core";
import { Conditional, EmailSent } from "../components";

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

export interface IResetPasswordScreenProps {
    authStore: AuthStore;
}

export const ResetPasswordScreen: React.FC<IResetPasswordScreenProps> = props => {
    const { authStore } = props;
    const classes = useStyles();
    const [email, setEmail] = React.useState("");
    const [emailSent, setEmailSent] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleClearError = () => {
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        handleClearError();

        try {
            setLoading(true);
            await authStore.requestPasswordReset(email);
            setEmailSent(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderBody = () => {
        if (emailSent) {
            return (
                <EmailSent description="Password reset email sent. Please click the link to reset your password." />
            );
        }

        return (
            <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h3">Reset Password</Typography>
                <div className={classes.spacer} />
                <Typography align="center">
                    Enter your account's email address and we'll send you a link to reset your
                    password.
                </Typography>
                <div className={classes.spacer} />
                <Conditional shouldDisplay={!!error}>
                    <Alert severity="error" onClose={handleClearError}>
                        {error}
                    </Alert>
                </Conditional>
                <TextField
                    label="Email address"
                    required={true}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                        Send Email
                    </Button>
                </div>
            </form>
        );
    };

    return (
        <Container maxWidth="xs" component={Paper} className={classes.root}>
            {renderBody()}
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
};
