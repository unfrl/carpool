import { observable, action, computed, when, reaction } from "mobx";

import {
    UpsertCarpoolDto,
    CarpoolDto,
    CarpoolQueryResponseDto,
    CarpoolMetadataDto,
} from "@carpool/client";
import { Logger } from "../utils";
import { RootStore } from "./root.store";

export class CarpoolStore {
    private readonly _logger = new Logger("CarpoolStore");

    @observable
    private _userCarpools: CarpoolQueryResponseDto[] = [];

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
        this._rootStore.rtmClient.carpool.onMetadataUpdated(this.metadataUpdated);

        reaction(
            () => this._rootStore.authStore.isAuthenticated,
            authenticated => {
                // ensure that we clear out the current user's carpools if they sign out
                if (!authenticated) {
                    this.clearUserCarpools();
                }
            }
        );

        // We register this in a reaction in order to handle potential WSS disconnection.
        // That way, if the client disconnects and then reconnects, they'll rejoin the carpool
        // room if they have a selected carpool ID.
        reaction(
            () => ({
                rtmConnected: this._rootStore.rtmConnected,
                carpoolId: this.selectedCarpoolId,
            }),
            async ({ rtmConnected, carpoolId }) => {
                if (rtmConnected && !!carpoolId) {
                    await this.joinCarpool(carpoolId);
                }
            }
        );
    }

    /**
     * Get the current user's carpools filtered by the type (created, driving, or passenger).
     */
    public getUserCarpoolsByType = (type: "created" | "driving" | "passenger"): CarpoolDto[] => {
        return this._userCarpools.filter(c => c.type === type).map(c => c.carpool);
    };

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
     * Updates an existing carpool and then updates the carpool in the collection if successful.
     */
    public updateCarpool = async (carpoolDto: UpsertCarpoolDto, carpoolId: string) => {
        try {
            this.setSaving(true);

            const carpool = await this._rootStore.apiClient.updateCarpool(carpoolId, carpoolDto);

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
                carpool = await this._rootStore.apiClient.getCarpool(carpoolUrlId, true);
                this.addCarpool(carpool);
            }

            this.setSelectedCarpoolId(carpool.id);
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
     * Load carpools by a user's display name.
     */
    public loadCarpools = async (displayName: string) => {
        try {
            this.setLoading(true);
            this.setCarpools(await this._rootStore.apiClient.getUserCarpools(displayName));
        } catch (error) {
            this._logger.error("Failed to load carpools", error);
            throw error;
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Load the **current** user's carpools.
     */
    public loadUserCarpools = async () => {
        await when(() => this._rootStore.authStore.isAuthenticated);

        try {
            this.setLoading(true);
            this.setUserCarpools(
                await this._rootStore.apiClient.getMyCarpools("created,driving,passenger")
            );
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
    private setUserCarpools = (carpools: CarpoolQueryResponseDto[]) => {
        this._userCarpools = carpools;
    };

    @action
    private clearUserCarpools = () => {
        this._userCarpools = [];
    };

    @action
    private metadataUpdated = (metadata: CarpoolMetadataDto) => {
        if (this.selectedCarpool) {
            this.selectedCarpool.metadata = metadata;
        }
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
