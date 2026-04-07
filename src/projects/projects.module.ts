import { Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { PrismaService } from "../prisma.service";
import { AiModule } from "@/ai/ai.module";
import { SocketEventsModule } from "@/socket-events/socket-events.module";
import { SocketEventsGateway } from "@/socket-events/socket-events.gateway";
@Module({
    controllers: [ProjectsController],
    providers: [SocketEventsGateway, ProjectsService, PrismaService],
    exports: [ProjectsService],
    imports: [AiModule, SocketEventsModule],
})
export class ProjectsModule {}
