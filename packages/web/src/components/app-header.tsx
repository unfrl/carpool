import React, { FunctionComponent } from "react";
import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
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
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    CARPOOL
                </Typography>
                <Button variant="text" size="small" color="inherit" onClick={props.onAuthClick}>
                    {props.isAuthenticated ? "Sign out" : "Sign in"}
                </Button>
            </Toolbar>
        </AppBar>
    );
};
