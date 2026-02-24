import { Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { PrismaService } from "../prisma.service";
import { AiModule } from "@/ai/ai.module";
@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
  exports: [ProjectsService],
  imports: [AiModule],
})
export class ProjectsModule {}
