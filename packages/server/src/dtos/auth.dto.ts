import { ApiResponseModelProperty } from "@nestjs/swagger";

/**
 * DTO is returned from a successful sign in/up.
 */
export class AuthDto {
    @ApiResponseModelProperty()
    public accessToken: string;
}
