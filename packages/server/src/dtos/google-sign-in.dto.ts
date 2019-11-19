import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

import { IsDefined } from "class-validator";

export class GoogleSignInDto {
    @ApiModelProperty()
    @IsDefined()
    public readonly idToken: string;

    @ApiModelPropertyOptional()
    public readonly displayName?: string;
}
