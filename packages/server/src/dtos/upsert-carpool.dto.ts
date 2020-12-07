import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Length, IsDefined, IsDateString, IsOptional } from "class-validator";

export class UpsertCarpoolDto {
    @ApiProperty()
    @Length(5, 50)
    public readonly carpoolName: string;

    @ApiPropertyOptional()
    @IsOptional()
    public readonly description: string;

    @ApiProperty()
    @IsDefined()
    public readonly destination: string;

    @ApiProperty()
    @IsDateString()
    @IsDefined()
    public readonly dateTime: Date;
}
