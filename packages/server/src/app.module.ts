import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as IORedis from "ioredis";
import { MailerModule } from "@nest-modules/mailer";
import { BullModule } from 'nest-bull';

import { authConfig, dbConfig, redisConfig, mailModuleConfig } from "./config";
import {
    AuthController,
    UserController,
    CarpoolController,
    DriverController,
    PassengerController,
    VerificationController,
} from "./controllers";
import { CarpoolGateway } from "./gateways";
import {
    AuthService,
    UserService,
    CarpoolService,
    DriverService,
    PassengerService,
    VerificationService,
    JwtStrategy,
} from "./services";
import { Carpool, Driver, Passenger, User } from "./entities";
import { OAuth2Client } from "google-auth-library";
import { sendEmail, sendEmailFunctionName } from "./processors";

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([Carpool, Driver, Passenger, User]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: authConfig.secret,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MailerModule.forRootAsync({
            useFactory: () => mailModuleConfig,
        }),
        BullModule.register({
            name: 'bull',
            options: {
                redis: redisConfig,
            },
            processors: [{
                concurrency: 1, name: sendEmailFunctionName, callback: sendEmail
            }],
        }),
    ],
    controllers: [
        AuthController,
        UserController,
        CarpoolController,
        DriverController,
        PassengerController,
        VerificationController,
    ],
    providers: [
        AuthService,
        UserService,
        CarpoolService,
        CarpoolGateway,
        DriverService,
        PassengerService,
        VerificationService,
        JwtStrategy,
        {
            provide: IORedis,
            useValue: new IORedis(redisConfig),
        },
        {
            provide: OAuth2Client,
            useValue: new OAuth2Client(),
        }
    ],
})
export class AppModule { }
