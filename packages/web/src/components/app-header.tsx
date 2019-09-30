import React, { FunctionComponent } from "react";
import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core";

import { NavLink } from "./";

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

export interface IAppHeaderProps {
    title?: string;
    isAuthenticated: boolean;
    onAuthClick: () => void;
}

export const AppHeader: FunctionComponent<IAppHeaderProps> = props => {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <NavLink to="/">
                    <Typography variant="h6">
                        <span role="img">🚙</span> Carpool
                    </Typography>
                </NavLink>
                <Button color="inherit" onClick={props.onAuthClick}>
                    {props.isAuthenticated ? "Sign out" : "Sign in"}
                </Button>
            </Toolbar>
        </AppBar>
    );
};
