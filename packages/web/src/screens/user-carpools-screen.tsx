import React, { FunctionComponent, useEffect, useState, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import { makeStyles, CircularProgress, Card, Paper, Tabs, Tab, Grid } from "@material-ui/core";

import { CarpoolStore } from "@carpool/core";
import { CarpoolList, DocumentHead, NotFound, UserProfileCard } from "../components";

const useStyles = makeStyles(theme => ({
    loading: {
        display: "flex",
        margin: "auto",
    },
    tabsContainer: {
        marginBottom: theme.spacing(2),
    },
    userContainer: {
        width: "100%",
    },
}));

export interface IUserCarpoolsScreenProps extends RouteComponentProps {
    carpoolStore: CarpoolStore;
}

export const UserCarpoolsScreen: FunctionComponent<IUserCarpoolsScreenProps> = observer(props => {
    const classes = useStyles();
    const [notFound, setNotFound] = useState(false);
    const [ready, setReady] = useState(false);
    const [tab, selectTab] = useState(0);
    const { match, carpoolStore } = props;
    const { displayName } = match.params as { displayName: string };

    useEffect(() => {
        const load = async () => {
            try {
                await carpoolStore.loadUserCarpools(displayName);
                setReady(true);
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
            {carpoolStore.loading || !ready ? (
                <CircularProgress className={classes.loading} />
            ) : (
                <Grid container={true} spacing={2}>
                    <Grid item={true} md={3} sm={12} xs={12}>
                        <div className={classes.userContainer}>
                            <UserProfileCard displayName={displayName} />
                        </div>
                    </Grid>
                    <Grid item={true} md={9} sm={12}>
                        <Paper className={classes.tabsContainer}>
                            <Tabs
                                value={tab}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={(_e, value) => selectTab(value)}
                                variant="fullWidth"
                            >
                                <Tab label="Created" />
                                <Tab label="Driving" />
                                <Tab label="Passenger" />
                            </Tabs>
                        </Paper>
                        <Card>
                            <CarpoolList carpools={carpoolStore.carpools} />
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Fragment>
    );
});
