import { CarpoolAPI } from "@carpool/client";
import { AuthStore, CarpoolStore, DriverStore } from ".";
import { RtmClient } from "../rtm";
import { apiConfig } from "../config";

export class RootStore {
    // api
    public readonly carpoolClient: CarpoolAPI;
    public readonly rtmClient: RtmClient;

    // stores
    public readonly authStore: AuthStore;
    public readonly carpoolStore: CarpoolStore;
    public readonly driverStore: DriverStore;

    public constructor() {
        this.authStore = new AuthStore(this);
        this.carpoolStore = new CarpoolStore(this);
        this.driverStore = new DriverStore(this);

        this.rtmClient = new RtmClient(apiConfig.baseUri);
        this.carpoolClient = new CarpoolAPI(
            {
                signRequest: async resource => {
                    const accessToken = this.authStore.getAccessToken();
                    resource.headers.set("Authorization", `Bearer ${accessToken}`);
                    return resource;
                },
            },
            {
                baseUri: apiConfig.baseUri,
            }
        );
    }
}
