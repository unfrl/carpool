import React, { FunctionComponent } from "react";
import { IconButton, Icon, Card, CardHeader, Typography } from "@material-ui/core";
import moment from "moment";

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
    const { name, destination, date } = props;

    return (
        <Card>
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
