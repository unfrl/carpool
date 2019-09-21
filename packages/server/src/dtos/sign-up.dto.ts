import { AuthDto } from './auth.dto';

export class SignUpDto extends AuthDto {
    public readonly name: string;
}
