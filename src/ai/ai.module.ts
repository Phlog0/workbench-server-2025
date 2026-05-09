import { Module } from "@nestjs/common";
import { AiService } from "./ai.service";
import { AiController } from "./ai.controller";
import { HttpModule } from "@nestjs/axios";
@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
            headers: {
                "Content-Type": "application/json",
            },
        }),
    ],
    controllers: [AiController],
    providers: [AiService],
    exports: [AiService],
})
export class AiModule {}
