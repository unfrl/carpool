import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsDefined } from "class-validator";

export class PasswordResetDto {
    @ApiModelProperty()
    @IsEmail()
    @IsDefined()
    public email: string;

    @ApiModelProperty()
    @IsDefined()
    public token: string;

    @ApiModelProperty()
    @IsDefined()
    public newPassword: string;
}
