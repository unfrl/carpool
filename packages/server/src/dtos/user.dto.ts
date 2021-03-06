import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail } from "class-validator";

/**
 * This DTO is provided to the client on successful authentication.
 */
export class UserDto {
    @ApiProperty()
    @IsDefined()
    public id: string;

    @ApiProperty()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @IsDefined()
    public displayName: string;
}
