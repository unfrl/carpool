import { IsEmail, IsDefined } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class PasswordResetRequestDto {
    @IsEmail()
    @IsDefined()
    @ApiModelProperty()
    public readonly email: string;
}
