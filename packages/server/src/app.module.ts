import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as IORedis from "ioredis";
import { MailerModule } from "@nest-modules/mailer";

import { authConfig, dbConfig, redisConfig, emailConfig } from "./config";
import { AuthController, CarpoolController } from "./controllers";
import { AuthService, UserService, JwtStrategy, CarpoolService } from "./services";
import { Carpool, Driver, Passenger, User } from "./entities";

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([Carpool, Driver, Passenger, User]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secretOrPrivateKey: authConfig.secret,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MailerModule.forRootAsync({
            useFactory: () => emailConfig,
        }),
    ],
    controllers: [AuthController, CarpoolController],
    providers: [
        AuthService,
        UserService,
        CarpoolService,
        JwtStrategy,
        {
            provide: IORedis,
            useValue: new IORedis(redisConfig),
        },
    ],
})
export class AppModule {}
