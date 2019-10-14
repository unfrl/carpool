import { CarpoolAPI } from "@carpool/client";
import { AuthStore } from "./auth.store";
import { CarpoolStore } from "./carpool.store";
import { DriverStore } from "./driver.store";
import { apiConfig } from "../config";

export class RootStore {
    // api
    public readonly carpoolClient: CarpoolAPI;

    // stores
    public readonly authStore: AuthStore;
    public readonly carpoolStore: CarpoolStore;
    public readonly driverStore: DriverStore;

    public constructor() {
        this.authStore = new AuthStore(this);
        this.carpoolStore = new CarpoolStore(this);
        this.driverStore = new DriverStore(this);

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
