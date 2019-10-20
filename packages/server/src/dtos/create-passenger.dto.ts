import { ApiModelProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsOptional, Length, IsPhoneNumber } from "class-validator";

/**
 * DTO for creating a passenger for a non-authenticated user.
 */
export class CreatePassengerDto {
    @ApiModelProperty()
    @IsDefined()
    @Length(5, 50)
    public readonly name: string;

    @ApiModelProperty()
    @IsEmail()
    public readonly email: string;

    @ApiModelProperty()
    @IsOptional()
    @IsPhoneNumber("US")
    public readonly phoneNumber: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly address: string;
}
