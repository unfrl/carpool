import React, { Component, Fragment } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { observer, inject } from "mobx-react";

import { AppHeader, Content } from "./components";
import { Home, GetStarted, NotFound } from "./screens";
import { AuthStore } from "./stores";

export interface IAppProps extends RouteComponentProps {}

export interface IInjectedProps extends IAppProps {
    authStore: AuthStore;
}

@inject("authStore")
@observer
export class App extends Component<IAppProps, {}> {
    private get injectedProps(): IInjectedProps {
        return this.props as IInjectedProps;
    }

    public render() {
        const { authStore } = this.injectedProps;
        const { isAuthenticated } = authStore;

        return (
            <Fragment>
                <AppHeader isAuthenticated={isAuthenticated} onAuthClick={this.handleAuthClick} />
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
    }

    private handleAuthClick = () => {
        const { authStore } = this.injectedProps;
        authStore.isAuthenticated ? authStore.signOut() : authStore.signIn("", "");
    };
}
