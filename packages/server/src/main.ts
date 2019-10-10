import { NestFactory } from "@nestjs/core";
import { ValidationPipe, INestApplication, INestExpressApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as fs from "fs";
import { RateLimiterMemory } from "rate-limiter-flexible";

const PORT = process.env.PORT || 1337;

// TODO: update this array with any new origins and/or pull from env variable
const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
    origin: (origin: string, cb: Function) => {
        if (allowedOrigins.indexOf(origin) > -1) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configure swagger documentation
    const options = new DocumentBuilder()
        .setTitle("Carpool")
        .setDescription("Free carpool app for cool peeps and their friends")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);

    // TODO: api spec changes are written file directory on startup - need to find a better way to do this
    fs.writeFileSync("./api-swagger-spec.json", JSON.stringify(document));

    SwaggerModule.setup("swagger", app, document);

    // Bind all endpoints to be automatically checked for incorrect data
    // See Nest auto-validation docs for info: https://docs.nestjs.com/techniques/validation#auto-validation
    app.useGlobalPipes(new ValidationPipe());

    // Configure CORS
    app.enableCors(corsOptions);

    registerRateLimiters(app);

    await app.listen(PORT);
}

function registerRateLimiters(app: INestApplication & INestExpressApplication) {
    const opts = {
        points: 45, // 45 points
        duration: 60, // Per minute
    };

    const rateLimiter = new RateLimiterMemory(opts);
    const rateLimiterMiddleware = (req, res, next) => {
        rateLimiter
            .consume(req.ip)
            .then(() => {
                next();
            })
            .catch(_ => {
                res.status(429).send("Too Many Requests");
            });
    };

    app.use(rateLimiterMiddleware);
}

bootstrap();
