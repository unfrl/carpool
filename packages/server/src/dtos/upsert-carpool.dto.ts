import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Length, IsDefined, IsDateString, IsOptional } from "class-validator";

export class UpsertCarpoolDto {
    @ApiProperty()
    @Length(5, 50)
    public carpoolName: string;

    @ApiPropertyOptional()
    @IsOptional()
    public description: string;

    @ApiProperty()
    @IsDefined()
    public destination: string;

    @ApiProperty()
    @IsDateString()
    @IsDefined()
    public dateTime: Date;
}
