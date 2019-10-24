import React, { FunctionComponent } from "react";
import { List, ListItem, ListItemText, Typography, makeStyles } from "@material-ui/core";
import moment from "moment";

import { Carpool } from "@carpool/core";
import { NavLink } from ".";
import { getCarpoolPath } from "../utils";
import empty from "../images/empty.svg";

const useStyles = makeStyles(theme => ({
    noCarpools: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    image: {
        maxWidth: 450,
        marginTop: theme.spacing(4),
    },
    secondary: {
        display: "flex",
        flexDirection: "column",
    },
}));

export interface ICarpoolListProps {
    /**
     * Collection of carpools.
     */
    carpools: Carpool[];
}

export const CarpoolList: FunctionComponent<ICarpoolListProps> = props => {
    const classes = useStyles();
    const { carpools } = props;

    if (!carpools.length) {
        return (
            <div className={classes.noCarpools}>
                <Typography variant="h5" align="center">
                    No carpools yet!
                </Typography>
                <img src={empty} className={classes.image} />
            </div>
        );
    }

    return (
        <List component="nav">
            {carpools.map(carpool => (
                <NavLink key={carpool.id} to={getCarpoolPath(carpool.name, carpool.urlId)}>
                    <ListItem button={true}>
                        <ListItemText
                            primary={carpool.name}
                            secondary={
                                <span className={classes.secondary}>
                                    <Typography variant="caption">{carpool.destination}</Typography>
                                    <Typography variant="caption">
                                        {moment(new Date(carpool.dateTime)).format(
                                            "dddd, MMMM Do YYYY, h:mm a"
                                        )}
                                    </Typography>
                                </span>
                            }
                        />
                    </ListItem>
                </NavLink>
            ))}
        </List>
    );
};
