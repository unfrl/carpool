import { AuthDto } from "./auth.dto";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 * DTO is used for the sign up method.
 */
export class SignUpDto extends AuthDto {
    @ApiModelProperty()
    public readonly displayName: string;
}
