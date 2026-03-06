import { Injectable, Logger } from "@nestjs/common";
import { CreateSocketEventDto } from "./dto/create-socket-event.dto";
import { UpdateSocketEventDto } from "./dto/update-socket-event.dto";
import { Socket } from "socket.io";
import { OnlineUsers } from "./types/types";

@Injectable()
export class SocketEventsService {
  private readonly logger = new Logger(SocketEventsService.name);
  userCreated(client: Socket, onlineUsers: OnlineUsers) {}
}
