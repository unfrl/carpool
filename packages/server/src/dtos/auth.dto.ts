import { ApiResponseProperty } from "@nestjs/swagger";

/**
 * DTO is returned from a successful sign in/up.
 */
export class AuthDto {
    @ApiResponseProperty()
    public accessToken: string;
}
