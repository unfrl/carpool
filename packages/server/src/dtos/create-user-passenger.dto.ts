import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsOptional, IsPhoneNumber } from "class-validator";

/**
 * DTO for creating a passenger for an authenticated user.
 */
export class CreateUserPassengerDto {
    @ApiModelPropertyOptional()
    @IsOptional()
    public readonly phoneNumber: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly address: string;
}
