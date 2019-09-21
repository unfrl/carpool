import { ApiModelProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiModelProperty()
    public readonly email: string;

    @ApiModelProperty()
    public readonly password: string;
}
