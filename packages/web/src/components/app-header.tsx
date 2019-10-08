import React, { FunctionComponent } from "react";
import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core";

import { UserDto } from "@carpool/core";
import { NavLink, UserMenu } from "./";

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

export interface IAppHeaderProps {
    title?: string;
    user: UserDto | null;
    onAuthClick: () => void;
}

export const AppHeader: FunctionComponent<IAppHeaderProps> = props => {
    const classes = useStyles();
    const { title, user, onAuthClick } = props;

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <NavLink to="/">
                    <Typography variant="h6">
                        <span role="img">🚙</span> {title || "Carpool"}
                    </Typography>
                </NavLink>
                {user ? (
                    <UserMenu
                        displayName={user.displayName}
                        email={user.email}
                        onSignOut={props.onAuthClick}
                    />
                ) : (
                    <Button color="inherit" onClick={props.onAuthClick}>
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};
