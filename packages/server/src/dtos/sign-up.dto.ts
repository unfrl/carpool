import { ApiModelProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

import { AuthDto } from "./auth.dto";

/**
 * DTO is used for the sign up method.
 */
export class SignUpDto extends AuthDto {
    @ApiModelProperty()
    @Length(5, 50)
    public readonly displayName: string;
}
