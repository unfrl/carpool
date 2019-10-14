import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Redirect } from "react-router";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";

import { AuthStore, CarpoolStore, DriverStore, CreateDriverDto, CarpoolDto } from "@carpool/core";
import { CarpoolDetails, DriverList, DocumentHead, AppDialog, DriverForm } from "../components";

const useStyles = makeStyles(theme => ({
    progress: {
        display: "flex",
        margin: "auto",
    },
}));

export interface ICarpoolScreenProps extends RouteComponentProps {
    authStore: AuthStore;
    carpoolStore: CarpoolStore;
    driverStore: DriverStore;
}

export const CarpoolScreen: FunctionComponent<ICarpoolScreenProps> = observer(props => {
    const classes = useStyles();
    const { match, carpoolStore, authStore, driverStore } = props;
    const { id } = match.params as { id: string };
    const { selectedCarpoolId, selectedCarpool, loading } = carpoolStore;
    const [ready, setReady] = useState(false);
    const [showDriverForm, setShowDriverForm] = useState(false);
    const canUserEdit = Boolean(
        authStore.user && selectedCarpool && authStore.user.id === selectedCarpool.createdById
    );

    useEffect(() => {
        const selectId = async (id: string) => {
            await carpoolStore.selectCarpool(id);
            setReady(true);
        };

        if (id !== selectedCarpoolId) {
            selectId(id);
        }

        return () => {
            carpoolStore.clearCarpool();
        };
    }, [id]);

    const handleToggleDriverForm = () => {
        setShowDriverForm(!showDriverForm);
    };

    const handleSaveDriverForm = async (createDriverDto: CreateDriverDto) => {
        await driverStore.createDriver(id, createDriverDto);
        handleToggleDriverForm();
    };

    const handleSaveCarpoolDetails = async (carpoolDto: CarpoolDto) => {
        if (canUserEdit) {
            await carpoolStore.updateCarpool(carpoolDto, selectedCarpoolId);
        }
    };

    if (loading || !ready) {
        return <CircularProgress className={classes.progress} />;
    }

    if (!selectedCarpool) {
        return <Redirect to="/" />;
    }

    const { name, destination, dateTime } = selectedCarpool;

    return (
        <div>
            <DocumentHead
                screenTitle={name}
                description={`${name} ${destination} ${new Date(dateTime).toLocaleString()}`}
            />
            <CarpoolDetails
                name={name}
                destination={destination}
                date={dateTime}
                canEdit={canUserEdit}
                onSave={handleSaveCarpoolDetails}
                saving={carpoolStore.saving}
            />
            <DriverList
                drivers={driverStore.drivers}
                loading={driverStore.loading}
                userId={authStore.user ? authStore.user.id : undefined}
                onOfferToDrive={handleToggleDriverForm}
            />
            {showDriverForm && (
                <AppDialog title="Offer to Drive" onClose={handleToggleDriverForm} color="primary">
                    <DriverForm onSave={handleSaveDriverForm} onCancel={handleToggleDriverForm} />
                </AppDialog>
            )}
        </div>
    );
});
