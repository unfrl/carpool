import React from "react";
import { Paper, Slide, Typography, makeStyles } from "@material-ui/core";

import mailSent from "../images/mail-sent.svg";

const useStyles = makeStyles(theme => ({
    root: {
        overflow: "hidden",
    },
    spacer: {
        marginTop: theme.spacing(2),
    },
    image: {
        maxWidth: "100%",
    },
}));

export const EmailSent: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography align="center" variant="h3">
                Email sent!
            </Typography>
            <Typography align="center" variant="subtitle1">
                Please click the verification email we sent you to finish setting up your account.
            </Typography>
            <div className={classes.spacer} />
            <Slide direction="up" in={true} timeout={500}>
                <img src={mailSent} alt="Email sent" className={classes.image} />
            </Slide>
        </div>
    );
};
