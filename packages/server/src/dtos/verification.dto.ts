import { ApiResponseProperty } from "@nestjs/swagger";

export class VerificationDto {
    @ApiResponseProperty()
    public email: string;

    @ApiResponseProperty()
    public token: string;
}
