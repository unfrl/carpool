import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsOptional } from "class-validator";

/**
 * DTO for creating a passenger for an authenticated user.
 */
export class CreatePassengerDto {
    @ApiModelPropertyOptional()
    @IsOptional()
    public readonly phoneNumber: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly address: string;
}
