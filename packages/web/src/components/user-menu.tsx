import React, { FunctionComponent, useState } from "react";
import {
    Avatar,
    Menu,
    MenuItem,
    Typography,
    Divider,
    ListItemIcon,
    Icon,
    makeStyles,
} from "@material-ui/core";

import { getInitials } from "@carpool/core";

const useStyles = makeStyles(theme => ({
    menuHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(1),
        width: 240,
    },
    avatar: {
        cursor: "pointer",
    },
    divider: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}));

export interface IUserMenuProps {
    /**
     * User's display name,
     */
    displayName: string;
    /**
     * User's email address.
     */
    email: string;
    /**
     * Callback requesting to be signed out.
     */
    onSignOut: () => void;
}

export interface IUserMenuState {
    anchorEl?: Element;
}

export const UserMenu: FunctionComponent<IUserMenuProps> = props => {
    const classes = useStyles();
    const [state, setState] = useState<IUserMenuState>({ anchorEl: undefined });

    const { displayName, email } = props;
    const initials = getInitials(displayName);

    const handleClick = (e: React.MouseEvent) => {
        setState({ anchorEl: e.currentTarget });
    };

    const handleClose = () => {
        setState({ anchorEl: undefined });
    };

    return (
        <div>
            <Avatar className={classes.avatar} onClick={handleClick}>
                {initials}
            </Avatar>
            <Menu
                id="user-menu"
                open={Boolean(state.anchorEl)}
                anchorEl={state.anchorEl}
                onClose={handleClose}
            >
                <div className={classes.menuHeader}>
                    <Typography variant="subtitle1">{displayName}</Typography>
                    <Typography variant="caption">{email}</Typography>
                </div>
                <Divider className={classes.divider} />
                <MenuItem>
                    <ListItemIcon>
                        <Icon>person</Icon>
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={props.onSignOut}>
                    <ListItemIcon>
                        <Icon>exit_to_app</Icon>
                    </ListItemIcon>
                    Sign out
                </MenuItem>
            </Menu>
        </div>
    );
};
