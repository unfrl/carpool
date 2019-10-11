import React, { FunctionComponent } from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

import { NavLink } from "./";

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

export interface IAppHeaderProps {
    /**
     * Optional title of the header, defaults to Carpool.
     */
    title?: string;
    /**
     * Child node to render on the far right of the header.
     */
    rightOption: React.ReactNode;
}

export const AppHeader: FunctionComponent<IAppHeaderProps> = props => {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <NavLink to="/">
                    <Typography variant="h6">
                        <span role="img">🚙</span> {props.title || "Carpool"}
                    </Typography>
                </NavLink>
                {props.rightOption}
            </Toolbar>
        </AppBar>
    );
};
