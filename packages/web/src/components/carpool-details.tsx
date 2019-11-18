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

export const CarpoolDetails: FunctionComponent<ICarpoolDetailsProps> = props => {
    const classes = useStyles();
    const [editing, setEditing] = useState(false);
    const { carpoolDto, canEdit, onSave, saving } = props;
    const { name, destination, dateTime, created, user } = carpoolDto;

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
                        }}
                    />
                </div>
            ) : (
                <Fragment>
                    <CardHeader
                        title={name}
                        subheader={
                            <div>
                                <Typography>{destination}</Typography>
                                <Typography>
                                    {moment(new Date(dateTime)).format(
                                        "dddd, MMMM Do YYYY, h:mm a"
                                    )}
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
};
