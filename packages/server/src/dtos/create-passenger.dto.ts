import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsOptional, Length, IsPhoneNumber } from "class-validator";

/**
 * DTO for creating a passenger for a non-authenticated user.
 */
export class CreatePassengerDto {
    @ApiModelProperty()
    @IsDefined()
    @Length(1, 50)
    public readonly name: string;

    @ApiModelProperty()
    @IsEmail()
    public readonly email: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    public readonly phoneNumber: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly address: string;
}
