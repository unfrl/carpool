import { observable, action, computed } from "mobx";

import { UpsertCarpoolDto, CarpoolDto } from "@carpool/client";
import { Logger } from "../utils";
import { RootStore } from "./root.store";

export class CarpoolStore {
    private readonly _logger = new Logger("CarpoolStore");

    @observable
    public carpools: CarpoolDto[] = [];

    @observable
    public selectedCarpoolId: string = "";

    @computed
    public get selectedCarpool(): CarpoolDto | undefined {
        return this.carpools.find(c => c.id === this.selectedCarpoolId);
    }

    @observable
    public saving: boolean = false;

    @observable
    public loading: boolean = false;

    public constructor(private readonly _rootStore: RootStore) {
        this._rootStore.rtmClient.carpool.onCarpoolUpdated(this.setUpdatedCarpool);
    }

    /**
     * Creates a new carpool, returning the model if successful.
     */
    public createCarpool = async (carpoolDto: UpsertCarpoolDto): Promise<CarpoolDto> => {
        try {
            this.setSaving(true);

            const carpool = await this._rootStore.apiClient.createCarpool(carpoolDto);

            this.addCarpool(carpool);

            return carpool;
        } catch (error) {
            this._logger.error("Failed to create carpool", error);
            throw error;
        } finally {
            this.setSaving(false);
        }
    };

    /**
     * Updates an existing carpool and then updates the carpool in the collection if successful
     */
    public updateCarpool = async (carpoolDto: UpsertCarpoolDto, carpoolId: string) => {
        try {
            this.setSaving(true);

            const carpool = await this._rootStore.apiClient.updateCarpool(carpoolDto, carpoolId);

            this.setUpdatedCarpool(carpool);
        } catch (error) {
            this._logger.error("Failed to update carpool", error);
        } finally {
            this.setSaving(false);
        }
    };

    /**
     * Fetches the carpool by its `urlId` and then sets it as the selected carpool if successful.
     * **Note**: it's the URL ID that should be passed in, not its GUID!
     */
    public selectCarpool = async (carpoolUrlId: string) => {
        try {
            this.setLoading(true);

            let carpool = this.carpools.find(c => c.urlId === carpoolUrlId);
            if (!carpool) {
                carpool = await this._rootStore.apiClient.getCarpool(carpoolUrlId);
                this.addCarpool(carpool);
            }

            this.setSelectedCarpoolId(carpool.id);

            await this.joinCarpool(carpool.id);
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

    /**
     * Clears the collection of carpools.
     */
    public clearCarpools = () => {
        this.setCarpools([]);
    };

    /**
     * Load a user's carpools by their (unique) display name.
     */
    public loadUserCarpools = async (displayName: string) => {
        try {
            this.setLoading(true);

            const carpools = await this._rootStore.apiClient.getUserCarpools(displayName);

            this.setCarpools(carpools);
        } catch (error) {
            this._logger.error("Failed to load user carpools", error);
            throw error;
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Joins the carpool room to subscribe for real-time updates.
     */
    private joinCarpool = async (carpoolId: string) => {
        this._logger.info("Joining carpool room:", carpoolId);
        await this._rootStore.rtmClient.carpool.joinCarpoolRoom(carpoolId);
    };

    //#region Actions

    @action
    private setSelectedCarpoolId = (id: string) => {
        this.selectedCarpoolId = id;
    };

    @action
    private addCarpool = (carpool: CarpoolDto) => {
        this.carpools.push(carpool);
    };

    @action
    private setCarpools = (carpools: CarpoolDto[]) => {
        this.carpools = carpools;
    };

    @action
    private setUpdatedCarpool = (carpool: CarpoolDto) => {
        const index = this.carpools.findIndex(c => c.id === carpool.id);
        if (index > -1) {
            this.carpools[index] = carpool;
        }
    };

    @action
    private setSaving = (saving: boolean) => {
        this.saving = saving;
    };

    @action
    private setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    //#endregion
}
