import React, { Component, Fragment } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { observer, inject } from "mobx-react";

import { AuthStore } from "@carpool/core";
import { AppHeader, Content, UserDialog } from "./components";
import { Home, GetStarted, NotFound } from "./screens";

export interface IAppProps extends RouteComponentProps {}

export interface IInjectedProps extends IAppProps {
    authStore: AuthStore;
}

export interface IAppState {
    showUserDialog: boolean;
}

@inject("authStore")
@observer
export class App extends Component<IAppProps, IAppState> {
    public state: IAppState = {
        showUserDialog: false,
    };

    private get injectedProps(): IInjectedProps {
        return this.props as IInjectedProps;
    }

    public render() {
        const { authStore } = this.injectedProps;

        return (
            <Fragment>
                <AppHeader
                    isAuthenticated={authStore.isAuthenticated}
                    onAuthClick={this.handleAuthClick}
                />
                <main>
                    <Content>
                        <Switch>
                            <Route path="/" exact={true} component={Home} />
                            <Route path="/get-started" exact={true} component={GetStarted} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                </main>
                {this.state.showUserDialog && (
                    <UserDialog
                        onClose={this.handleCloseDialog}
                        onSignIn={this.handleSignIn}
                        onSignUp={this.handleSignUp}
                    />
                )}
            </Fragment>
        );
    }

    private handleAuthClick = () => {
        const { authStore } = this.injectedProps;

        if (authStore.isAuthenticated) {
            authStore.signOut();
        } else {
            this.handleShowDialog();
        }
    };

    private handleShowDialog = () => {
        this.setState({ showUserDialog: true });
    };

    private handleCloseDialog = () => {
        this.setState({ showUserDialog: false });
    };

    private handleSignIn = async (email: string, password: string) => {
        const { authStore } = this.injectedProps;
        await authStore.signIn(email, password);

        if (authStore.isAuthenticated) {
            this.handleCloseDialog();
        }
    };

    private handleSignUp = async (email: string, password: string, displayName: string) => {
        const { authStore } = this.injectedProps;
        await authStore.signUp(email, password, displayName);

        if (authStore.isAuthenticated) {
            this.handleCloseDialog();
        }
    };
}
