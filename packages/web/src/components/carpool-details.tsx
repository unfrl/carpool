import React, { FunctionComponent } from "react";
import { IconButton, Icon, Card, CardHeader } from "@material-ui/core";

export interface ICarpoolDetailsProps {
    name: string;
    destination: string;
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
