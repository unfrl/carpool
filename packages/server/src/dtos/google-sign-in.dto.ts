import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsDefined } from "class-validator";

export class GoogleSignInDto {
    @ApiProperty()
    @IsDefined()
    public readonly idToken: string;

    @ApiPropertyOptional()
    public readonly displayName?: string;
}
