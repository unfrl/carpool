import { observable, action, computed } from "mobx";

import { UserDto } from "@carpool/client";
import { RootStore } from "./root.store";
import { Logger } from "../utils";

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

    public initialize = async () => {
        if (this.initialized) {
            return;
        }

        try {
            if (this.getAccessToken()) {
                await this.fetchUserProfile();
            }
        } catch (error) {
            this._logger.error("Failed to initialize", error);
        } finally {
            this.setInitialized(true);
        }
    };

    public signIn = async (email: string, password: string) => {
        try {
            const result = await this._rootStore.carpoolClient.signIn({ email, password });

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
            const result = await this._rootStore.carpoolClient.signUp({
                email,
                password,
                displayName,
            });

            this.setAccessToken(result.accessToken);

            this._logger.info("Sign up success, fetching user...");

            await this.fetchUserProfile();
        } catch (error) {
            this._logger.error("Failed to sign up", error);
            throw error;
        }
    };

    public signOut = () => {
        this.clearUser();
        this.clearAccessToken();
    };

    public getAccessToken = (): string => {
        return localStorage.getItem("ACCESS_TOKEN") || "";
    };

    private fetchUserProfile = async () => {
        const user = await this._rootStore.carpoolClient.getProfile();

        this.setUser(user);
    };

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

    private setAccessToken = (token: string) => {
        localStorage.setItem("ACCESS_TOKEN", token);
    };

    private clearAccessToken = () => {
        localStorage.removeItem("ACCESS_TOKEN");
    };

    //#endregion
}
