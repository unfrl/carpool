import React, { FunctionComponent, Fragment } from "react";
import { Switch, Route } from "react-router";

import { AppHeader, Content } from "./components";
import { Home, GetStarted, NotFound } from "./screens";

export const App: FunctionComponent = () => {
    const handleCreateCarpool = () => {};

    return (
        <Fragment>
            <AppHeader onCreateCarpool={handleCreateCarpool} />
            <main>
                <Content>
                    <Switch>
                        <Route path="/" exact={true} component={Home} />
                        <Route path="/get-started" exact={true} component={GetStarted} />
                        <Route component={NotFound} />
                    </Switch>
                </Content>
            </main>
        </Fragment>
    );
};
