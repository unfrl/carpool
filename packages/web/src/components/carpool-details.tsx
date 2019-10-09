import React, { FunctionComponent } from "react";
import { IconButton, Icon, Card, CardHeader } from "@material-ui/core";

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
                subheader={`${destination} - ${new Date(date).toLocaleString()}`}
                action={
                    <IconButton title="Edit">
                        <Icon>edit</Icon>
                    </IconButton>
                }
            />
        </Card>
    );
};
