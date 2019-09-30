import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Fab, makeStyles } from "@material-ui/core";

import { NavLink } from "../components";

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
            <NavLink to="/create-event">
                <Fab variant="extended" color="primary" size="large">
                    Create a Carpool
                </Fab>
            </NavLink>
        </div>
    );
};
