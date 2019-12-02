import React, { FunctionComponent, useEffect, useState, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import {
    makeStyles,
    CircularProgress,
    Card,
    Paper,
    Tabs,
    Tab,
    Grid,
    Typography,
} from "@material-ui/core";

import { CarpoolStore, AuthStore } from "@carpool/core";
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
    header: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

export interface IUserCarpoolsScreenProps extends RouteComponentProps {
    carpoolStore: CarpoolStore;
    authStore: AuthStore;
}

export const UserCarpoolsScreen: FunctionComponent<IUserCarpoolsScreenProps> = observer(props => {
    const classes = useStyles();
    const [notFound, setNotFound] = useState(false);
    const [ready, setReady] = useState(false);
    const [tab, selectTab] = useState(0);
    const { match, carpoolStore, authStore } = props;
    const { displayName } = match.params as { displayName: string };

    const isCurrentUser = authStore.user && authStore.user.displayName === displayName;

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

    const handleSelectTab = async (selectedTab: number) => {
        if (selectedTab === tab || !isCurrentUser) {
            return;
        }

        selectTab(selectedTab);
    };

    const getCarpools = () => {
        if (!isCurrentUser) {
            return carpoolStore.carpools;
        }

        switch (tab) {
            case 0:
                return carpoolStore.carpools;
            case 1:
                return carpoolStore.userDrivingCarpools;
            default:
                return carpoolStore.carpools;
        }
    };

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
                            {isCurrentUser ? (
                                <Tabs
                                    value={tab}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={(_e, value) => handleSelectTab(value)}
                                    variant="fullWidth"
                                >
                                    <Tab label="Created" />
                                    <Tab label="Driving" />
                                    <Tab label="Passenger" />
                                </Tabs>
                            ) : (
                                <Typography variant="h6" align="center" className={classes.header}>
                                    Carpools
                                </Typography>
                            )}
                        </Paper>
                        <Card>
                            <CarpoolList carpools={getCarpools()} />
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Fragment>
    );
});
