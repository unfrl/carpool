import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { authConfig, dbConfig } from './config';
import { AuthController } from './controllers';
import { UserService, JwtStrategy } from './services';
import { Carpool, Driver, Event, Organization, Passenger, User } from './entities';

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([
            Carpool,
            Driver,
            Event,
            Organization,
            Passenger,
            User,
        ]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: authConfig.secret,
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        UserService,
        JwtStrategy,
    ],
})
export class AppModule { }
