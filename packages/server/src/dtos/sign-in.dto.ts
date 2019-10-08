import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, MinLength, IsDefined } from "class-validator";

export class SignInDto {
    @ApiModelProperty()
    @IsEmail()
    @IsDefined()
    public readonly email: string;

    @ApiModelProperty()
    @MinLength(8)
    @IsDefined()
    public readonly password: string;
}
