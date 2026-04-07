import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket,
    Ack,
} from "@nestjs/websockets";
import { SocketEventsService } from "./socket-events.service";

import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { UserId } from "./types/types";
import { SOCKET_EVENTS } from "./socket-events-keys";
import { SetUserIdResponseDto } from "./dto/set-user-id-response-dto";
import { ConfigService } from "@nestjs/config";
import { Project } from "@/generated/prisma/client";
@WebSocketGateway({
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST"],
    },
})
export class SocketEventsGateway {
    @WebSocketServer()
    server: Server;
    private readonly logger = new Logger(SocketEventsGateway.name);

    // это хук жизненного цикла
    async handleDisconnect(client: Socket) {
        const clientId = client.id;
        const projectId = client.data.projectId;
        // Можно хранить данные в сокете!
        // const userId = client.data.userId;
        const userId = await this.socketEventsService.socketDisconnected(clientId);
        const onlineUsersInRoom = await this.socketEventsService.getOnlineCountInRoom(projectId);
        const onlineCount = await this.socketEventsService.broadcastOnlineCount(userId);
        this.server.in(`project:${projectId}`).emit(SOCKET_EVENTS.PROJECT_USER_ONLINE_COUNT, {
            userId,
            projectId,
            onlineUsers: onlineUsersInRoom,
        });

        this.emitBroadcastOnlineCount(onlineCount.length);
    }

    constructor(
        private readonly socketEventsService: SocketEventsService,
        private readonly configService: ConfigService,
    ) {}

    private emitBroadcastOnlineCount(count: number) {
        this.server.emit(SOCKET_EVENTS.BROADCAST_SYSTEM_ONLINE_COUNT, count);
        this.logger.log(`📊📊📊: ${count}`);
    }

    @SubscribeMessage(SOCKET_EVENTS.SET_USER_ID)
    async setUserId(
        @ConnectedSocket() client: Socket,
        @MessageBody() userId: UserId,
        @Ack() callback: (data: SetUserIdResponseDto) => void,
    ) {
        await this.socketEventsService.setUserId(client.id, userId);

        const onlineCount = await this.socketEventsService.broadcastOnlineCount(userId);

        callback({
            success: true,
        });
        this.emitBroadcastOnlineCount(onlineCount.length);
    }

    @SubscribeMessage(SOCKET_EVENTS.USER_SYSTEM_LOGOUT)
    async userDisconnected(@MessageBody() userId: UserId) {
        await this.socketEventsService.userLogout(userId);
        const onlineCount = await this.socketEventsService.broadcastOnlineCount(userId);
        this.emitBroadcastOnlineCount(onlineCount.length);
    }
    @SubscribeMessage(SOCKET_EVENTS.JOIN_ROOM)
    async joinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() body: { userId: UserId; projectId: Project["id"] },
    ) {
        const { projectId, userId } = body;
        // TODO типизация. А еще на клиенте можно закинуть в Auth{}. тОже прочитай
        client.data.projectId = body.projectId;
        client.data.userId = body.userId;
        const roomName = `project:${projectId}`;
        client.join(roomName);
        await this.socketEventsService.joinRoom(userId, projectId, client.id);
        const onlineUsers = await this.socketEventsService.getOnlineCountInRoom(projectId);
        this.server
            .in(roomName)
            .emit(SOCKET_EVENTS.PROJECT_USER_ONLINE_COUNT, { userId, projectId, onlineUsers });
    }

    @SubscribeMessage(SOCKET_EVENTS.LEAVE_ROOM)
    async leaveRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() body: { userId: UserId; projectId: Project["id"] },
    ) {
        const { projectId, userId } = body;
        client.leave(`project:${projectId}`);
        await this.socketEventsService.leaveRoom(projectId, client.id);
        const onlineUsers = await this.socketEventsService.getOnlineCountInRoom(projectId);
        this.server
            .in(`project:${projectId}`)
            .emit(SOCKET_EVENTS.PROJECT_USER_ONLINE_COUNT, { userId, projectId, onlineUsers });
    }
    @SubscribeMessage(SOCKET_EVENTS.C_S_ROOM_IS_DELETED)
    async kickAllFromRoom(@MessageBody() projectId: Project["id"]) {
        const roomName = `project:${projectId}`;
        // нашли все ID
        const socketIdsInRoom = (await this.server.in(roomName).fetchSockets()).map(
            (item) => item.id,
        );
        // Отвязали в БД (мне БД еще нужно контролировать😡😡😡😤😤😤)
        await this.socketEventsService.kickAllFromRoom(projectId, socketIdsInRoom);
        // Отправили событие на клиент, чтобы там socket.on()
        this.server.in(roomName).emit(SOCKET_EVENTS.S_C_KICK_ALL_FROM_DELETED_ROOM);
        // Отвязали сокеты
        this.server.in(roomName).socketsLeave(roomName);
    }
}
