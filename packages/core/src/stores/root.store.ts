import { Carpool } from "@carpool/client";
import { AuthStore } from "./auth.store";
import { CarpoolStore } from "./carpool.store";
import { apiConfig } from "../config";

export class RootStore {
    // api
    public readonly carpoolClient: Carpool;

    // stores
    public readonly authStore: AuthStore;
    public readonly carpoolStore: CarpoolStore;

    public constructor() {
        this.authStore = new AuthStore(this);
        this.carpoolStore = new CarpoolStore(this);

        this.carpoolClient = new Carpool(
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
