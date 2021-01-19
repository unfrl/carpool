import React, { FunctionComponent, Suspense, useState } from "react";
import {
    Avatar,
    Typography,
    Button,
    IconButton,
    Icon,
    Collapse,
    Tooltip,
    Divider,
    CircularProgress,
    makeStyles,
} from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import { observer } from "mobx-react";

import { getInitials, DriverDto } from "@carpool/core";
import { ActionLink } from "./action-link";

const PassengersTable = React.lazy(() => import("./passengers-table"));

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
        alignItems: "center",
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
    actionButtons: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
    },
    action: {
        marginTop: theme.spacing(1),
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
    currentUserIsPassenger: boolean;
    currentUserIsCreator: boolean;
    canJoin: boolean;
    onJoin: () => void;
    onPassengerLeave: () => void;
    onRemoveDriver: () => void;
}

export const DriverItem: FunctionComponent<IDriverItemProps> = observer(props => {
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const {
        driver,
        currentUserIsDriver,
        currentUserIsPassenger,
        currentUserIsCreator,
        canJoin,
    } = props;
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
                            {currentUserIsPassenger
                                ? "You're a passenger!"
                                : `Remaining seats: ${seatsRemaining}`}
                        </Typography>
                    </div>
                </div>
                <div className={classes.actions}>
                    <div className={classes.actionButtons}>
                        {currentUserIsPassenger ? (
                            <Tooltip title="You're a passenger!">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        props.onPassengerLeave();
                                    }}
                                >
                                    Leave
                                </Button>
                            </Tooltip>
                        ) : currentUserIsDriver ? (
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.action}
                                onClick={() => props.onRemoveDriver()}
                            >
                                Step Down
                            </Button>
                        ) : currentUserIsCreator ? (
                            <div>
                                <Button
                                    disabled={!canJoin}
                                    variant="contained"
                                    color="primary"
                                    className={classes.action}
                                    onClick={() => props.onRemoveDriver()}
                                >
                                    Remove
                                </Button>
                                <Button
                                    disabled={!canJoin}
                                    variant="contained"
                                    color="primary"
                                    className={classes.action}
                                    onClick={props.onJoin}
                                >
                                    Join
                                </Button>
                            </div>
                        ) : (
                            <Button
                                disabled={!canJoin}
                                variant="contained"
                                color="primary"
                                className={classes.action}
                                onClick={props.onJoin}
                            >
                                Join
                            </Button>
                        )}
                    </div>
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
                            <ActionLink type="email" link={email}>
                                {email}
                            </ActionLink>
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
                    {driver.passengers && (
                        <>
                            <div className={classes.spacer} />
                            <Typography variant="subtitle2">Passengers</Typography>
                            <Divider />
                            <Suspense fallback={<CircularProgress />}>
                                <PassengersTable passengers={driver.passengers} />
                            </Suspense>
                        </>
                    )}
                </div>
            </Collapse>
        </div>
    );
});
