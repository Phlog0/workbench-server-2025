import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

import * as bodyParser from "body-parser";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
  await app.listen(3000);
}
bootstrap();
