import { action, observable, reaction } from "mobx";

import { DriverDto, CreateDriverDto } from "@carpool/client";
import { Logger } from "../utils";
import { RootStore } from "./root.store";

export class DriverStore {
    private readonly _logger = new Logger("DriverStore");

    @observable
    public drivers: DriverDto[] = [];

    @observable
    public loading: boolean = false;

    public constructor(private readonly _rootStore: RootStore) {
        reaction(
            () => this._rootStore.carpoolStore.selectedCarpoolId,
            async carpoolId => {
                if (carpoolId) {
                    await this.loadDrivers(carpoolId);
                } else {
                    this.clearDrivers();
                }
            }
        );
    }

    public createDriver = async (carpoolId: string, createDriverDto: CreateDriverDto) => {
        try {
            const driver = await this._rootStore.apiClient.createDriver(createDriverDto, carpoolId);
            this.addDriver(driver);
        } catch (error) {
            this._logger.error("Failed to create driver", error);
            throw error;
        }
    };

    private loadDrivers = async (carpoolId: string) => {
        try {
            this.setLoading(true);

            this._logger.info("Loading drivers for carpool ID", carpoolId);

            const drivers = await this._rootStore.apiClient.getDrivers(carpoolId);

            this.setDrivers(drivers);
        } catch (error) {
            this._logger.error("Failed to load drivers", error);
        } finally {
            this.setLoading(false);
        }
    };

    //#region Actions

    @action
    private addDriver = (driver: DriverDto) => {
        this.drivers.push(driver);
    };

    @action
    private setDrivers = (drivers: DriverDto[]) => {
        this.drivers = drivers;
    };

    @action
    private clearDrivers = () => {
        this.drivers = [];
    };

    @action
    private setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    //#endregion
}
