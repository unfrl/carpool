import { observable, action, computed } from "mobx";

import { Carpool, CarpoolDto } from "@carpool/client";
import { Logger } from "../utils";
import { RootStore } from "./root.store";

export class CarpoolStore {
    private readonly _logger = new Logger("CarpoolStore");

    @observable
    public carpools: Carpool[] = [];

    @observable
    public selectedCarpoolId: string = "";

    @computed
    public get selectedCarpool(): Carpool | undefined {
        return this.carpools.find(c => c.id === this.selectedCarpoolId);
    }

    @observable
    public creating: boolean = false;

    @observable
    public loading: boolean = false;

    public constructor(private readonly _rootStore: RootStore) {}

    /**
     * Creates a new carpool, returning the model if successful.
     */
    public createCarpool = async (carpoolDto: CarpoolDto): Promise<Carpool> => {
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

    /**
     * Sets the selected carpool ID, first checking if it has the carpool locally. If not, it'll attempt to fetch it from the server.
     */
    public selectCarpool = async (carpoolId: string) => {
        try {
            this.setLoading(true);

            if (!this.carpools.find(c => c.id === carpoolId)) {
                this._logger.info("Carpool not found locally, fetching from server...");

                const carpool = await this._rootStore.carpoolClient.getCarpool(carpoolId);

                this.addCarpool(carpool);
            }

            this.setSelectedCarpoolId(carpoolId);
        } catch (error) {
            this._logger.error("Failed to select carpool", error);
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Clears the selected carpool ID.
     */
    public clearCarpool = () => {
        this.setSelectedCarpoolId("");
    };

    //#region Actions

    @action
    private setSelectedCarpoolId = (id: string) => {
        this.selectedCarpoolId = id;
    };

    @action
    private addCarpool = (carpool: Carpool) => {
        this.carpools.push(carpool);
    };

    @action
    private setCreating = (creating: boolean) => {
        this.creating = creating;
    };

    @action
    private setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    //#endregion
}
