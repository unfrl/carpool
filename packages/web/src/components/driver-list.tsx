import React, { FunctionComponent } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";

import { DriverItem } from "./driver-item";

const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing(1),
    },
}));

export const DriverList: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.header}>
                <Typography variant="h5">Drivers</Typography>
                <Button color="primary">Offer to Drive</Button>
            </div>
            <DriverItem name="Andrew Noyes" email="andrew@noyes.io" remainingSeats={4} />
            <DriverItem name="Billy Burns" email="bill@billy.com" remainingSeats={0} />
            <DriverItem name="Jane Jill" email="jilly@billy.com" remainingSeats={2} />
            <DriverItem name="Zane" email="zane@ggmail.com" remainingSeats={9} />
        </div>
    );
};
