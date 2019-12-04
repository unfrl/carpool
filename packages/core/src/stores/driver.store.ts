import { action, observable, reaction } from "mobx";

import { DriverDto, UpsertDriverDto, UpsertPassengerDto, PassengerDto } from "@carpool/client";
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

        this._rootStore.rtmClient.carpool.onDriverUpdated(this.setUpdatedDriver);
        this._rootStore.rtmClient.carpool.onDriverAdded(this.addDriver);
        this._rootStore.rtmClient.carpool.onPassengerAdded(this.addPassenger)
        this._rootStore.rtmClient.carpool.onPassengerRemoved(this.removePassenger);
    }

    public createDriver = async (carpoolId: string, createDriverDto: UpsertDriverDto) => {
        try {
            await this._rootStore.apiClient.createDriver(createDriverDto, carpoolId);
        } catch (error) {
            this._logger.error("Failed to create driver", error);
            throw error;
        }
    };

    public createUserPassenger = async (
        createPassengerDto: UpsertPassengerDto,
        driverId: string
    ) => {
        try {
            const passenger = await this._rootStore.apiClient.createPassenger(
                createPassengerDto,
                driverId
            );

            const index = this.drivers.findIndex(d => d.id === driverId);
            if (index > -1) {
                const passengers = (this.drivers[index].passengers || []).slice();
                passengers.push(passenger);
                this.drivers[index].passengers = passengers;

                const passengerUserIds = (this.drivers[index].passengerUserIds || []).slice();
                passengerUserIds.push(passenger.user.id);
                this.drivers[index].passengerUserIds = passengerUserIds;
            }
            this._logger.info("Passenger created!", passenger);
        } catch (error) {
            this._logger.error("Failed to create passenger", error);
        }
    };

    public removeUserPassenger = async (driverId: string) => {
        try {
            await this._rootStore.apiClient.deletePassenger(driverId);
            const userId = this._rootStore.authStore.user?.id;
            if (userId) {
                const driverPassengerUserIdIndex = this.drivers.findIndex(d => d.passengerUserIds.indexOf(userId) > -1);
                if (driverPassengerUserIdIndex > -1) {
                    const passengerUserIdIndex = this.drivers[driverPassengerUserIdIndex].passengerUserIds.indexOf(userId);
                    this.drivers[driverPassengerUserIdIndex].passengerUserIds.splice(passengerUserIdIndex, 1);
                }

                const driverPassengerIndex = this.drivers.findIndex(d => d.passengers.findIndex(p => p.user.id === userId) > -1);
                if (driverPassengerIndex > -1) {
                    const passengerIndex = this.drivers[driverPassengerIndex].passengers.findIndex(p => p.user.id === userId);
                    this.drivers[driverPassengerIndex].passengers.splice(passengerIndex, 1);
                }
            }

            this._logger.info("Passenger deleted!");
        } catch (error) {
            this._logger.error("Failed to delete passenger", error);
        }
    };

    private loadDrivers = async (carpoolId: string) => {
        try {
            this.setLoading(true);

            this._logger.info("Loading drivers for carpool ID", carpoolId);

            const drivers = await this._rootStore.apiClient.getDrivers(carpoolId);
            if (this._rootStore.authStore.user) {
                if (this._rootStore.carpoolStore.selectedCarpool?.user.id === this._rootStore.authStore.user!.id) { //The current user is the creator of this carpool, load ALL passenger info
                    for (const driver of drivers) {
                        driver.passengers = await this._rootStore.apiClient.getPassengers(driver.id);
                    }
                }
                else {
                    let userDriverIndex = drivers.findIndex((driver) => driver.user.id == this._rootStore.authStore.user!.id);

                    if (userDriverIndex > -1) { //The current user is a driver, so we should load their passenger info as well
                        drivers[userDriverIndex].passengers = await this._rootStore.apiClient.getPassengers(drivers[userDriverIndex].id);
                    }
                }
            }

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
        if (this._rootStore.authStore.user?.id === driver.user.id) {
            this.joinAsDriver(driver.carpoolId, driver.id); //Join 'your' driver room to listen for updates to passengers
        }
    };

    /**
     * Joins the driver room to subscribe for real-time updates.
     */
    private joinAsDriver = async (carpoolId: string, driverId: string) => {
        this._logger.info("Joining driver room:", carpoolId);
        await this._rootStore.rtmClient.carpool.joinDriverRoom(carpoolId, driverId);
    };

    @action
    private addPassenger = (passenger: PassengerDto) => {

        const index = this.drivers.findIndex(d => d.id === passenger.driverId);
        if (index > -1) {
            if (this.drivers[index].passengers) {
                this.drivers[index].passengers.push(passenger);
            }
            else {
                this.drivers[index].passengers = [passenger];
            }
        }

    }

    @action
    private removePassenger = (passenger: PassengerDto) => {

        this.drivers.forEach(driver => {
            if (driver.passengerUserIds) {
                const passengerIdIndex = driver.passengerUserIds.findIndex(passengerUserId => passengerUserId === passenger.user.id);

                if (passengerIdIndex > -1) {
                    driver.passengerUserIds.splice(passengerIdIndex, 1);
                }
            }
            // If the current user is the driver they will also have a populated passenger list, from which we must remove the passenger
            if (driver.passengers.length) {
                const passengerIndex = driver.passengers.findIndex(pass => pass.id === passenger.id);

                if (passengerIndex > -1) {
                    driver.passengers.splice(passengerIndex, 1);
                }
            }

        });
    }

    @action
    private setDrivers = (drivers: DriverDto[]) => {
        this.drivers = drivers;
    };

    @action
    private setUpdatedDriver = (driver: DriverDto) => {
        const index = this.drivers.findIndex(d => d.id === driver.id);
        if (index > -1) {
            driver.passengers = this.drivers[index].passengers; //The passengers are not updated here
            driver.passengerUserIds = this.drivers[index].passengerUserIds //The passengers are not updated here
            this.drivers[index] = driver;
        }
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
