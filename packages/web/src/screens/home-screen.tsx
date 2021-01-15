import React, { FunctionComponent } from "react";
import { Typography, Button, Grid, makeStyles } from "@material-ui/core";

import { NavLink } from "../components";
import fastCar from "../images/fast-car.svg";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
    },
    info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
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
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
        },
    },
    imageContainer: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        },
    },
    image: {
        maxWidth: "100%",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "70%",
        },
        [theme.breakpoints.down("xs")]: {
            maxWidth: "90%",
        },
    },
    createCarpool: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
}));

export const HomeScreen: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <Grid spacing={4} container={true} className={classes.root}>
            <Grid item={true} md={6} sm={12} xs={12} className={classes.info}>
                <Typography variant="h3" className={classes.heading}>
                    Unfrl carpool
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    Save on gas, make new friends, reduce your carbon footprint, and get where you
                    need to go!
                </Typography>
                <NavLink to="/carpools/create" className={classes.createCarpool}>
                    <Button variant="contained" color="primary" size="large">
                        Create a Carpool
                    </Button>
                </NavLink>
            </Grid>
            <Grid item={true} md={6} sm={12} xs={12} className={classes.imageContainer}>
                <img src={fastCar} alt="Carpool" className={classes.image} />
            </Grid>
        </Grid>
    );
};

export default HomeScreen;
