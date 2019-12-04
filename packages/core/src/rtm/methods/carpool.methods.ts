import { CarpoolDto, DriverDto } from "@carpool/client";
import { carpoolMessages, driverMessages } from "@carpool/common";
import { RtmClient } from "../rtm-client";

export class CarpoolMethods {
    constructor(private readonly _rtmClient: RtmClient) {}

    //#region Actions

    public joinCarpoolRoom = async (carpoolId: string): Promise<boolean> => {
        const response = await this._rtmClient.emit(carpoolMessages.actions.join, { carpoolId });
        return response.successful;
    };

    //#endregion

    //#region Events

    public onCarpoolUpdated = (cb: (carpool: CarpoolDto) => void) => {
        this._rtmClient.on(carpoolMessages.events.updated, cb);
    };

    public onDriverUpdated = (cb: (driver: DriverDto) => void) => {
        this._rtmClient.on(driverMessages.events.updated, cb);
    };

    //#endregion
}
