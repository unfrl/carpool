import { ApiResponseModelProperty } from "@nestjs/swagger";

export class VerificationDto {
    @ApiResponseModelProperty()
    public email: string;

    @ApiResponseModelProperty()
    public token: string;
}
