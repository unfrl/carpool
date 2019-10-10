import React, { FunctionComponent } from "react";
import { IconButton, Icon, Card, CardHeader, Typography, makeStyles } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2),
    },
}));

export interface ICarpoolDetailsProps {
    /**
     * Name of the carpool.
     */
    name: string;
    /**
     * Destination of the carpool.
     */
    destination: string;
    /**
     * Date of the carpool.
     */
    date: Date;
}

export const CarpoolDetails: FunctionComponent<ICarpoolDetailsProps> = props => {
    const classes = useStyles();
    const { name, destination, date } = props;

    return (
        <Card className={classes.root}>
            <CardHeader
                title={name}
                subheader={
                    <div>
                        <Typography>{destination}</Typography>
                        <Typography>
                            {moment(new Date(date)).format("dddd, MMMM Do YYYY, h:mm a")}
                        </Typography>
                    </div>
                }
                action={
                    <IconButton title="Edit">
                        <Icon>edit</Icon>
                    </IconButton>
                }
            />
        </Card>
    );
};
