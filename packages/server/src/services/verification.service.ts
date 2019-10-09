import { Injectable, Inject, ConflictException } from "@nestjs/common";
import * as cryptoRandomString from "crypto-random-string";
import * as IORedis from "ioredis";
import { MailerService } from "@nest-modules/mailer";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "../entities";
import { VerificationDto } from "../dtos";

@Injectable()
export class VerificationService {
    public constructor(
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
        @Inject(IORedis)
        private readonly _redisClient: IORedis.Redis,
        private readonly _mailerService: MailerService // private readonly _authService: AuthService // TODO: this blows up nest for some reason...
    ) {}

    public async sendVerificationEmail(user: User): Promise<void> {
        let verificationToken = cryptoRandomString({ length: 12, type: "url-safe" });
        let redisKey = this.getVerificationTokenRedisKey(verificationToken, user.email);

        await this._redisClient.setex(redisKey, 86400, ""); //Currently this sets the key to expire in 1 day (86400 seconds)

        let hostname = "localhost:3000"; //TODO: This has to be configurable
        let schema = "http"; //TODO: This has to be configurable
        let verificationUrl = `${schema}://${hostname}/verification?token=${verificationToken}&email=${user.email}`;

        await this._mailerService.sendMail({
            to: user.email,
            from: "noreply@carpool+unfrl.com",
            subject: "Welcome to Carpool!",
            html: `<h1>Welcome!</h1>\n<p>\nThanks for joining Carpool! Please verify your account by clicking\n<a href=\"${verificationUrl}\">here</a>\n</p>\n`,
        });
        console.log("Sent verification email");
    }

    public async verifyUser(verificationDto: VerificationDto): Promise<User> {
        const { token, email } = verificationDto;

        const redisKey = this.getVerificationTokenRedisKey(token, email);
        if (!(await this._redisClient.exists(redisKey))) {
            throw new ConflictException("Token provided is either expired or invalid.");
        }

        const user = await this._userRepository.findOneOrFail({ where: { email } });
        await this._redisClient.del(redisKey);
        user.isVerified = true;
        await this._userRepository.save(user);

        return user;
    }

    private getVerificationTokenRedisKey(token: string, email: string) {
        return `VERTOKEN_${email}_${token}`;
    }
}
