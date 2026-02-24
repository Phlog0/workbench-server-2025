import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
  app.use(cookieParser());

  await app.listen(port, "0.0.0.0");
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
