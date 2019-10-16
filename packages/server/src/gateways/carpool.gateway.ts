import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

import { CarpoolService } from "../services";
import { Carpool } from "../entities";

// TODO: move to shared project so it can be referenced RTM client
const carpoolMessages = {
    actions: {
        join: "carpool.join",
    },
    events: {
        updated: "carpool.updated",
    },
};

// Carpool rooms are prefixed with this so they're easy to identify
const carpoolPrefix = "carpool::";
const getCarpoolRoom = (carpoolId: string) => {
    return `${carpoolPrefix}${carpoolId}`;
};

@WebSocketGateway()
export class CarpoolGateway {
    @WebSocketServer()
    private _wsServer: Server;

    public constructor(private readonly _carpoolService: CarpoolService) {}

    /**
     * Client has requested to join a carpool to listen for updates.
     */
    @SubscribeMessage(carpoolMessages.actions.join)
    public async handleJoinCarpool(socket: Socket, data: { carpoolId: string }) {
        const { carpoolId } = data;
        if (!(await this._carpoolService.carpoolExists(carpoolId))) {
            return { successful: false, error: `Carpool not found for ID: ${carpoolId}` };
        }

        // Note: we allow clients to join multiple carpool rooms to listen for changes
        // When that socket disconnects, they'll be automatically removed from the rooms
        const carpoolRoom = getCarpoolRoom(carpoolId);
        socket.join(carpoolRoom);

        // TODO: standardize the return payload and update this method's return type
        return { successful: true, data: `Successfully joined room: ${carpoolRoom}` };
    }

    /**
     * Emit carpool updated event to the carpool room.
     * @param carpool - The updated carpool to send.
     */
    public emitCarpoolUpdated(carpool: Carpool) {
        this._wsServer.to(getCarpoolRoom(carpool.id)).emit(carpoolMessages.events.updated, carpool);
    }
}
