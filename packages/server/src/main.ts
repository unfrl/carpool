import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as fs from "fs";

const PORT = process.env.PORT || 1337;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configure swagger documentation
    const options = new DocumentBuilder()
        .setTitle("Carpool")
        .setDescription("Free carpool app for cool peeps and their friends")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, options);

    // TODO: api spec changes are written file directory on startup - need to find a better way to do this
    fs.writeFileSync("./api-swagger-spec.json", JSON.stringify(document));

    SwaggerModule.setup("swagger", app, document);

    // Bind all endpoints to be automatically checked for incorrect data
    // See Nest auto-validation docs for info: https://docs.nestjs.com/techniques/validation#auto-validation
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT);
}
bootstrap();
