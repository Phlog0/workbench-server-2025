import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import { collectDefaultMetrics, register } from "prom-client";
import { Response } from "express";
import "./metrics";
import { Logger } from "nestjs-pino";
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>("SERVER_PORT", 3000);
    const clientUrl = configService.get<string>("CLIENT_URL");
    const databaseUrl = configService.get<string>("DATABASE_URL");

    app.enableCors({
        origin: [clientUrl, databaseUrl],
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());

    app.setGlobalPrefix("api");

    // app.useGlobalInterceptors(new ApiResponseInterceptor());

    app.use(json({ limit: "100mb" }));
    app.use(urlencoded({ limit: "100mb", extended: true }));
    app.use(cookieParser());
    app.useLogger(app.get(Logger));
    const config = new DocumentBuilder()
        .setTitle("Workbench-server-api")
        .setDescription("Описание API сервера")
        .setVersion("1.0")
        .addTag("API")
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api", app, documentFactory);

    await app.listen(port, "0.0.0.0");

    console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
