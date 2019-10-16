import React, { FunctionComponent } from "react";
import { List, ListItem, ListItemText, Typography, Button, makeStyles } from "@material-ui/core";
import moment from "moment";

import { Carpool } from "@carpool/core";
import { NavLink } from ".";
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
    createCarpool: {
        marginTop: theme.spacing(2),
    },
    list: {
        minHeight: 500,
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
    /**
     * Optional callback for when a carpool has been navigated. (useful for e.g. closing a dialog on nav)
     */
    onNavigate?: () => void;
}

export const CarpoolList: FunctionComponent<ICarpoolListProps> = props => {
    const classes = useStyles();
    const { carpools } = props;

    if (!carpools.length) {
        return (
            <div className={classes.noCarpools}>
                <Typography variant="h5" align="center">
                    No carpools yet. Create one!
                </Typography>
                <NavLink to="/carpools/create" className={classes.createCarpool}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={props.onNavigate}
                    >
                        Create a Carpool
                    </Button>
                </NavLink>
                <img src={empty} className={classes.image} />
            </div>
        );
    }

    return (
        <List component="nav" className={classes.list}>
            {carpools.map(carpool => (
                <NavLink key={carpool.id} to={`/carpools/${carpool.id}`}>
                    <ListItem button={true} onClick={props.onNavigate}>
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
