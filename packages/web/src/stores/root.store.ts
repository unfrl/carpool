import { AuthStore } from "./auth.store";

export class RootStore {
    public readonly authStore: AuthStore;

    public constructor() {
        this.authStore = new AuthStore();
    }
}
