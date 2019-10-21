import { User } from "../entities";
import { UserDto } from "../dtos";

export function mapUserToDto(user: User): UserDto {
    const { id, displayName, email } = user;

    return {
        id,
        displayName,
        email,
    };
}
