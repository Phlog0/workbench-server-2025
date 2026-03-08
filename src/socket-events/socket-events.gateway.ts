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
import { Logger, OnModuleInit, ParseIntPipe } from "@nestjs/common";
import { OnlineUsers, SocketsToUser, UserId } from "./types/types";
import { SOCKET_EVENTS } from "./socket-events-keys";
import { SetUserIdResponseDto } from "./dto/set-user-id-response-dto";
import { ConfigService } from "@nestjs/config";
import { Project } from "@/generated/prisma/client";
import { JoinRoomResponseDto } from "./dto/join-room-response.dto.ts";
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

  async handleDisconnect(client: Socket) {
    const clientId = client.id;

    const userId = await this.socketEventsService.socketDisconnected(clientId);
    const onlineCount = await this.socketEventsService.broadcastOnlineCount(userId);
    this.emitBroadcastOnlineCount(onlineCount.length);
  }

  constructor(
    private readonly socketEventsService: SocketEventsService,
    private readonly configService: ConfigService,
  ) {}

  // TODO Прокинуть .env с конфига
  // onModuleInit() {
  //   const clientUrl = this.configService.get("CLIENT_URL");
  // }

  private emitBroadcastOnlineCount(count: number) {
    this.server.emit(SOCKET_EVENTS.BROADCAST_SYSTEM_ONLINE_COUNT, count); // Всем клиентам
    this.logger.log(`📊📊📊: ${count}`);
  }

  @SubscribeMessage(SOCKET_EVENTS.SET_USER_ID)
  async setUserId(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: UserId,
    @Ack() callback: (data: SetUserIdResponseDto) => void,
  ) {
    const result = await this.socketEventsService.setUserId(client.id, userId);

    const onlineCount = await this.socketEventsService.broadcastOnlineCount(userId);

    callback({
      success: true,
      userId,
      onlineCount: onlineCount.length,
      userConnectionsCount: onlineCount[0].socket.length || 1,
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
    // @Ack() callback: (data: JoinRoomResponseDto) => void,
  ) {
    const { projectId, userId } = body;
    this.server.in(client.id).socketsJoin(`project:${projectId}`);
    await this.socketEventsService.joinRoom(userId, projectId, client.id);
    const onlineUsers = await this.socketEventsService.getProjectOnlineCount(projectId);
    this.server
      .to(`project:${projectId}`)
      .emit(SOCKET_EVENTS.PROJECT_USER_ONLINE_COUNT, { userId, projectId, onlineUsers });
  }

  @SubscribeMessage(SOCKET_EVENTS.LEAVE_ROOM)
  async leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { userId: UserId; projectId: Project["id"] },
  ) {
    const { projectId, userId } = body;
    this.server.in(client.id).socketsLeave(`project:${projectId}`);
    await this.socketEventsService.leaveRoom(userId, projectId, client.id);
    const onlineUsers = await this.socketEventsService.getProjectOnlineCount(projectId);
    this.server
      .to(`project:${projectId}`)
      .emit(SOCKET_EVENTS.PROJECT_USER_ONLINE_COUNT, { userId, projectId, onlineUsers });
  }
}
