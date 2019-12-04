import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import * as jwt from "jsonwebtoken";

import { carpoolMessages, driverMessages, passengerMessages } from "@carpool/common";
import { CarpoolService, DriverService } from "../services";
import { DriverDto, CarpoolDto, PassengerDto } from "../dtos";
import { JwtPayload } from "../interfaces";
import { authConfig } from "../config";

// Carpool rooms are prefixed with this so they're easy to identify
const carpoolPrefix = "carpool";
const driverPrefix = "driver";

const getCarpoolRoom = (carpoolId: string) => {
    return `${carpoolPrefix}::${carpoolId}`;
};

const getCarpoolAuthenticatedRoom = (carpoolId: string) => {
    return `${getCarpoolRoom(carpoolId)}::authenticated`;
};

const getCarpoolDriverRoom = (carpoolId: string, driverId: string) => {
    return `${getCarpoolRoom(carpoolId)}::${driverPrefix}::${driverId}`;
};

const getCarpoolCreatorRoom = (carpoolId: string) => {
    return `${getCarpoolRoom(carpoolId)}::creator`;
};

@WebSocketGateway()
export class CarpoolGateway {
    @WebSocketServer()
    private _wsServer: Server;

    public constructor(
        private readonly _carpoolService: CarpoolService,
        private readonly _driverService: DriverService
    ) { }

    /**
     * Client has requested to join a carpool to listen for updates.
     */
    @SubscribeMessage(carpoolMessages.actions.join)
    public async handleJoinCarpool(
        socket: Socket,
        data: { carpoolId: string; accessToken?: string }
    ) {
        const { carpoolId, accessToken } = data;

        let carpool: CarpoolDto | undefined;
        try {
            carpool = await this._carpoolService.findCarpoolById(carpoolId);
        } catch (error) {
            console.log("Failed to find carpool", error);
            return { successful: false, error: `Carpool not found for ID: ${carpoolId}` };
        }

        // remove socket from any previous carpool rooms using the carpoolPrefix
        const socketRoomIds = Object.keys(socket.rooms);
        socketRoomIds.forEach(roomId => {
            if (roomId.indexOf(carpoolPrefix) > -1) {
                socket.leave(roomId);
            }
        });

        // base carpool room gets updates to: name, destination, time, # of drivers & remaining seats
        socket.join(getCarpoolRoom(carpoolId));

        const successResponse = {
            successful: true,
            data: "Successfully joined!",
        };

        if (!accessToken) {
            return successResponse;
        }

        try {
            const { sub } = jwt.verify(accessToken, authConfig.secret) as JwtPayload;

            // authenticated room receives updates to drivers and their details
            socket.join(getCarpoolAuthenticatedRoom(carpoolId));

            // creators have access to all changes made to a carpool
            if (sub === carpool.user.id) {
                socket.join(getCarpoolCreatorRoom(carpoolId));
            } else {
                const driverId = await this._driverService.findDriverIdByUserCarpoolId(
                    sub,
                    carpoolId
                );
                // drivers have access to changes made by their passenger
                if (driverId) {
                    socket.join(getCarpoolDriverRoom(carpoolId, driverId));
                }
            }

            return successResponse;
        } catch (error) {
            console.log("Failed to decode JWT", error);
            return successResponse;
        }
    }

    /**
     * Emit carpool updated event to the carpool room.
     * @param carpool - The updated carpool to send
     */
    public emitCarpoolUpdated(carpool: CarpoolDto) {
        this._wsServer.to(getCarpoolRoom(carpool.id)).emit(carpoolMessages.events.updated, carpool);
    }

    /**
     * Emit driver added event to the carpool room.
     * @param driverDto - The added driver to send
     */
    public emitDriverAdded(driverDto: DriverDto) {
        this._wsServer
            .to(getCarpoolAuthenticatedRoom(driverDto.carpoolId))
            .emit(driverMessages.events.added, driverDto);
    }

    /**
     * Emit driver updated event to the carpool room.
     * @param driverDto - The updated driver to send
     */
    public emitDriverUpdated(driverDto: DriverDto) {
        this._wsServer
            .to(getCarpoolAuthenticatedRoom(driverDto.carpoolId))
            .emit(driverMessages.events.updated, driverDto);
    }

    /**
     * Emit driver removed event to the carpool room.
     * @param driverDto - The removed driver to send
     */
    public emitDriverRemoved(driverDto: DriverDto) {
        this._wsServer
            .to(getCarpoolAuthenticatedRoom(driverDto.carpoolId))
            .emit(driverMessages.events.removed, driverDto);
    }

    /**
     * Emit passenger added event to the carpool creator room and the passenger's driver's room
     * @param passengerDto The added passenger to send
     */
    public async emitPassengerAdded(passengerDto: PassengerDto) {
        let carpoolId = await this._carpoolService.findCarpoolIdByDriverId(passengerDto.driverId);

        this._wsServer
            .to(getCarpoolDriverRoom(carpoolId, passengerDto.driverId))
            .emit(passengerMessages.events.added, passengerDto);

        this._wsServer
            .to(getCarpoolCreatorRoom(carpoolId))
            .emit(passengerMessages.events.added, passengerDto);
    }

    /**
     * Emit passenger update event to the carpool creator room and the passenger's driver's room
     * @param passengerDto The added passenger to send
     */
    public async emitPassengerUpdated(passengerDto: PassengerDto) {
        let carpoolId = await this._carpoolService.findCarpoolIdByDriverId(passengerDto.driverId);

        this._wsServer
            .to(getCarpoolDriverRoom(carpoolId, passengerDto.driverId))
            .emit(passengerMessages.events.updated, passengerDto);

        this._wsServer
            .to(getCarpoolCreatorRoom(carpoolId))
            .emit(passengerMessages.events.updated, passengerDto);
    }

    /**
     * Emit passenger removed event to the carpool creator room and the passenger's driver's room
     * @param passengerId The removed passenger Id to send
     * @param driverId The removed passenger's driver's Id
     */
    public async emitPassengerRemoved(passengerDto: PassengerDto) {
        let carpoolId = await this._carpoolService.findCarpoolIdByDriverId(passengerDto.driverId);

        this._wsServer
            .to(getCarpoolDriverRoom(carpoolId, passengerDto.driverId))
            .emit(passengerMessages.events.removed, passengerDto);

        this._wsServer
            .to(getCarpoolCreatorRoom(carpoolId))
            .emit(passengerMessages.events.removed, passengerDto);
    }
}
