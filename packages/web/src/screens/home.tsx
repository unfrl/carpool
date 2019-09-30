import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Fab, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

export const Home: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Link to="/create-event" style={{ textDecoration: "none", color: "inherit" }}>
                <Fab variant="extended" color="primary" size="large">
                    Create a Carpool
                </Fab>
            </Link>
        </div>
    );
};
