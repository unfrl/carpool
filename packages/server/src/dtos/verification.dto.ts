import { ApiProperty } from "@nestjs/swagger";

export class VerificationDto {
    @ApiProperty()
    public email: string;

    @ApiProperty()
    public token: string;
}
