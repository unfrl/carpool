import React, { FunctionComponent, Fragment, useState } from "react";
import {
    IconButton,
    Icon,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    makeStyles,
} from "@material-ui/core";
import amber from "@material-ui/core/colors/amber";
import moment from "moment";

import { CarpoolDto, UpsertCarpoolDto, getInitials } from "@carpool/core";
import { CarpoolForm, NavLink } from ".";
import { observer } from "mobx-react";

const useStyles = makeStyles(theme => ({
    form: {
        padding: theme.spacing(2),
    },
    content: {
        paddingTop: theme.spacing(2),
        paddingBottom: `${theme.spacing(2)}px !important`,
        borderTop: `1px solid ${theme.palette.divider}`,
    },
    row: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        backgroundColor: amber["A400"],
        color: theme.palette.text.primary,
    },
    userLink: {
        marginRight: theme.spacing(1),
    },
    displayName: {
        fontWeight: 500,
    },
    metadata: {
        fontSize: 14,
    },
    description: {
        padding: 16,
        paddingTop: 0,
    },
    details: {
        fontWeight: 400,
    },
    icon: {
        marginRight: theme.spacing(1),
    },
    spacer: {
        marginTop: theme.spacing(1),
    },
}));

export interface ICarpoolDetailsProps {
    /**
     * The carpool details to display.
     */
    carpoolDto: CarpoolDto;
    /**
     * Set to true if the user can edit the carpool details.
     */
    canEdit: boolean;
    /**
     * Callback for saving edits made to the carpool. Note: this callback won't be invoked if `canEdit` is set to false.
     */
    onSave: (carpoolDto: UpsertCarpoolDto) => Promise<void>;
    /**
     * Set to true if the carpool is being saved.
     */
    saving: boolean;
}

export const CarpoolDetails: FunctionComponent<ICarpoolDetailsProps> = observer(props => {
    const classes = useStyles();
    const [editing, setEditing] = useState(false);
    const { carpoolDto, canEdit, onSave, saving } = props;
    const { name, destination, dateTime, created, user, description, metadata } = carpoolDto;

    let seatsRemaining = 0;
    let driverCount = 0;
    if (metadata) {
        seatsRemaining = metadata.seatsRemaining;
        driverCount = metadata.driverCount;
    }

    const handleSave = async (carpoolDto: UpsertCarpoolDto) => {
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
                            dateTime: dateTime,
                            description: description,
                        }}
                    />
                </div>
            ) : (
                <Fragment>
                    <CardHeader
                        title={name}
                        subheader={
                            <div>
                                <div className={`${classes.row} ${classes.spacer}`}>
                                    <Icon className={classes.icon}>room</Icon>
                                    <Typography>
                                        <a
                                            href={`https://maps.google.com/?q=${destination}`}
                                            target="_blank"
                                        >
                                            {destination}
                                        </a>
                                    </Typography>
                                </div>
                                <div className={`${classes.row} ${classes.spacer}`}>
                                    <Icon className={classes.icon}>schedule</Icon>
                                    <Typography>
                                        {moment(new Date(dateTime)).format(
                                            "dddd, MMMM Do YYYY, h:mm a"
                                        )}
                                    </Typography>
                                </div>
                                <div className={`${classes.row} ${classes.spacer}`}>
                                    <Icon className={classes.icon}>emoji_people</Icon>
                                    <Typography>{`There ${
                                        driverCount === 1 ? "is" : "are"
                                    } ${driverCount} ${
                                        driverCount === 1 ? "driver" : "drivers"
                                    } and ${seatsRemaining} ${
                                        seatsRemaining === 1 ? "seat" : "seats"
                                    } remaining`}</Typography>
                                </div>
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
                    {description && (
                        <div className={classes.description}>
                            <Typography variant="h6" className={classes.details}>
                                Description
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {description}
                            </Typography>
                        </div>
                    )}
                    <CardContent className={`${classes.content} ${classes.row}`}>
                        <NavLink to={`/${user.displayName}/carpools`} className={classes.userLink}>
                            <Avatar className={classes.avatar}>
                                {getInitials(user.displayName)}
                            </Avatar>
                        </NavLink>
                        <div>
                            <Typography className={classes.displayName}>
                                <NavLink to={`/${user.displayName}/carpools`}>
                                    {user.displayName}
                                </NavLink>
                            </Typography>
                            <Typography
                                className={classes.metadata}
                                title={moment(created)
                                    .local()
                                    .format("dddd, MMMM Do YYYY, h:mm a")}
                            >
                                created{" "}
                                {moment(created)
                                    .local()
                                    .fromNow()}
                            </Typography>
                        </div>
                    </CardContent>
                </Fragment>
            )}
        </Card>
    );
});
