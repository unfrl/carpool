import { ApiModelProperty } from "@nestjs/swagger";
import { IsDefined, IsOptional, IsPhoneNumber } from "class-validator";

/**
 * DTO for creating a passenger for an authenticated user.
 */
export class CreateUserPassengerDto {
    @ApiModelProperty()
    @IsOptional()
    @IsPhoneNumber("US")
    public readonly phoneNumber: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly address: string;
}
