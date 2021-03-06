import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsOptional } from "class-validator";

/**
 * DTO for creating a passenger for an authenticated user.
 */
export class UpsertPassengerDto {
    @ApiPropertyOptional()
    @IsOptional()
    public phoneNumber: string;

    @ApiProperty()
    @IsDefined()
    public address: string;
}
