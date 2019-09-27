import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { authConfig } from "../config";
import { User } from "../entities";
import { JwtPayload } from "../interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfig.secret,
        });
    }

    public async validate(payload: JwtPayload) {
        const user = await this.userRepository.findOne(payload.sub, {
            select: ["id", "displayName", "email"],
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
