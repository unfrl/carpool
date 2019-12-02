import React, { FunctionComponent } from "react";
import { makeStyles, Card, Typography, Avatar } from "@material-ui/core";
import amber from "@material-ui/core/colors/amber";

import { getInitials } from "@carpool/core";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: 80,
        height: 80,
        fontSize: "2rem",
        backgroundColor: amber["A400"],
        color: theme.palette.text.primary,
    },
    heading: {
        marginTop: theme.spacing(2),
    },
}));

export interface IUserProfileCardProps {
    displayName: string;
    photoURL?: string;
}

export const UserProfileCard: FunctionComponent<IUserProfileCardProps> = props => {
    const classes = useStyles();
    const { displayName, photoURL } = props;

    return (
        <Card className={classes.root}>
            <Avatar src={photoURL} className={classes.avatar}>
                {photoURL ? null : getInitials(displayName)}
            </Avatar>
            <Typography variant="h6" align="center" className={classes.heading}>
                {displayName}
            </Typography>
        </Card>
    );
};
