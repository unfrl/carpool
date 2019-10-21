import { Passenger } from "../entities";
import { PassengerDto } from "../dtos";
import { mapUserToDto } from "./";

export function mapPassengerToDto(passenger: Passenger): PassengerDto {
    const { id, phoneNumber, address, user, driverId } = passenger;

    return {
        id,
        phoneNumber,
        address,
        user: mapUserToDto(user),
        driverId,
    };
}
