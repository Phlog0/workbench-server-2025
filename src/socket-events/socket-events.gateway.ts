import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ServerAndEventStreamsHost,
  ConnectedSocket,
  Ack,
} from "@nestjs/websockets";
import { SocketEventsService } from "./socket-events.service";
import { CreateSocketEventDto } from "./dto/create-socket-event.dto";
import { UpdateSocketEventDto } from "./dto/update-socket-event.dto";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { OnlineUsers } from "./types/types";
import { SOCKET_EVENTS } from "./socket-events-keys";
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
  private onlineUsers: OnlineUsers = new Map();
  private socketsToUser = new Map<string, string>();

  private readonly logger = new Logger(SocketEventsGateway.name);

  handleDisconnect(client: Socket) {
    const clientId = client.id;
    const userId = this.socketsToUser.get(clientId);
    if (!userId) {
      this.logger.warn("неизвестный пользователь отсоединился ", clientId);
    }
    this.socketsToUser.delete(clientId);
    const userConnections = this.onlineUsers.get(userId);

    if (!userConnections) {
      return;
    }
    const connectionsRemain = userConnections.filter(
      (connection) => connection.socketId !== clientId,
    );
    if (connectionsRemain.length === 0) {
      this.onlineUsers.delete(userId);
    } else {
      this.onlineUsers.set(userId, connectionsRemain);
    }

    this.broadcastOnlineCount();
  }

  constructor(private readonly socketEventsService: SocketEventsService) {}

  private broadcastOnlineCount() {
    const count = this.onlineUsers.size;
    this.server?.emit(SOCKET_EVENTS.BROADCAST_SYSTEM_ONLINE_COUNT, count); // Всем клиентам
    this.logger.log(`📊📊📊: ${count}`);
    this.logActiveUsers();
  }

  @SubscribeMessage(SOCKET_EVENTS.SET_USER_ID)
  setUserId(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: string },
    @Ack() callback: (data: any) => void,
  ) {
    const { userId } = payload;
    this.socketsToUser.set(client.id, userId);

    const userConnections = this.onlineUsers.get(userId) || [];

    if (userConnections.length) {
      const existingConnection = userConnections.find((conn) => conn.socketId === client.id);

      if (!existingConnection) {
        userConnections.push({ socketId: client.id, connectedAt: new Date() });
        this.onlineUsers.set(userId, userConnections);
      }
    } else {
      this.onlineUsers.set(userId, [
        {
          connectedAt: new Date(),
          socketId: client.id,
        },
      ]);
    }

    this.broadcastOnlineCount();
    callback({
      success: true,
      userId,
      onlineCount: this.onlineUsers.size,
      userConnectionsCount: this.onlineUsers.get(userId)?.length || 1,
    });
  }
  @SubscribeMessage(SOCKET_EVENTS.USER_SYSTEM_LOGOUT)
  userDisconnected(@ConnectedSocket() client: Socket, @MessageBody() payload: { userId: string }) {
    // this.socketEventsService.userCreated(client, this.onlineUsers);
    const { userId } = payload;
    console.log({ userId });
    this.logger.log(`❌ Вышел из системы: ${userId}`);
    if (userId) {
      this.onlineUsers.delete(userId);
    }

    this.broadcastOnlineCount();
  }

  logActiveUsers() {
    this.logger.log(`👥: ${[...this.onlineUsers].map((item) => item[0])}`);
  }
}
