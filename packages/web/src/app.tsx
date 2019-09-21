import React, { FunctionComponent, Fragment } from "react";
import { Switch, Route } from "react-router";

import { AppHeader, Content } from "./components";
import { Home, GetStarted, NotFound } from "./screens";

export const App: FunctionComponent = () => {
    return (
        <Fragment>
            <AppHeader />
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
