import React, { FunctionComponent, useState } from "react";
import {
    Avatar,
    Typography,
    Button,
    IconButton,
    Icon,
    Collapse,
    Tooltip,
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
    carInfo: {
        marginTop: theme.spacing(1),
    },
}));

export interface IDriverItemProps {
    driver: DriverDto;
    isCurrentUser: boolean;
}

export const DriverItem: FunctionComponent<IDriverItemProps> = props => {
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const { driver, isCurrentUser } = props;
    const { car, user } = driver;
    const { displayName, email } = user;
    const { capacity, color, type } = car;
    const remainingSeats = capacity; // TODO: eventually needs to be car.capacity - passengers.length
    const canJoin = remainingSeats > 0;
    const initials = getInitials(displayName);

    const handleToggleExpanded = () => {
        setExpanded(!expanded);
    };

    const handleJoin = (e: React.MouseEvent) => {
        // TODO: display sign in dialog if not authenticated
    };

    return (
        <div className={classes.root}>
            <div className={classes.card}>
                <div className={classes.driver} onClick={handleToggleExpanded}>
                    <Avatar className={classes.avatar}>{initials}</Avatar>
                    <div>
                        <Typography>
                            {displayName} {isCurrentUser && <strong>(you)</strong>}
                        </Typography>
                        <Typography variant="subtitle2" color="textPrimary">
                            Remaining seats: {remainingSeats}
                        </Typography>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button
                        disabled={!canJoin}
                        variant="contained"
                        color="primary"
                        className={classes.action}
                        onClick={handleJoin}
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
                    <Typography variant="body2">
                        <span role="img" aria-label="email">
                            ✉️
                        </span>{" "}
                        <a href={`mailto:${email}`}>{email}</a>
                    </Typography>
                    <Typography variant="body2" className={classes.carInfo}>
                        <span role="img" aria-label="email">
                            🚘
                        </span>{" "}
                        {car.color} {car.type}
                    </Typography>
                </div>
            </Collapse>
        </div>
    );
};
