import React, { FunctionComponent } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";

import { NavLink } from "../components";
import fastCar from "../images/fast-car.svg";

const useStyles = makeStyles(theme => ({
    root: {
        left: 0,
        right: 0,
        position: "absolute",
        padding: theme.spacing(2),
    },
    hero: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    info: {
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    },
    heading: {
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
        },
    },
    subtitle: {
        marginBottom: theme.spacing(2),
    },
    image: {
        width: "100%",
        marginTop: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            maxWidth: "50%",
            marginTop: 0,
        },
    },
}));

export const HomeScreen: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.hero}>
                <div className={classes.info}>
                    <Typography variant="h3" className={classes.heading}>
                        Dope header here
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle}>
                        Awesome subtitle with more info here like blehs
                    </Typography>
                    <NavLink to="/create-carpool">
                        <Button variant="contained" color="primary" size="large">
                            Create a Carpool
                        </Button>
                    </NavLink>
                    <NavLink to="/carpool">
                        <Button>Temp</Button>
                    </NavLink>
                </div>
                <img src={fastCar} alt="Carpool" className={classes.image} />
            </div>
        </div>
    );
};
