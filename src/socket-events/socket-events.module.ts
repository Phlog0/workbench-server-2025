import { Module } from "@nestjs/common";
import { SocketEventsService } from "./socket-events.service";
import { SocketEventsGateway } from "./socket-events.gateway";
import { PrismaService } from "@/prisma.service";

@Module({
    providers: [SocketEventsService, PrismaService],
    exports: [SocketEventsService],
})
export class SocketEventsModule {}
