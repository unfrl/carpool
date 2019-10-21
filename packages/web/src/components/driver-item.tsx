import React, { FunctionComponent, Fragment, useState } from "react";
import {
    Avatar,
    Typography,
    Button,
    IconButton,
    Icon,
    Collapse,
    Tooltip,
    Divider,
    makeStyles,
} from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

import { getInitials, DriverDto } from "@carpool/core";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    driver: {
        display: "flex",
        alignItems: "flex-start",
        cursor: "pointer",
        flexGrow: 1,
    },
    avatar: {
        marginRight: theme.spacing(1),
        color: "#fff",
        backgroundColor: deepPurple[500],
    },
    actions: {
        display: "flex",
        alignItems: "center",
    },
    action: {
        marginLeft: theme.spacing(1),
    },
    expanded: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
    },
    details: {
        display: "flex",
        alignItems: "center",
    },
    detailsIcon: {
        marginRight: theme.spacing(1),
    },
    spacer: {
        marginTop: theme.spacing(1),
    },
}));

export interface IDriverItemProps {
    driver: DriverDto;
    currentUserIsDriver: boolean;
    canJoin: boolean;
    onJoin: () => void;
}

export const DriverItem: FunctionComponent<IDriverItemProps> = props => {
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const { driver, currentUserIsDriver, canJoin } = props;
    const { car, user, seatsRemaining } = driver;
    const { displayName, email } = user;
    const { color, type } = car;

    const initials = getInitials(displayName);

    const handleToggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={classes.root}>
            <div className={classes.card}>
                <div className={classes.driver} onClick={handleToggleExpanded}>
                    <Avatar className={classes.avatar}>{initials}</Avatar>
                    <div>
                        <Typography>
                            {displayName} {currentUserIsDriver && <strong>(you)</strong>}
                        </Typography>
                        <Typography variant="subtitle2" color="textPrimary">
                            Remaining seats: {seatsRemaining}
                        </Typography>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button
                        disabled={!canJoin}
                        variant="contained"
                        color="primary"
                        className={classes.action}
                        onClick={props.onJoin}
                    >
                        Join
                    </Button>
                    <Tooltip title={expanded ? "Hide details" : "Show details"}>
                        <IconButton
                            size="small"
                            className={classes.action}
                            onClick={handleToggleExpanded}
                        >
                            <Icon fontSize="small">
                                {expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                            </Icon>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <Collapse in={expanded}>
                <div className={classes.expanded}>
                    <Typography variant="subtitle2">Details</Typography>
                    <Divider />
                    <div className={classes.spacer} />
                    <div className={classes.details}>
                        <Icon className={classes.detailsIcon} color="action">
                            email
                        </Icon>
                        <Typography variant="body2">
                            <a href={`mailto:${email}`}>{email}</a>
                        </Typography>
                    </div>
                    <div className={classes.spacer} />
                    <div className={classes.details}>
                        <Icon className={classes.detailsIcon} color="action">
                            directions_car
                        </Icon>
                        <Typography variant="body2">
                            {color} {type}
                        </Typography>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};
