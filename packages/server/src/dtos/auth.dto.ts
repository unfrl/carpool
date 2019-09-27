import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";

/**
 * AuthDto is used for sign in/up requests. On successful authentication, the UserDto is provided in the response.
 */
export class AuthDto {
    @ApiModelProperty()
    @IsEmail()
    public readonly email: string;

    @ApiModelProperty()
    @MinLength(8)
    public readonly password: string;
}
