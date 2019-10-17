import React, { FunctionComponent, useEffect, useState, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import { makeStyles, CircularProgress, Card } from "@material-ui/core";

import { CarpoolStore } from "@carpool/core";
import { CarpoolList, DocumentHead, NotFound } from "../components";

const useStyles = makeStyles(theme => ({
    loading: {
        display: "flex",
        margin: "auto",
    },
}));

export interface IUserCarpoolsScreenProps extends RouteComponentProps {
    carpoolStore: CarpoolStore;
}

export const UserCarpoolsScreen: FunctionComponent<IUserCarpoolsScreenProps> = observer(props => {
    const classes = useStyles();
    const [notFound, setNotFound] = useState(false);
    const { match, carpoolStore } = props;
    const { displayName } = match.params as { displayName: string };

    useEffect(() => {
        const load = async () => {
            try {
                await carpoolStore.loadUserCarpools(displayName);
            } catch (error) {
                setNotFound(true);
            }
        };

        load();

        return () => {
            carpoolStore.clearCarpools();
        };
    }, [displayName]);

    if (notFound) {
        return <NotFound />;
    }

    return (
        <Fragment>
            <DocumentHead
                screenTitle={`${displayName} Carpools`}
                description={carpoolStore.carpools
                    .map(
                        carpool =>
                            `${carpool.name} ${carpool.destination} ${new Date(
                                carpool.dateTime
                            ).toLocaleString()}`
                    )
                    .join("\n")}
            />
            {carpoolStore.loading ? (
                <CircularProgress className={classes.loading} />
            ) : (
                <Card>
                    <CarpoolList carpools={carpoolStore.carpools} />
                </Card>
            )}
        </Fragment>
    );
});
