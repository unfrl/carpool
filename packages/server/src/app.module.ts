import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as IORedis from "ioredis";

import { authConfig, dbConfig, redisConfig } from "./config";
import { AuthController, EventController, CarpoolController } from "./controllers";
import { AuthService, UserService, EventService, JwtStrategy, CarpoolService } from "./services";
import { Carpool, Driver, Event, Passenger, User } from "./entities";

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([Carpool, Driver, Event, Passenger, User]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secretOrPrivateKey: authConfig.secret,
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    controllers: [AuthController, EventController, CarpoolController],
    providers: [
        AuthService,
        UserService,
        EventService,
        CarpoolService,
        JwtStrategy,
        {
            provide: IORedis,
            useValue: new IORedis(redisConfig),
        },
    ],
})
export class AppModule {}
