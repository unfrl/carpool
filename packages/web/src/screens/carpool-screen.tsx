import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Redirect } from "react-router";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";

import {
    AuthStore,
    CarpoolStore,
    DriverStore,
    UpsertDriverDto,
    UpsertCarpoolDto,
    UpsertPassengerDto,
} from "@carpool/core";
import {
    CarpoolDetails,
    DriverList,
    DocumentHead,
    AppDialog,
    DriverForm,
    PassengerForm,
} from "../components";

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
    const { id: urlId } = match.params as { id: string };
    const { selectedCarpoolId, selectedCarpool, loading } = carpoolStore;
    const [ready, setReady] = useState(false);
    const [showDriverForm, setShowDriverForm] = useState(false);
    const [driverId, setDriverId] = useState<string | undefined>();

    const canUserEdit = Boolean(
        authStore.user && selectedCarpool && authStore.user.id === selectedCarpool.user.id
    );

    useEffect(() => {
        const selectId = async (id: string) => {
            await carpoolStore.selectCarpool(id);
            setReady(true);
        };

        if (urlId !== selectedCarpoolId) {
            selectId(urlId);
        }

        return () => {
            carpoolStore.clearCarpool();
        };
    }, [urlId]);

    const handleToggleDriverForm = () => {
        setShowDriverForm(!showDriverForm);
    };

    const handleShowPassengerForm = (driverId: string) => {
        setDriverId(driverId);
    };

    const handleClosePassengerForm = () => {
        setDriverId(undefined);
    };

    const handleSaveDriverForm = async (createDriverDto: UpsertDriverDto) => {
        // Note the use of the selectedCarpoolId - this is the GUID, don't use the urlId!
        await driverStore.createDriver(selectedCarpoolId, createDriverDto);
        handleToggleDriverForm();
    };

    const handleSaveCarpoolDetails = async (carpoolDto: UpsertCarpoolDto) => {
        if (canUserEdit) {
            await carpoolStore.updateCarpool(carpoolDto, selectedCarpoolId);
        }
    };

    const handleSavePassengerForm = async (dto: UpsertPassengerDto) => {
        if (!driverId || !authStore.isAuthenticated) {
            return; // shouldn't happen
        }

        try {
            await driverStore.createUserPassenger(dto, driverId);
        } finally {
            // TODO: on error, display it and don't close form
            handleClosePassengerForm();
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
                carpoolDto={selectedCarpool}
                canEdit={canUserEdit}
                onSave={handleSaveCarpoolDetails}
                saving={carpoolStore.saving}
            />
            <DriverList
                drivers={driverStore.drivers}
                loading={driverStore.loading}
                userId={authStore.user ? authStore.user.id : undefined}
                onOfferToDrive={handleToggleDriverForm}
                onJoinAsPassenger={handleShowPassengerForm}
            />
            {showDriverForm && (
                <AppDialog
                    title="Offer to Drive"
                    onClose={handleToggleDriverForm}
                    color="primary"
                    fullWidth={true}
                    maxWidth="xs"
                >
                    <DriverForm onSave={handleSaveDriverForm} onCancel={handleToggleDriverForm} />
                </AppDialog>
            )}
            {driverId && (
                <AppDialog
                    title="Join as Passenger"
                    onClose={handleClosePassengerForm}
                    color="primary"
                    fullWidth={true}
                    maxWidth="xs"
                >
                    <PassengerForm
                        onSave={handleSavePassengerForm}
                        onCancel={handleClosePassengerForm}
                    />
                </AppDialog>
            )}
        </div>
    );
});
