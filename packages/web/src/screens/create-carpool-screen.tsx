import React, { FunctionComponent, Fragment, useState } from "react";
import { Redirect } from "react-router";
import { Card, Typography, Button, CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";

import { CarpoolStore } from "@carpool/core";
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
    progress: {
        display: "flex",
        margin: "auto",
    },
}));

export interface ICreateCarpoolScreenProps {
    initialized: boolean;
    isAuthenticated: boolean;
    onSignIn: () => void;
    carpoolStore: CarpoolStore;
}

export const CreateCarpoolScreen: FunctionComponent<ICreateCarpoolScreenProps> = observer(props => {
    const classes = useStyles();
    const { initialized, isAuthenticated, onSignIn, carpoolStore } = props;
    const [redirectId, setRedirectId] = useState("");

    const handleCreate = async (name: string, date: Date, address: string) => {
        const carpool = await carpoolStore.createCarpool({
            carpoolName: name,
            destination: address,
            dateTime: date,
        });

        setRedirectId(carpool.id);
    };

    if (!!redirectId) {
        return <Redirect to={`/carpools/${redirectId}`} />;
    }

    if (!initialized) {
        return <CircularProgress className={classes.progress} />; // prevent "you need an account" from briefly flashing if auth store isn't initialized yet
    }

    return (
        <Card className={classes.root}>
            <DocumentHead screenTitle="Create a Carpool" />
            <Typography variant="h6" align="center">
                Create a Carpool
            </Typography>
            {isAuthenticated ? (
                <CarpoolForm onCreate={handleCreate} creating={carpoolStore.creating} />
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
            )}
        </Card>
    );
});
