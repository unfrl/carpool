import React, { FunctionComponent, Fragment } from "react";
import { Typography, makeStyles } from "@material-ui/core";

import notFoundImage from "../images/not-found.svg";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    image: {
        maxWidth: "80%",
        margin: "auto",
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        display: "flex",
    },
}));

export const NotFound: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <img src={notFoundImage} alt="Not found" className={classes.image} />
            <Typography variant="h6" align="center">
                Page not found
            </Typography>
            <Typography align="center">Sorry, we couldn't find the page you requested.</Typography>
        </Fragment>
    );
};
