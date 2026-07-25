import { Module } from "@nestjs/common";
import { ProjectsModule } from "./projects/projects.module";
import { GetDictionaryDataModule } from "./get-dictionary-data/get-dictionary-data.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        // LoggerModule.forRootAsync(pinoConfig),
        // PrometheusModule.register(),
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
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
    ],

    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
