import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { observer, inject } from "mobx-react";
import { CssBaseline, createMuiTheme, CircularProgress } from "@material-ui/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import deepPurple from "@material-ui/core/colors/deepPurple";
import amber from "@material-ui/core/colors/amber";
import { RouterStore } from "mobx-react-router";

import { AuthStore, CarpoolStore, DriverStore } from "@carpool/core";
import {
    AppHeader,
    AuthLinks,
    Content,
    DocumentHead,
    LoadingIndicator,
    UserMenu,
    UserMenuOption,
} from "./components";
import { getCarpoolPath } from "./utils";
import { ScreenMode } from "./screens/verification-screen";

const AuthScreen = React.lazy(() => import("./screens/auth-screen"));
const CarpoolScreen = React.lazy(() => import("./screens/carpool-screen"));
const CreateCarpoolScreen = React.lazy(() => import("./screens/create-carpool-screen"));
const HomeScreen = React.lazy(() => import("./screens/home-screen"));
const NotFoundScreen = React.lazy(() => import("./screens/not-found-screen"));
const ResetPasswordScreen = React.lazy(() => import("./screens/reset-password-screen"));
const UserCarpoolsScreen = React.lazy(() => import("./screens/user-carpools-screen"));
const VerificationScreen = React.lazy(() => import("./screens/verification-screen"));

const theme = createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: amber,
    },
});

export interface IAppProps extends RouteComponentProps {}

export interface IInjectedProps extends IAppProps {
    authStore: AuthStore;
    carpoolStore: CarpoolStore;
    driverStore: DriverStore;
    routerStore: RouterStore;
}

@inject("authStore", "carpoolStore", "driverStore", "routerStore")
@observer
export class App extends Component<IAppProps> {
    private get injectedProps(): IInjectedProps {
        return this.props as IInjectedProps;
    }

    public async componentDidMount() {
        await this.injectedProps.authStore.initialize();
    }

    public render() {
        const { authStore, carpoolStore, driverStore, routerStore } = this.injectedProps;

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <DocumentHead />
                <AppHeader rightOption={this.renderUserMenu()} />
                <Content>
                    <React.Suspense fallback={<LoadingIndicator />}>
                        <Switch>
                            <Route path="/" exact={true} component={HomeScreen} />
                            <Route
                                path="/:displayName/carpools"
                                exact={true}
                                render={routeProps => (
                                    <UserCarpoolsScreen
                                        authStore={authStore}
                                        carpoolStore={carpoolStore}
                                        {...routeProps}
                                    />
                                )}
                            />
                            <Route
                                path="/create"
                                exact={true}
                                render={_routeProps => (
                                    <CreateCarpoolScreen
                                        initialized={authStore.initialized}
                                        isAuthenticated={authStore.isAuthenticated}
                                        carpoolStore={carpoolStore}
                                        routerStore={routerStore}
                                    />
                                )}
                            />
                            <Route
                                path={getCarpoolPath(":name", ":id")}
                                exact={true}
                                render={routeProps => (
                                    <CarpoolScreen
                                        authStore={authStore}
                                        carpoolStore={carpoolStore}
                                        driverStore={driverStore}
                                        {...routeProps}
                                    />
                                )}
                            />
                            <Route
                                path="/verification"
                                exact={true}
                                render={_routeProps => (
                                    <VerificationScreen
                                        authStore={authStore}
                                        mode={ScreenMode.Verification}
                                    />
                                )}
                            />
                            <Route
                                path="/passwordreset"
                                exact={true}
                                render={_routeProps => (
                                    <VerificationScreen
                                        authStore={authStore}
                                        mode={ScreenMode.PasswordReset}
                                    />
                                )}
                            />
                            <Route
                                path="/sign-up"
                                exact={true}
                                render={routeProps => (
                                    <AuthScreen
                                        isSignUp={true}
                                        authStore={authStore}
                                        {...routeProps}
                                    />
                                )}
                            />
                            <Route
                                path="/sign-in"
                                exact={true}
                                render={routeProps => (
                                    <AuthScreen
                                        isSignUp={false}
                                        authStore={authStore}
                                        {...routeProps}
                                    />
                                )}
                            />
                            <Route
                                path="/reset-password"
                                exact={true}
                                render={_routeProps => (
                                    <ResetPasswordScreen authStore={authStore} />
                                )}
                            />
                            <Route component={NotFoundScreen} />
                        </Switch>
                    </React.Suspense>
                </Content>
            </ThemeProvider>
        );
    }

    private renderUserMenu = () => {
        const { authStore } = this.injectedProps;
        const { initialized, user } = authStore;

        if (!initialized) {
            return <CircularProgress color="secondary" />;
        }

        if (user) {
            return <UserMenu user={user} onMenuOptionSelected={this.handleMenuOptionSelected} />;
        }

        return <AuthLinks />;
    };

    private handleMenuOptionSelected = (option: UserMenuOption) => {
        const { authStore, routerStore } = this.injectedProps;

        switch (option) {
            case UserMenuOption.profile:
                return;
            case UserMenuOption.carpools:
                return routerStore.push({ pathname: `/${authStore.user!.displayName}/carpools` });
            case UserMenuOption.signOut:
                return this.handleSignOut();
        }
    };

    private handleSignOut = () => {
        const { authStore } = this.injectedProps;

        if (authStore.isAuthenticated) {
            authStore.signOut();
            window.location.href = "/";
        }
    };
}
