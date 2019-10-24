import { CarpoolDto, DriverDto } from "@carpool/client";
import { RtmClient } from "../rtm-client";

export class CarpoolMethods {
    constructor(private readonly _rtmClient: RtmClient) {}

    //#region Actions

    public joinCarpoolRoom = async (carpoolId: string): Promise<boolean> => {
        const response = await this._rtmClient.emit("carpool.join", { carpoolId });
        return response.successful;
    };

    //#endregion

    //#region Events

    public onCarpoolUpdated = (cb: (carpool: CarpoolDto) => void) => {
        this._rtmClient.on("carpool.updated", cb);
    };

    public onDriverUpdated = (cb: (driver: DriverDto) => void) => {
        this._rtmClient.on("carpool-driver.updated", cb);
    };

    //#endregion
}
