import React, { FunctionComponent } from "react";
import { Card, Typography, makeStyles } from "@material-ui/core";

import { EventForm } from "../components";

const useStyles = makeStyles(theme => ({
    root: {
        margin: "auto",
        width: 500,
        maxWidth: "100%",
        padding: theme.spacing(2),
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

export const CreateEvent: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Typography variant="h6" align="center">
                Create an Event
            </Typography>
            <EventForm />
        </Card>
    );
};
