import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { observer, inject } from "mobx-react";
import { CssBaseline, createMuiTheme, CircularProgress, Button } from "@material-ui/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import deepPurple from "@material-ui/core/colors/deepPurple";
import amber from "@material-ui/core/colors/amber";
import { RouterStore } from "mobx-react-router";

import { AuthStore, CarpoolStore, DriverStore, SocialLoginSteps } from "@carpool/core";
import {
    AdditionalInfoDialog,
    AppHeader,
    AuthLinks,
    Content,
    DocumentHead,
    IAdditionalInfoData,
    UserDialog,
    UserMenu,
    UserMenuOption,
} from "./components";
import {
    AuthScreen,
    HomeScreen,
    CreateCarpoolScreen,
    CarpoolScreen,
    UserCarpoolsScreen,
    NotFoundScreen,
    VerificationScreen,
    ScreenMode,
} from "./screens";
import { getCarpoolPath } from "./utils";

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

export interface IAppState {
    showUserDialog: boolean;
    showAdditionalInfoDialog: boolean;
    socialProviderToken: string;
}

@inject("authStore", "carpoolStore", "driverStore", "routerStore")
@observer
export class App extends Component<IAppProps, IAppState> {
    public state: IAppState = {
        showUserDialog: false,
        showAdditionalInfoDialog: false,
        socialProviderToken: "",
    };

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
                                    onSignIn={this.handleAuthClick}
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
                            render={_routeProps => (
                                <AuthScreen isSignUp={true} authStore={authStore} />
                            )}
                        />
                        <Route
                            path="/sign-in"
                            exact={true}
                            render={_routeProps => (
                                <AuthScreen isSignUp={false} authStore={authStore} />
                            )}
                        />
                        <Route component={NotFoundScreen} />
                    </Switch>
                </Content>
                {this.state.showUserDialog && (
                    <UserDialog
                        onClose={this.handleCloseDialogs}
                        onSignIn={this.handleSignIn}
                        onSignUp={this.handleSignUp}
                        onRequestPasswordReset={this.handleRequestPasswordReset}
                        onGoogleLogin={this.handleGoogleLogin}
                    />
                )}
                {this.state.showAdditionalInfoDialog && (
                    <AdditionalInfoDialog
                        onSubmitAdditionalInfo={async data => {
                            await this.handleGoogleLogin(this.state.socialProviderToken, data);
                        }}
                        onClose={this.handleCloseDialogs}
                    />
                )}
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
                return this.handleAuthClick();
        }
    };

    private handleAuthClick = () => {
        const { authStore } = this.injectedProps;

        if (authStore.isAuthenticated) {
            authStore.signOut();
            window.location.href = "/";
        } else {
            this.handleShowDialog();
        }
    };

    private handleShowDialog = () => {
        this.setState({ showUserDialog: true });
    };

    private handleCloseDialogs = () => {
        this.setState({ showUserDialog: false, showAdditionalInfoDialog: false });
    };

    private handleShowAdditionalInfoDialog = () => {
        this.setState({ showAdditionalInfoDialog: true });
    };

    private handleSignIn = async (email: string, password: string) => {
        const { authStore } = this.injectedProps;
        await authStore.signIn(email, password);

        if (authStore.isAuthenticated) {
            this.handleCloseDialogs();
        }
    };

    private handleGoogleLogin = async (idToken: string, googleLoginData?: IAdditionalInfoData) => {
        const { authStore } = this.injectedProps;
        let result = await authStore.signInWithGoogle(
            idToken,
            googleLoginData ? googleLoginData.displayName : undefined
        );

        if (result.nextStep === SocialLoginSteps.DisplayNameRequired) {
            this.handleCloseDialogs();
            this.setState({ socialProviderToken: idToken });
            this.handleShowAdditionalInfoDialog();
            return;
        }

        if (authStore.isAuthenticated) {
            this.handleCloseDialogs();
        }
    };

    private handleRequestPasswordReset = async (email: string) => {
        const { authStore } = this.injectedProps;
        await authStore.requestPasswordReset(email);
    };

    private handleSignUp = async (email: string, password: string, displayName: string) => {
        const { authStore } = this.injectedProps;
        await authStore.signUp(email, password, displayName);
    };
}
