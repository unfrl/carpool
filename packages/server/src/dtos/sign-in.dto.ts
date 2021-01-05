import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength, IsDefined } from "class-validator";

export class SignInDto {
    @ApiProperty()
    @IsEmail()
    @IsDefined()
    public email: string;

    @ApiProperty()
    @MinLength(8)
    @IsDefined()
    public password: string;
}
