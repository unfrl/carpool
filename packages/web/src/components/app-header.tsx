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
    title?: string;
    initialized: boolean;
    user: UserDto | null;
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
