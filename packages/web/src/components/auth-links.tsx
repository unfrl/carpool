import React from "react";
import { Button, makeStyles } from "@material-ui/core";

import { NavLink } from "./nav-link";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        alignItems: "center",
    },
    spacer: {
        marginRight: theme.spacing(2),
    },
}));

// TODO: move to a routes definition somewhere and/or move this into props
const excludedReturnPaths = ["/", "/sign-up", "/sign-in", "/reset-password"];

export interface IAuthLinksProps {
    size?: "small" | "medium" | "large";
}

export const AuthLinks: React.FC<IAuthLinksProps> = props => {
    const classes = useStyles();

    const returnTo =
        excludedReturnPaths.indexOf(window.location.pathname) < 0
            ? `?return-to=${window.location.pathname}`
            : "";

    return (
        <div className={classes.container}>
            <NavLink to={`/sign-in${returnTo}`}>
                <Button color="inherit" variant="outlined" {...props}>
                    Sign in
                </Button>
            </NavLink>
            <div className={classes.spacer} />
            <NavLink to="/sign-up">
                <Button color="secondary" variant="contained" {...props}>
                    Create Account
                </Button>
            </NavLink>
        </div>
    );
};
