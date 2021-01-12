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
        padding: theme.spacing(4),
    },
}));

export interface IEmailSentProps {
    title?: string;
    description: string;
}

export const EmailSent: React.FC<IEmailSentProps> = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography align="center" variant="h3">
                {props.title || "Email sent!"}
            </Typography>
            <Typography align="center" variant="subtitle1">
                {props.description}
            </Typography>
            <div className={classes.spacer} />
            <Slide direction="up" in={true} timeout={500}>
                <img src={mailSent} alt="Email sent" className={classes.image} />
            </Slide>
        </div>
    );
};
