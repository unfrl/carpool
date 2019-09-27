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

    public constructor(private readonly _rootStore: RootStore) {}

    public signIn = async (email: string, password: string) => {
        try {
            const user = await this._rootStore.carpoolClient.signIn({ email, password });

            this._logger.info("Sign in success, setting user...");

            this.setUser(user);
        } catch (error) {
            this._logger.error("Failed to sign in", error);
            throw error;
        }
    };

    public signUp = async (email: string, password: string, displayName: string) => {
        try {
            const user = await this._rootStore.carpoolClient.signUp({
                email,
                password,
                displayName,
            });

            this._logger.info("Sign up success, setting user...");

            this.setUser(user);
        } catch (error) {
            this._logger.error("Failed to sign up", error);
            throw error;
        }
    };

    @action
    public signOut = () => {
        this.clearUser();
    };

    public getAccessToken(): string {
        return this.user ? this.user.accessToken : "";
    }

    //#region Actions

    @action
    private setUser = (user: UserDto) => {
        this.user = user;
    };

    @action
    private clearUser = () => {
        this.user = null;
    };

    //#endregion
}
