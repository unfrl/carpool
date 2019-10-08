import { ApiModelProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

import { SignInDto } from "./sign-in.dto";

/**
 * DTO is used for the sign up method.
 */
export class SignUpDto extends SignInDto {
    @ApiModelProperty()
    @Length(5, 50)
    public readonly displayName: string;
}
