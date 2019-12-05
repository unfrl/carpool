import { CarpoolDto, DriverDto, PassengerDto, CarpoolMetadataDto } from "@carpool/client";
import { carpoolMessages, driverMessages, passengerMessages } from "@carpool/common";
import { RtmClient } from "../rtm-client";

export class CarpoolMethods {
    constructor(private readonly _rtmClient: RtmClient) {}

    //#region Actions

    public joinCarpoolRoom = async (carpoolId: string): Promise<boolean> => {
        const response = await this._rtmClient.emit(carpoolMessages.actions.join, { carpoolId });
        return response.successful;
    };

    public joinDriverRoom = async (carpoolId: string, driverId: string): Promise<boolean> => {
        const response = await this._rtmClient.emit(driverMessages.actions.join, {
            carpoolId,
            driverId,
        });
        return response.successful;
    };

    //#endregion

    //#region Events

    public onCarpoolUpdated = (cb: (carpool: CarpoolDto) => void) => {
        this._rtmClient.on(carpoolMessages.events.updated, cb);
    };

    public onDriverAdded = (cb: (driver: DriverDto) => void) => {
        this._rtmClient.on(driverMessages.events.added, cb);
    };

    public onDriverUpdated = (cb: (driver: DriverDto) => void) => {
        this._rtmClient.on(driverMessages.events.updated, cb);
    };

    //TODO: we dont currently handle a driver leaving (driverMessages.events.removed) (should be addressed in #119)
    //TODO: we dont currently handle a passenger being updated (passengerMessages.events.updated) (should be addressed in #101)

    public onPassengerAdded = (cb: (passenger: PassengerDto) => void) => {
        this._rtmClient.on(passengerMessages.events.added, cb);
    };

    public onPassengerRemoved = (cb: (passenger: PassengerDto) => void) => {
        this._rtmClient.on(passengerMessages.events.removed, cb);
    };

    public onMetadataUpdated = (cb: (metadata: CarpoolMetadataDto) => void) => {
        this._rtmClient.on(carpoolMessages.events.metadataUpdated, cb);
    };

    //#endregion
}
