import { observable, action } from "mobx";

import { CarpoolModel, CarpoolDto } from "@carpool/client";
import { Logger } from "../utils";
import { RootStore } from "./root.store";

export class CarpoolStore {
    private readonly _logger = new Logger("CarpoolStore");

    @observable
    public carpools: CarpoolModel[] = [];

    @observable
    public creating: boolean = false;

    public constructor(private readonly _rootStore: RootStore) {}

    /**
     * Creates a new carpool and returns the model if successful.
     */
    public createCarpool = async (carpoolDto: CarpoolDto): Promise<CarpoolModel> => {
        try {
            this.setCreating(true);

            const carpool = await this._rootStore.carpoolClient.createCarpool(carpoolDto);

            this.addCarpool(carpool);

            return carpool;
        } catch (error) {
            this._logger.error("Failed to create carpool", error);
            throw error;
        } finally {
            this.setCreating(false);
        }
    };

    //#region Actions

    @action
    private addCarpool = (carpool: CarpoolModel) => {
        this.carpools.push(carpool);
    };

    @action
    private setCreating = (creating: boolean) => {
        this.creating = creating;
    };

    //#endregion
}
