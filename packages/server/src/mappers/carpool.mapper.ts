import { Carpool } from "../entities";
import { CarpoolDto } from "../dtos";
import { mapUserToDto } from ".";

export function mapCarpoolToDto(carpool: Carpool): CarpoolDto {
    const {
        id,
        name,
        urlId,
        destination,
        description,
        dateTime,
        created,
        updated,
        createdBy,
    } = carpool;

    return {
        id,
        name,
        urlId,
        destination,
        description,
        dateTime,
        created,
        updated,
        user: mapUserToDto(createdBy),
    };
}
