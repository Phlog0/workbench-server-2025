import { Injectable } from "@nestjs/common";
import { ClientId, UserId } from "./types/types";
import { PrismaService } from "@/prisma.service";
import { SocketEventsGateway } from "./socket-events.gateway";

@Injectable()
export class SocketEventsService {
  constructor(private prismaService: PrismaService) {}
  async setUserId(clientId: ClientId, userId: UserId) {
    const connections = await this.prismaService.sockets.findMany({
      where: {
        userId,
      },
    });
    if (connections) {
      const existingConnection = await this.prismaService.sockets.findUnique({
        where: {
          id: clientId,
        },
      });
      if (existingConnection) {
        return;
      }
    }
    await this.prismaService.sockets.create({
      data: {
        userId: userId,
        id: clientId,
      },
    });
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        isOnline: true,
      },
    });
  }

  async broadcastOnlineCount(userId: UserId) {
    return await this.prismaService.user.findMany({
      where: {
        isOnline: true,
      },
      include: {
        sockets: {
          where: {
            userId,
          },
        },
      },
    });
  }

  async socketDisconnected(clientId: ClientId) {
    console.log(clientId);

    const existingSocketToDelete = await this.prismaService.sockets.findUnique({
      where: {
        id: clientId,
      },
    });
    if (!existingSocketToDelete) {
      return;
    }
    const deletedSocket = await this.prismaService.sockets.delete({
      where: {
        id: clientId,
      },
    });

    const reaminingSockets = await this.prismaService.sockets.findMany({
      where: {
        userId: deletedSocket.userId,
      },
    });

    if (!reaminingSockets.length) {
      await this.prismaService.user.update({
        where: {
          id: deletedSocket.userId,
        },
        data: {
          isOnline: false,
        },
      });
    }
    return deletedSocket.userId;
  }
  async userLogout(userId: UserId) {
    await this.prismaService.sockets.deleteMany({
      where: {
        userId,
      },
    });
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        isOnline: false,
      },
    });
  }
}
