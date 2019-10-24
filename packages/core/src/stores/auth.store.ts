import { observable, action, computed } from "mobx";

import { UserDto } from "@carpool/client";
import { Logger } from "../utils";
import { RootStore } from "./root.store";

const ACCESS_TOKEN_KEY = "carpool.auth.access_token";

export class AuthStore {
    private readonly _logger = new Logger("AuthStore");

    @computed
    public get isAuthenticated(): boolean {
        return !!this.user;
    }

    @observable
    public user: UserDto | null = null;

    @observable
    public initialized: boolean = false;

    public constructor(private readonly _rootStore: RootStore) {}

    /**
     * Initializes the auth store by checking localstorage for an existing access token.
     * If found, then the user's session will be reestablished.
     */
    public initialize = async () => {
        if (this.initialized) {
            return;
        }

        try {
            if (this.getAccessToken()) {
                this._logger.info("Has access token, fetching user profile...");
                await this.fetchUserProfile();
            }
        } catch (error) {
            // TODO: on error, it's likely the access token expired - will want to use the refresh token (when implemented) to request a new one
            this._logger.warn("Failed to initialize", error);
            this.clearAccessToken();
        } finally {
            this.setInitialized(true);
        }
    };

    public requestPasswordReset = async (email: string) => {
        try {
            await this._rootStore.apiClient.requestPasswordReset({ email });
        } catch (error) {
            this._logger.error("Failed to request password reset", error);
            throw error;
        }
    };

    public resetpassword = async (token: string, email: string, newPassword: string) => {
        try {
            const result = await this._rootStore.apiClient.resetPassword({
                email,
                token,
                newPassword,
            });
            this.setAccessToken(result.accessToken);

            await this.fetchUserProfile();
        } catch (error) {
            this._logger.error("Failed to reset user password", error);
            throw error;
        }
    };

    public signInWithGoogle = async (idToken: string) => {
        try {
            const result = await this._rootStore.apiClient.signInWithGoogle({ idToken });

            this.setAccessToken(result.accessToken);

            this._logger.info("Sign in success, fetching user...");

            await this.fetchUserProfile();
        } catch (error) {
            this._logger.error("Failed to sign in with server using google idToken", error);
            throw error;
        }
    };

    public signIn = async (email: string, password: string) => {
        try {
            const result = await this._rootStore.apiClient.signIn({ email, password });

            this.setAccessToken(result.accessToken);

            this._logger.info("Sign in success, fetching user...");

            await this.fetchUserProfile();
        } catch (error) {
            this._logger.error("Failed to sign in", error);
            throw error;
        }
    };

    public signUp = async (email: string, password: string, displayName: string) => {
        try {
            await this._rootStore.apiClient.signUp({
                email,
                password,
                displayName,
            });
        } catch (error) {
            this._logger.error("Failed to sign up", error);
            throw error;
        }
    };

    /**
     * Verifies a new user using the provided email and token.
     * If successful, then the user will be logged in.
     */
    public verifyUser = async (email: string, token: string) => {
        try {
            const result = await this._rootStore.apiClient.verifyUser({ email, token });

            this.setAccessToken(result.accessToken);

            await this.fetchUserProfile();
        } catch (error) {
            this._logger.error("Failed to verify user", error);
            throw error;
        }
    };

    public signOut = () => {
        this.clearUser();
        this.clearAccessToken();
    };

    private fetchUserProfile = async () => {
        const user = await this._rootStore.apiClient.getMyProfile();

        this.setUser(user);
    };

    //#region Access token

    public getAccessToken = (): string => {
        // TODO: localStorage should be moved into a `storageService` and provided as a dependency to the root store
        // this way we're not reliant on the browser implementation (e.g. for mobile we'll want to use AsyncStorage)
        return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
    };

    private setAccessToken = (token: string) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    };

    private clearAccessToken = () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    };

    //#endregion

    //#region Actions

    @action
    private setUser = (user: UserDto) => {
        this.user = user;
    };

    @action
    private clearUser = () => {
        this.user = null;
    };

    @action
    private setInitialized = (initialized: boolean) => {
        this.initialized = initialized;
    };

    //#endregion
}
