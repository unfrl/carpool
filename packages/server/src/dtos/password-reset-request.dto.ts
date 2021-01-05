import { IsEmail, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PasswordResetRequestDto {
    @IsEmail()
    @IsDefined()
    @ApiProperty()
    public email: string;
}
