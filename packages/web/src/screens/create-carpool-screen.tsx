import React, { FunctionComponent, Fragment, useState } from "react";
import { Redirect } from "react-router";
import { Card, Typography, Button, CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";

import { CarpoolStore, CarpoolDto, UpsertCarpoolDto } from "@carpool/core";
import { CarpoolForm, DocumentHead } from "../components";
import { getCarpoolPath } from "../utils";
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
    routerStore: RouterStore;
}

export const CreateCarpoolScreen: FunctionComponent<ICreateCarpoolScreenProps> = observer(props => {
    const classes = useStyles();
    const { initialized, isAuthenticated, onSignIn, carpoolStore, routerStore } = props;
    const [newCarpool, setNewCarpool] = useState<CarpoolDto | undefined>();

    const handleSave = async (carpoolDto: UpsertCarpoolDto) => {
        const carpool = await carpoolStore.createCarpool(carpoolDto);

        setNewCarpool(carpool);
    };

    const handleCancel = () => {
        routerStore.replace({ pathname: "/" });
    };

    if (newCarpool) {
        return <Redirect to={getCarpoolPath(newCarpool.name, newCarpool.urlId)} />;
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
                <CarpoolForm
                    onSave={handleSave}
                    onCancel={handleCancel}
                    saving={carpoolStore.saving}
                />
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
