import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core";

import { CarpoolDetails, DriverList } from "../components";

const useStyles = makeStyles(theme => ({
    spacer: {
        marginTop: theme.spacing(2),
    },
}));

export const CarpoolScreen: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <div>
            <CarpoolDetails
                name="Jazz Game"
                destination="Vivint Smart Home Arena"
                date={new Date()}
            />
            <div className={classes.spacer} />
            <DriverList />
        </div>
    );
};
