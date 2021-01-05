import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsDefined } from "class-validator";

export class GoogleSignInDto {
    @ApiProperty()
    @IsDefined()
    public idToken: string;

    @ApiPropertyOptional()
    public displayName?: string;
}
