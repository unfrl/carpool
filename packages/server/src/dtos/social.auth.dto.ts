import { ApiProperty } from "@nestjs/swagger";
import { AuthDto } from "./auth.dto";
import { SocialLoginSteps } from "@carpool/common";

/**
 * DTO is returned when attempting to sign-in using social authentication. It will return an accessToken if the login succeeds, or info if further steps are needed.
 */
export class SocialAuthDto extends AuthDto {
    @ApiProperty()
    public nextStep: SocialLoginSteps;

    @ApiProperty()
    public error?: string;
}
