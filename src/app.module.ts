import { Module } from "@nestjs/common";
import { ProjectsModule } from "./projects/projects.module";
import { GetDictionaryDataModule } from "./get-dictionary-data/get-dictionary-data.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { SavePdfModule } from "./save-pdf/save-pdf.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { AiModule } from "./ai/ai.module";
import { ConfigModule } from "@nestjs/config";
import { SocketEventsModule } from "./socket-events/socket-events.module";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { AppController } from "./app.controller";
import { pinoConfig } from "./pino.config";
import { LoggerModule } from "nestjs-pino";

@Module({
    imports: [
        LoggerModule.forRootAsync(pinoConfig),
        PrometheusModule.register(),
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
        }),

        ProjectsModule,
        GetDictionaryDataModule,
        AuthModule,
        SavePdfModule,
        AiModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        SocketEventsModule,
    ],

    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        // makeCounterProvider({
        //     name: "DEFGH_COUNTER",
        //     help: "metric_help",
        //     labelNames: ["endpoint"],
        // }),
    ],
})
export class AppModule {}
