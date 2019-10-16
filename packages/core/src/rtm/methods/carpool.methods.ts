import { Carpool } from "@carpool/client";
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

    public onCarpoolUpdated = (cb: (carpool: Carpool) => void) => {
        this._rtmClient.on("carpool.updated", cb);
    };

    //#endregion
}
