import React, { FunctionComponent } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    CircularProgress,
    makeStyles,
} from "@material-ui/core";

import { UserDto } from "@carpool/core";
import { NavLink, UserMenu } from "./";

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
     * If true, displays a loading indicator in place of the sign in/user menu.
     */
    initialized: boolean;
    /**
     * If provided, displays the user's avatar menu.
     */
    user: UserDto | null;
    /**
     * Sign in/out depending on current auth state.
     */
    onAuthClick: () => void;
}

export const AppHeader: FunctionComponent<IAppHeaderProps> = props => {
    const classes = useStyles();
    const { title, user, onAuthClick, initialized } = props;

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <NavLink to="/">
                    <Typography variant="h6">
                        <span role="img">🚙</span> {title || "Carpool"}
                    </Typography>
                </NavLink>
                {!initialized ? (
                    <CircularProgress color="secondary" />
                ) : user ? (
                    <UserMenu
                        displayName={user.displayName}
                        email={user.email}
                        onSignOut={onAuthClick}
                    />
                ) : (
                    <Button color="inherit" onClick={onAuthClick}>
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};
