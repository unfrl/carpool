import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Card, Typography, Button, Icon, makeStyles } from "@material-ui/core";

import { EventForm } from "../components";

const useStyles = makeStyles(theme => ({
    root: {
        margin: "auto",
        width: 500,
        maxWidth: "100%",
        padding: theme.spacing(2),
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
    },
    heading: {
        marginLeft: theme.spacing(2),
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
            <div className={classes.headerContainer}>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Button variant="text" color="default" size="small">
                        <Icon className={classes.leftIcon} fontSize="small">
                            arrow_back
                        </Icon>
                        Back
                    </Button>
                </Link>
                <Typography className={classes.heading} variant="h6">
                    Create Event
                </Typography>
            </div>
            <EventForm />
        </Card>
    );
};
