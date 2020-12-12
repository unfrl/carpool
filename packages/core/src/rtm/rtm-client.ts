import io from "socket.io-client";

import { Logger } from "../utils";
import { CarpoolMethods } from "./methods";

export class RtmClient {
    private readonly _logger = new Logger("RtmClient");
    private readonly _socket: SocketIOClient.Socket;

    // methods
    public carpool: CarpoolMethods;

    public constructor(
        baseUri: string,
        onConnect: () => void,
        onDisconnect: () => void,
        private readonly signRequest: () => string
    ) {
        this._socket = io(baseUri);
        this._socket.on("connect", onConnect);
        this._socket.on("disconnect", onDisconnect);

        this.carpool = new CarpoolMethods(this);
    }

    /**
     * Attaches a callback function to the provided event to listen on.
     */
    public on = (event: string, fn: Function) => this._socket.on(event, fn);

    /**
     * Removes one (if passed in) or all listeners from an event.
     */
    public off = (event: string, fn?: Function) => this._socket.off(event, fn);

    /**
     * Emits an action with optional data payload and returns the response.
     */
    public emit = async (action: string, data?: any): Promise<any> => {
        return await this.emitWrapper(action, data);
    };

    /**
     * Wraps socket.emit in a promise.
     */
    private emitWrapper = async (action: string, data?: any): Promise<any> => {
        const payload = Object.assign({}, data || {}, { accessToken: this.signRequest() });

        return new Promise((resolve, reject) => {
            try {
                this._socket.emit(action, payload, (result: any) => {
                    resolve(result);
                });
            } catch (error) {
                this._logger.error(error);
                reject(error);
            }
        });
    };
}
