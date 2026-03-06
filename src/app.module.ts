import { Module } from "@nestjs/common";
import { ProjectsModule } from "./projects/projects.module";
import { GetDictionaryDataModule } from "./get-dictionary-data/get-dictionary-data.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
// import { SkipAuth } from "./auth/decorators/skip-auth.decorator";
import { SavePdfModule } from "./save-pdf/save-pdf.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { AiModule } from "./ai/ai.module";
import { ConfigModule } from "@nestjs/config";
import { SocketEventsModule } from './socket-events/socket-events.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_SERVER,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.EMAIL_SECURE),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),

    ProjectsModule,
    GetDictionaryDataModule,
    AuthModule,
    SavePdfModule,
    AiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    SocketEventsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
