import { ApiModelProperty } from "@nestjs/swagger";

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
