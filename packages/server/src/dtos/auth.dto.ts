import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO is returned from a successful sign in/up.
 */
export class AuthDto {
    @ApiProperty()
    public accessToken: string;
}
