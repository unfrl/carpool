import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Redirect } from "react-router";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";

import { CarpoolStore } from "@carpool/core";
import { CarpoolDetails, DriverList, DocumentHead } from "../components";

const useStyles = makeStyles(theme => ({
    progress: {
        display: "flex",
        margin: "auto",
    },
}));

export interface ICarpoolScreenProps extends RouteComponentProps {
    carpoolStore: CarpoolStore;
}

export const CarpoolScreen: FunctionComponent<ICarpoolScreenProps> = observer(props => {
    const classes = useStyles();
    const { match, carpoolStore } = props;
    const { id } = match.params as { id: string };
    const { selectedCarpoolId, selectedCarpool, loading } = carpoolStore;
    const [ready, setReady] = useState(false);

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
            <CarpoolDetails name={name} destination={destination} date={dateTime} />
            <DriverList drivers={[]} />
        </div>
    );
});
