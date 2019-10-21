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
    loading: boolean;
    onOfferToDrive: () => void;
    onJoinAsPassenger: (driverId: string) => void;
}

export const DriverList: FunctionComponent<IDriverListProps> = observer(props => {
    const classes = useStyles();
    const { drivers, userId, loading, onOfferToDrive } = props;
    const hasDrivers = drivers.length > 0;

    let currentUserIsDriving = false;
    let currentUserIsPassenger = false;
    for (const driver of drivers) {
        if (driver.user.id === userId) {
            currentUserIsDriving = true;
            break;
        }

        // TODO: THIS IS TEMPORARY! Passengers will need a corresponding DTO instead of cast to any.
        if (driver.passengers.find((p: any) => p.userId === userId)) {
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
                            currentUserIsDriver={driver.user.id === userId}
                            canJoin={canJoin}
                            onJoin={() => props.onJoinAsPassenger(driver.id)}
                            passengers={driver.passengers}
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
