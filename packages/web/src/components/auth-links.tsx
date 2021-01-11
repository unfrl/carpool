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

export interface IAuthLinksProps {
    size?: "small" | "medium" | "large";
}

export const AuthLinks: React.FC<IAuthLinksProps> = props => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <NavLink to="/sign-in">
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
