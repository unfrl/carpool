import React, { FunctionComponent, useState } from "react";
import { IconButton, Icon, Card, CardHeader, Typography, makeStyles } from "@material-ui/core";
import moment from "moment";

import { CarpoolDto } from "@carpool/core";
import { CarpoolForm } from ".";

const useStyles = makeStyles(theme => ({
    form: {
        padding: theme.spacing(2),
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
    /**
     * Set to true of the user can edit the carpool details.
     */
    canEdit: boolean;
    /**
     * Callback for saving edits made to the carpool. Note: this callback won't be invoked if `canEdit` is set to false.
     */
    onSave: (carpoolDto: CarpoolDto) => Promise<void>;
    /**
     * Set to true if the carpool is being saved.
     */
    saving: boolean;
}

export const CarpoolDetails: FunctionComponent<ICarpoolDetailsProps> = props => {
    const classes = useStyles();
    const [editing, setEditing] = useState(false);
    const { name, destination, date, canEdit, onSave, saving } = props;

    const handleSave = async (carpoolDto: CarpoolDto) => {
        if (canEdit) {
            await onSave(carpoolDto);
            handleToggleEditing();
        }
    };

    const handleToggleEditing = () => {
        setEditing(!editing);
    };

    return (
        <Card>
            {editing && canEdit ? (
                <div className={classes.form}>
                    <CarpoolForm
                        onSave={handleSave}
                        onCancel={handleToggleEditing}
                        saving={saving}
                        existingCarpool={{
                            carpoolName: name,
                            destination: destination,
                            dateTime: date,
                        }}
                    />
                </div>
            ) : (
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
                        canEdit && (
                            <IconButton title="Edit" onClick={handleToggleEditing}>
                                <Icon>edit</Icon>
                            </IconButton>
                        )
                    }
                />
            )}
        </Card>
    );
};
