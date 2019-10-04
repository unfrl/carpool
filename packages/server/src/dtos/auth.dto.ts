import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, MinLength, IsDefined } from "class-validator";

/**
 * AuthDto is used for sign in/up requests. On successful authentication, the UserDto is provided in the response.
 */
export class AuthDto {
    @ApiModelProperty()
    @IsEmail()
    @IsDefined()
    public readonly email: string;

    @ApiModelProperty()
    @MinLength(8)
    @IsDefined()
    public readonly password: string;
}
