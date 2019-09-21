import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

const PORT = process.env.PORT || 1337;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle("Carpool")
        .setDescription("Free carpool app for cool peeps and their friends")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document);

    await app.listen(PORT);
}
bootstrap();
