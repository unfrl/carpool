import { ApiModelProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail } from "class-validator";

/**
 * This DTO is provided to the client on successful authentication.
 */
export class UserDto {
    @ApiModelProperty()
    @IsDefined()
    public readonly id: string;

    @ApiModelProperty()
    @IsEmail()
    public readonly email: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly displayName: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly accessToken: string;
}
