import { ApiModelProperty } from "@nestjs/swagger";

/**
 * This DTO is provided to the client on successful authentication.
 */
export class UserDto {
    @ApiModelProperty()
    public readonly id: string;

    @ApiModelProperty()
    public readonly email: string;

    @ApiModelProperty()
    public readonly displayName: string;

    @ApiModelProperty()
    public readonly accessToken: string;
}
