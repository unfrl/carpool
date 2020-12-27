import { action, observable } from "mobx";

import { CarpoolAPI } from "@carpool/client";
import { AuthStore } from "./auth.store";
import { CarpoolStore } from "./carpool.store";
import { DriverStore } from "./driver.store";
import { RtmClient } from "../rtm";
import { apiConfig } from "../config";
import { Logger } from "../utils";

export class RootStore {
    private readonly _logger: Logger;

    // api
    public readonly apiClient: CarpoolAPI;
    public readonly rtmClient: RtmClient;

    // stores
    public readonly authStore: AuthStore;
    public readonly carpoolStore: CarpoolStore;
    public readonly driverStore: DriverStore;

    /**
     * Tracks whether the client is connected to the RTM API.
     */
    @observable
    public rtmConnected: boolean = false;

    public constructor() {
        this._logger = new Logger("RootStore");

        this.rtmClient = new RtmClient(
            apiConfig.baseUri,
            this.handleConnect,
            this.handleDisconnect,
            () => this.authStore.getAccessToken()
        );
        this.apiClient = new CarpoolAPI(
            {
                signRequest: async resource => {
                    const accessToken = this.authStore.getAccessToken();
                    resource.headers.set("Authorization", `Bearer ${accessToken}`);
                    return resource;
                },
            },
            apiConfig.baseUri
        );

        this.authStore = new AuthStore(this);
        this.carpoolStore = new CarpoolStore(this);
        this.driverStore = new DriverStore(this);
    }

    private handleConnect = (): void => {
        this._logger.info("RTM API connected");
        this.setRtmConnected(true);
    };

    private handleDisconnect = (): void => {
        this._logger.info("RTM API disconnected");
        this.setRtmConnected(false);
    };

    //#region Actions

    @action
    private setRtmConnected = (connected: boolean): void => {
        this.rtmConnected = connected;
    };

    //#endregion
}
