import { ApiModelProperty } from "@nestjs/swagger";

/**
 * AuthDto is used for sign in/up requests. On successful authentication, the UserDto is provided in the response.
 */
export class AuthDto {
    @ApiModelProperty()
    public readonly email: string;

    @ApiModelProperty()
    public readonly password: string;
}
