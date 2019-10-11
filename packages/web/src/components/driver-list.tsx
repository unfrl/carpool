import React, { FunctionComponent } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";

import { DriverDto } from "@carpool/core";
import { DriverItem } from "./driver-item";

const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing(1),
    },
}));

export interface IDriverListProps {
    drivers: DriverDto[];
    userId?: string;
}

export const DriverList: FunctionComponent<IDriverListProps> = observer(props => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.header}>
                <Typography variant="h5">Drivers</Typography>
                <Button color="primary">Offer to Drive</Button>
            </div>
            {props.drivers.map(driver => (
                <DriverItem
                    key={driver.id}
                    driver={driver}
                    isCurrentUser={driver.user.id === props.userId}
                />
            ))}
        </div>
    );
});
