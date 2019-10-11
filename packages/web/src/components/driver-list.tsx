import React, { FunctionComponent, Fragment } from "react";
import { Typography, Button, CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";

import { DriverDto } from "@carpool/core";
import { DriverItem } from "./driver-item";
import searching from "../images/searching.svg";

const useStyles = makeStyles(theme => ({
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

    const renderDrivers = () => {
        if (loading) {
            return <CircularProgress className={classes.progress} />;
        }

        if (!drivers.length) {
            return (
                <div className={classes.noDrivers}>
                    <Typography variant="h5">No drivers yet. Be first!</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.callToAction}
                    >
                        Offer to Drive
                    </Button>
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
        <div>
            <div className={classes.header}>
                <Typography variant="h5">Drivers</Typography>
                <Button color="primary" onClick={onOfferToDrive}>
                    Offer to Drive
                </Button>
            </div>
            {renderDrivers()}
        </div>
    );
});
