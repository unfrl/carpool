import { AuthDto } from "./auth.dto";
import { ApiModelProperty } from "@nestjs/swagger";

export class SignUpDto extends AuthDto {
    @ApiModelProperty()
    public readonly name: string;
}
