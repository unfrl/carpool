import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsDefined } from "class-validator";

export class PasswordResetDto {
    @ApiProperty()
    @IsEmail()
    @IsDefined()
    public email: string;

    @ApiProperty()
    @IsDefined()
    public token: string;

    @ApiProperty()
    @IsDefined()
    public newPassword: string;
}
