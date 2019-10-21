import { Driver } from "../entities";
import { DriverDto } from "../dtos";
import { mapUserToDto } from "./";

export function mapDriverToDto(driver: Driver): DriverDto {
    const { id, car, carpoolId, user, passengers } = driver;

    return {
        id,
        car,
        carpoolId,
        user: mapUserToDto(user),
        seatsRemaining: car.capacity - (passengers || []).length,
        passengerUserIds: passengers.map(p => p.userId),
    };
}
