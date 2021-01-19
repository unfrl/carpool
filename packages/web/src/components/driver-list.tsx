import React, { FunctionComponent, Fragment } from "react";
import { Typography, Button, CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";

import { DriverDto } from "@carpool/core";
import { DriverItem } from "./driver-item";
import cityDriver from "../images/city-driver.svg";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing(1),
        padding: theme.spacing(0, 2),
    },
    progress: {
        display: "flex",
        margin: "auto",
        marginTop: theme.spacing(2),
    },
    noDrivers: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    callToAction: {
        marginTop: theme.spacing(2),
    },
    image: {
        maxWidth: 300,
        marginTop: theme.spacing(4),
    },
}));

export interface IDriverListProps {
    drivers: DriverDto[];
    userId?: string;
    carpoolCreatorId: string;
    loading: boolean;
    onOfferToDrive: () => void;
    onJoinAsPassenger: (driverId: string) => void;
    onRemovePassenger: (driverId: string) => void;
    onRemoveDriver: (driverId: string, isDriver: boolean) => void;
}

export const DriverList: FunctionComponent<IDriverListProps> = observer(props => {
    const classes = useStyles();
    const { drivers, userId, loading, onOfferToDrive, carpoolCreatorId } = props;
    const hasDrivers = drivers.length > 0;

    let currentUserIsDriving = false;
    let currentUserIsPassenger = false;
    for (const driver of drivers) {
        if (driver.user.id === userId) {
            currentUserIsDriving = true;
            break;
        }

        if (driver.passengerUserIds.find(id => id === userId)) {
            currentUserIsPassenger = true;
            break;
        }
    }
    const canOfferToDrive = !!userId && !currentUserIsDriving && !currentUserIsPassenger;

    const renderDrivers = () => {
        if (loading) {
            return <CircularProgress className={classes.progress} />;
        }

        if (!hasDrivers) {
            return (
                <div className={classes.noDrivers}>
                    {userId && (
                        <React.Fragment>
                            <Typography variant="h5">No drivers yet. Be first!</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.callToAction}
                                onClick={onOfferToDrive}
                                disabled={!canOfferToDrive}
                            >
                                Offer to Drive
                            </Button>
                        </React.Fragment>
                    )}
                    {!userId && (
                        <Typography variant="h5">
                            Login to join as a passenger or offer to drive!
                        </Typography>
                    )}

                    <img src={cityDriver} className={classes.image} />
                </div>
            );
        }

        return (
            <Fragment>
                {drivers.map(driver => {
                    const { seatsRemaining } = driver;
                    const canJoin =
                        !!userId &&
                        seatsRemaining > 0 &&
                        !currentUserIsDriving &&
                        !currentUserIsPassenger;

                    return (
                        <DriverItem
                            key={driver.id}
                            driver={driver}
                            currentUserIsCreator={userId === carpoolCreatorId}
                            currentUserIsDriver={driver.user.id === userId}
                            currentUserIsPassenger={Boolean(
                                userId && driver.passengerUserIds.indexOf(userId) > -1
                            )}
                            canJoin={canJoin}
                            onJoin={() => props.onJoinAsPassenger(driver.id)}
                            onPassengerLeave={() => {
                                props.onRemovePassenger(driver.id);
                            }}
                            onRemoveDriver={() => {
                                props.onRemoveDriver(driver.id, driver.user.id === userId);
                            }}
                        />
                    );
                })}
            </Fragment>
        );
    };

    return (
        <div className={classes.root}>
            {hasDrivers && (
                <div className={classes.header}>
                    <Typography variant="h5">Drivers</Typography>
                    <Button color="primary" onClick={onOfferToDrive} disabled={!canOfferToDrive}>
                        Offer to Drive
                    </Button>
                </div>
            )}
            {renderDrivers()}
        </div>
    );
});
