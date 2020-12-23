import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Redirect } from "react-router";
import { CircularProgress, Typography, Container, makeStyles } from "@material-ui/core";
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
    FormActions,
} from "../components";

const useStyles = makeStyles(theme => ({
    progress: {
        display: "flex",
        margin: "auto",
    },
    confirmContent: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2, 0),
    },
    confirmText: {
        marginBottom: theme.spacing(2),
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
    const [removeFromDriverId, setRemoveFromDriverId] = useState<string | undefined>();
    const [quittingDriverId, setQuittingDriverId] = useState<string | undefined>();

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

    const handleShowLeaveConfirmation = (driverId: string) => {
        setRemoveFromDriverId(driverId);
    };

    const handleCancelLeave = () => {
        setRemoveFromDriverId(undefined);
    };

    const handleConfirmLeave = async () => {
        if (removeFromDriverId) {
            await driverStore.removeUserPassenger(removeFromDriverId);
        }
        setRemoveFromDriverId(undefined);
    };

    const handleShowQuitConfirmation = (driverId: string) => {
        setQuittingDriverId(driverId);
    }

    const handleCancelQuit = () => {
        setQuittingDriverId(undefined);
    }

    const handleConfirmQuit = async () => {
        if (quittingDriverId) {
            console.log("TODO: Should call: await driverStore.removeDriver(quittingDriverId);")
            //await driverStore.removeDriver(quittingDriverId);
        }
        setQuittingDriverId(undefined);
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
        <Container maxWidth="md">
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
                onRemovePassenger={handleShowLeaveConfirmation}
                onRemoveDriver={handleShowQuitConfirmation}
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
            {removeFromDriverId && (
                <AppDialog title="Leave the carpool?" onClose={handleCancelLeave} color="primary">
                    <div className={classes.confirmContent}>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            className={classes.confirmText}
                        >
                            Are you sure you want to leave?
                            <br />
                            You can always rejoin if you change your mind later.
                        </Typography>
                        <FormActions
                            confirmText="Leave"
                            canSave={true}
                            onCancel={handleCancelLeave}
                            onConfirm={handleConfirmLeave}
                        />
                    </div>
                </AppDialog>
            )}
            {quittingDriverId && (
                <AppDialog title="Step down from being a driver?" onClose={handleCancelQuit} color="primary">
                    <div className={classes.confirmContent}>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            className={classes.confirmText}
                        >
                            Are you sure you want to step down?
                            <br />
                            You can always volunteer to drive again if you change your mind later.
                        </Typography>
                        <FormActions
                            confirmText="Leave"
                            canSave={true}
                            onCancel={handleCancelQuit}
                            onConfirm={handleConfirmQuit}
                        />
                    </div>
                </AppDialog>
            )}
        </Container>
    );
});
