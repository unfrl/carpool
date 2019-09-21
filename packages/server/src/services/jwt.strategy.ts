import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities';
import { IJwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        });
    }

    public async validate(payload: IJwtPayload) {
        const user = await this.userRepository.findOne(payload.sub, {
            select: ['id', 'displayName', 'email'],
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
