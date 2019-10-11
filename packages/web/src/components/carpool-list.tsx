import React, { FunctionComponent } from "react";
import { List, ListItem, ListItemText, Typography, makeStyles } from "@material-ui/core";
import moment from "moment";

import { Carpool } from "@carpool/core";
import { NavLink } from ".";

const useStyles = makeStyles(theme => ({
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
    /**
     * Optional callback for when a carpool has been navigated. (useful for e.g. closing a dialog on nav)
     */
    onNavigate?: () => void;
}

export const CarpoolList: FunctionComponent<ICarpoolListProps> = props => {
    const classes = useStyles();
    const { carpools } = props;

    const handleSelect = () => {
        props.onNavigate && props.onNavigate();
    };

    return (
        <List component="nav">
            {carpools.map(carpool => (
                <NavLink key={carpool.id} to={`/carpools/${carpool.id}`}>
                    <ListItem button={true} onClick={handleSelect}>
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
