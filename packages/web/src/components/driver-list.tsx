import React, { FunctionComponent, Fragment } from "react";
import { Typography, Button, CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";

import { DriverDto } from "@carpool/core";
import { DriverItem } from "./driver-item";
import cityDriver from "../images/city-driver.svg";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing(1),
    },
    progress: {
        display: "flex",
        margin: "auto",
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
}

export const DriverList: FunctionComponent<IDriverListProps> = observer(props => {
    const classes = useStyles();
    const { drivers, userId, loading, onOfferToDrive } = props;
    const hasDrivers = drivers.length > 0;

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
                    >
                        Offer to Drive
                    </Button>
                    <img src={cityDriver} className={classes.image} />
                </div>
            );
        }

        return (
            <Fragment>
                {drivers.map(driver => (
                    <DriverItem
                        key={driver.id}
                        driver={driver}
                        isCurrentUser={driver.user.id === userId}
                    />
                ))}
            </Fragment>
        );
    };

    return (
        <div className={classes.root}>
            {hasDrivers && (
                <div className={classes.header}>
                    <Typography variant="h5">Drivers</Typography>
                    <Button color="primary" onClick={onOfferToDrive}>
                        Offer to Drive
                    </Button>
                </div>
            )}
            {renderDrivers()}
        </div>
    );
});
