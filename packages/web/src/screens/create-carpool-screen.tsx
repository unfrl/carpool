import React, { FunctionComponent, Fragment } from "react";
import { Card, Typography, Button, makeStyles } from "@material-ui/core";

import { CarpoolForm, DocumentHead } from "../components";
import toyCar from "../images/toy-car.svg";

const useStyles = makeStyles(theme => ({
    root: {
        margin: "auto",
        width: 500,
        maxWidth: "100%",
        padding: theme.spacing(2),
    },
    signIn: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    carImage: {
        maxWidth: "100%",
        padding: theme.spacing(2),
    },
}));

export interface ICreateCarpoolScreenProps {
    isAuthenticated: boolean;
    onSignIn: () => void;
}

export const CreateCarpoolScreen: FunctionComponent<ICreateCarpoolScreenProps> = props => {
    const classes = useStyles();
    const { isAuthenticated, onSignIn } = props;

    const content = isAuthenticated ? (
        <CarpoolForm />
    ) : (
        <Fragment>
            <Typography variant="subtitle1" align="center">
                You need an account to create a carpool. <br /> Sign in to get started!
            </Typography>
            <div className={classes.signIn}>
                <Button variant="contained" size="large" color="primary" onClick={onSignIn}>
                    Sign In
                </Button>
            </div>
            <img src={toyCar} alt="Toy car" className={classes.carImage} />
        </Fragment>
    );

    return (
        <Card className={classes.root}>
            <DocumentHead screenTitle="Create a Carpool" />
            <Typography variant="h6" align="center">
                Create a Carpool
            </Typography>
            {content}
        </Card>
    );
};
